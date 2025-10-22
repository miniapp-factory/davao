"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Confetti } from "@/components/ui/confetti";
import { Share } from "@/components/ui/share";

const questions = [
  {
    question: "What is the largest city in Mindanao and the center of the Davao Region?",
    options: ["Cebu City", "Davao City", "Zamboanga City", "Manila"],
    correctIndex: 1,
  },
  {
    question: "Which vibrant festival in Davao City celebrates the indigenous tribes and bountiful harvest every third week of August?",
    options: ["Sinulog Festival", "Ati-Atihan Festival", "Kadayawan Festival", "Pahiyas Festival"],
    correctIndex: 2,
  },
  {
    question: "What is the highest mountain in the Philippines, a popular hiking spot near Davao?",
    options: ["Mount Mayon", "Mount Pulag", "Mount Apo", "Mount Pinatubo"],
    correctIndex: 2,
  },
  {
    question: "Davao is world-famous for which spiky, strong-smelling fruit known as the 'King of Fruits'?",
    options: ["Mango", "Pineapple", "Durian", "Banana"],
    correctIndex: 2,
  },
  {
    question: "Which former mayor of Davao City became President of the Philippines and is known for his tough stance on crime?",
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

export default function Home() {
  const [stage, setStage] = useState<"welcome" | "quiz" | "result">("welcome");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOption = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("Correct! 🎉");
      setShowConfetti(true);
    } else {
      setFeedback(`Wrong! Correct answer: ${questions[current].options[questions[current].correctIndex]}`);
    }
    setTimeout(() => {
      setShowConfetti(false);
      setSelected(null);
      setFeedback(null);
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
      } else {
        setStage("result");
      }
    }, 2000);
  };

  const handleStart = () => setStage("quiz");
  const handlePlayAgain = () => {
    setStage("welcome");
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setShowConfetti(false);
  };

  const currentQuestion = questions[current];
  const progressValue = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {stage === "welcome" && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Davao Discovery Quiz</h1>
          <Button onClick={handleStart}>Start Quiz</Button>
        </div>
      )}

      {stage === "quiz" && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Question {current + 1} of {questions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 font-semibold">{currentQuestion.question}</p>
            <div className="grid gap-2">
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
            </div>
            <Progress value={progressValue} className="mt-4" />
            {feedback && (
              <p className={`mt-4 text-center text-lg font-medium ${feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"}`}>
                {feedback}
              </p>
            )}
          </CardContent>
          {showConfetti && <Confetti />}
        </Card>
      )}

      {stage === "result" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-2">You scored {score} out of {questions.length}.</p>
          <Share url={window.location.href} />
          <Button onClick={handlePlayAgain} className="mt-4">Play Again</Button>
        </div>
      )}
    </div>
  );
}
