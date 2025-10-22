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
    const timer = setTimeout(() => setConfetti([]), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {confetti.map(c => (
        <div
          key={c.id}
          style={{
            left: `${c.left}%`,
            backgroundColor: c.color,
            width: "8px",
            height: "8px",
            position: "absolute",
            borderRadius: "50%",
            animation: "confettiFall 2s linear forwards",
          }}
        />
      ))}
    </div>
  );
}
