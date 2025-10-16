import { useEffect, useState } from "react";

export function Confetti() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string }>>([]);

  useEffect(() => {
    const count = 30;
    const newConfetti = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="confetti-container">
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            backgroundColor: c.color,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
