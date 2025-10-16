"use client";

import { description, title, url } from "@/lib/metadata";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Confetti } from "@/components/ui/confetti";
import { Share } from "@/components/ui/share";
import { useAccount, useSignMessage, ConnectButton } from "wagmi";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

const questions = [
  {
    question: "What is the largest city in Mindanao and the center of the Davao Region?",
    options: ["Cebu City", "Davao City", "Zamboanga City", "Manila"],
    correctIndex: 1,
  },
  {
    question:
      "Which vibrant festival in Davao City celebrates the indigenous tribes and bountiful harvest every third week of August?",
    options: ["Sinulog Festival", "Ati-Atihan Festival", "Kadayawan Festival", "Pahiyas Festival"],
    correctIndex: 2,
  },
  {
    question: "What is the highest mountain in the Philippines, a popular hiking spot near Davao?",
    options: ["Mount Mayon", "Mount Pulag", "Mount Apo", "Mount Pinatubo"],
    correctIndex: 2,
  },
  {
    question:
      "Davao is world-famous for which spiky, strong-smelling fruit known as the 'King of Fruits'?",
    options: ["Mango", "Pineapple", "Durian", "Banana"],
    correctIndex: 2,
  },
  {
    question:
      "Which former mayor of Davao City became President of the Philippines and is known for his tough stance on crime?",
    options: ["Benigno Aquino III", "Rodrigo Duterte", "Ferdinand Marcos", "Gloria Macapagal Arroyo"],
    correctIndex: 1,
  },
  {
    question: "What beach in Davao Oriental is known as the skim boarding capital of the Philippines?",
    options: ["Boracay Beach", "Dahican Beach", "Siargao Beach", "Palawan Beach"],
    correctIndex: 1,
  },
  {
    question: "Which museum in Mati City features the largest whale in the Philippines?",
    options: ["National Museum", "Ayala Museum", "Sabangan Museum", "Mindanao Museum"],
    correctIndex: 2,
  },
  {
    question: "What is the best time to visit Davao for durian feasting?",
    options: ["January to March", "April to June", "July to September", "August to October"],
    correctIndex: 3,
  },
  {
    question: "Which mountain in Davao is a UNESCO World Heritage Site famous for its bonsai forest?",
    options: ["Mount Apo", "Mount Hamiguitan", "Mount Kitanglad", "Mount Pulag"],
    correctIndex: 1,
  },
  {
    question: "What unique product is produced by Malagos Food in Davao and not exported?",
    options: ["Durian Candy", "Artisan Goat Cheese", "Chocolate Bars", "Coconut Oil"],
    correctIndex: 1,
  },
];

const motivationalMessages = [
  { score: 10, message: "Davao Master! 🇵🇭" },
  { score: 9, message: "Davao Expert! 🇵🇭" },
  { score: 8, message: "Great Job!" },
  { score: 7, message: "Nice Work!" },
  { score: 6, message: "Good Effort!" },
  { score: 5, message: "Impressive Knowledge!" },
  { score: 4, message: "Impressive Knowledge!" },
  { score: 3, message: "Keep Exploring Davao!" },
  { score: 2, message: "Keep Exploring Davao!" },
  { score: 1, message: "Better Luck Next Time!" },
  { score: 0, message: "Better Luck Next Time!" },
];

