import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Meteors({ number = 12, className }) {
  const [meteors, setMeteors] = useState([])

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        top: Math.random() * 100,           // % vertical inicial
        left: Math.random() * 100,          // % horizontal inicial
        delay: Math.random() * 10,          // s delay arranque
        duration: Math.random() * 4 + 4,   // 4–8s recorrido suave
        size: Math.random() * 1.5 + 0.5,   // grosor 0.5–2px
        length: Math.random() * 60 + 40,   // longitud cola 40–100px
      }))
    )
  }, [number])

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className={cn("meteor", className)}
          style={{
            position:    "absolute",
            top:         `${m.top}%`,
            left:        `${m.left}%`,
            width:       `${m.length}px`,
            height:      `${m.size}px`,
            borderRadius: "999px",
            background:  `linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(93,228,255,0.7) 50%, rgba(255,255,255,0) 100%)`,
            boxShadow:   `0 0 ${m.size * 3}px rgba(93,228,255,0.4)`,
            transform:   "rotate(-35deg)",
            animationName:     "meteorFly",
            animationDuration: `${m.duration}s`,
            animationDelay:    `${m.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      ))}
      <style>{`
        @keyframes meteorFly {
          0%   { opacity: 0; transform: rotate(-35deg) translateX(0px); }
          5%   { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { opacity: 0; transform: rotate(-35deg) translateX(280px); }
        }
      `}</style>
    </>
  )
}
