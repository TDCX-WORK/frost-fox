import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "#60A5FA",
  width,
  height,
  className,
  maxOpacity = 0.3,
}) {
  const canvasRef    = useRef(null)
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  const memoizedColor = useMemo(() => {
    const c = document.createElement("canvas")
    c.width = c.height = 1
    const x = c.getContext("2d")
    x.fillStyle = color
    x.fillRect(0, 0, 1, 1)
    const [r, g, b] = x.getImageData(0, 0, 1, 1).data
    return `${r}, ${g}, ${b}`
  }, [color])

  const setupCanvas = useCallback((canvas, w, h) => {
    const dpr = window.devicePixelRatio || 1
    canvas.width  = w * dpr
    canvas.height = h * dpr
    canvas.style.width  = `${w}px`
    canvas.style.height = `${h}px`
    const cols = Math.floor(w / (squareSize + gridGap))
    const rows = Math.floor(h / (squareSize + gridGap))
    const len  = cols * rows
    const current = new Float32Array(len)
    const target  = new Float32Array(len)
    const speed   = new Float32Array(len)
    for (let i = 0; i < len; i++) {
      current[i] = Math.random() * maxOpacity
      target[i]  = Math.random() * maxOpacity
      speed[i]   = 0.4 + Math.random() * 1.2
    }
    return { cols, rows, current, target, speed, dpr }
  }, [squareSize, gridGap, maxOpacity])

  const tick = useCallback((params, deltaTime) => {
    const { current, target, speed } = params
    const dt = Math.min(deltaTime, 0.05)
    for (let i = 0; i < current.length; i++) {
      const diff = target[i] - current[i]
      const step = speed[i] * dt
      if (Math.abs(diff) <= step) {
        current[i] = target[i]
        if (Math.random() < flickerChance) {
          target[i] = Math.random() * maxOpacity
          speed[i]  = 0.4 + Math.random() * 1.2
        }
      } else {
        current[i] += diff > 0 ? step : -step
      }
    }
  }, [flickerChance, maxOpacity])

  const draw = useCallback((ctx, cw, ch, cols, rows, current, dpr) => {
    ctx.clearRect(0, 0, cw, ch)
    const sq = squareSize * dpr
    const gp = (squareSize + gridGap) * dpr
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const op = current[i * rows + j]
        if (op < 0.003) continue
        ctx.fillStyle = `rgba(${memoizedColor}, ${op})`
        ctx.fillRect(i * gp, j * gp, sq, sq)
      }
    }
  }, [memoizedColor, squareSize, gridGap])

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    let rafId, params
    const resize = () => {
      const w = width  || container.clientWidth
      const h = height || container.clientHeight
      params = setupCanvas(canvas, w, h)
    }
    resize()
    let lastTime = performance.now()
    const animate = (now) => {
      rafId = requestAnimationFrame(animate)
      if (!isInView || !params) return
      const dt = (now - lastTime) / 1000
      lastTime = now
      tick(params, dt)
      draw(ctx, canvas.width, canvas.height, params.cols, params.rows, params.current, params.dpr)
    }
    rafId = requestAnimationFrame(animate)
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => { cancelAnimationFrame(rafId); ro.disconnect() }
  }, [setupCanvas, tick, draw, width, height, isInView])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 })
    io.observe(container)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  )
}