export default function Home() {
  const [stage, setStage] = useState<"welcome" | "quiz" | "result">("welcome");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [leaderboard, setLeaderboard] = useState<
    Array<{ id: string; name: string; score: number }>
  >([]);
  const [playerName, setPlayerName] = useState("");
  const [anonId, setAnonId] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Generate or retrieve anonymous ID
  useEffect(() => {
    const stored = localStorage.getItem("anonId");
    if (stored) {
      setAnonId(stored);
    } else {
      const newId = uuidv4();
      localStorage.setItem("anonId", newId);
      setAnonId(newId);
    }
  }, []);

  // Fetch leaderboard on mount and after submission
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data.topScores || []);
      }
    } catch (e) {
      console.error("Failed to fetch leaderboard", e);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleStart = () => {
    setStage("quiz");
  };

  const handleOption = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("Correct! 🎉");
      setShowConfetti(true);
    } else {
      setFeedback(
        `Oops, Wrong! The correct answer is "${questions[current].options[questions[current].correctIndex]}".`
      );
      setShake(true);
    }
    setTimeout(() => {
      setShowConfetti(false);
      setShake(false);
      setSelected(null);
      setFeedback(null);
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setStage("result");
      }
    }, 2500);
  };

  const handlePlayAgain = () => {
    setStage("welcome");
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setShowConfetti(false);
    setShake(false);
    setPlayerName("");
    setSignature(null);
  };

  const handleSubmitScore = async () => {
    let payload: any = {
      name: playerName || "Anonymous",
      score,
      total: questions.length,
    };

    if (isConnected && address) {
      const msg = `Score: ${score} on Davao Quiz`;
      try {
        const sig = await signMessageAsync({ message: msg });
        payload.address = address;
        payload.signature = sig;
      } catch (e) {
        console.error("Signature failed", e);
        return;
      }
    } else {
      payload.anonId = anonId;
    }

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchLeaderboard();
      } else {
        console.error("Failed to submit score");
      }
    } catch (e) {
      console.error("Error submitting score", e);
    }
  };

  const currentQuestion = questions[current];
  const progressValue = ((current + 1) / questions.length) * 100;

  const getMotivational = () => {
    const msg = motivationalMessages.find((m) => m.score === score);
    return msg ? msg.message : "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animated-gradient relative">
      {stage === "welcome" && (
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">🇵🇭</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_#FCD116] mb-4">
            Davao Discovery Quiz!
          </h1>
          <p className="text-lg text-white mb-8">
            Test your knowledge of Davao, the crown jewel of Mindanao!
          </p>
          <Button
            onClick={handleStart}
            className="bg-[#CE1126] text-[#FCD116] text-xl py-4 px-8 rounded-full hover:scale-105 transition-transform"
          >
            Start Quiz
          </Button>

          {/* Leaderboard Section */}
          <div className="mt-8 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-4">
            <h2 className="text-lg font-semibold text-white mb-2">Top Scores</h2>
            <ul className="space-y-1 text-sm text-white">
              {leaderboard.map((entry, idx) => (
                <li key={idx}>
                  {idx + 1}. {entry.name} – {entry.score}/{questions.length}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {stage === "quiz" && (
        <div className="w-full max-w-md">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Question {current + 1} of {questions.length}
            </p>
            <Progress value={progressValue} className="h-2 bg-blue-600" />
          </div>
          <Card
            className={`bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all ${
              shake ? "animate-shake" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 flex flex-col gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className={`text-lg py-3 rounded-full hover:scale-105 transition-transform ${
                    selected !== null
                      ? idx === selected
                        ? idx === currentQuestion.correctIndex
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleOption(idx)}
                  disabled={selected !== null}
                >
                  {opt}
                </Button>
              ))}
            </CardContent>
          </Card>
          {feedback && (
            <p
              className={`mt-4 text-center text-lg font-medium ${
                feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}
          {showConfetti && <Confetti />}
        </div>
      )}

      {stage === "result" && (
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">🇵🇭</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_#FCD116] mb-4">
            Quiz Completed!
          </h1>
          <p className="text-2xl text-white mb-2">
            You scored {score}/{questions.length}!
          </p>
          <p className="text-lg text-white mb-6">{getMotivational()}</p>

          {/* Wallet Connect / Submit Section */}
          {!isConnected && (
            <div className="mb-4">
              <ConnectButton />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-white mb-1">Player Name (optional)</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-gray-900"
            />
          </div>

          <Button
            onClick={handleSubmitScore}
            className="bg-[#0038A8] text-white text-xl py-4 px-8 rounded-full hover:scale-105 transition-transform mb-4"
          >
            Submit Score
          </Button>

          {/* Share Button */}
          <Share score={score} url={url} />

          <Button
            onClick={handlePlayAgain}
            className="bg-[#0038A8] text-white text-xl py-4 px-8 rounded-full hover:scale-105 transition-transform mt-4"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
