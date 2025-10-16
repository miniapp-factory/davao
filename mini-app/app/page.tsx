import { description, title, url } from "@/lib/metadata";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Confetti } from "@/components/ui/confetti";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${url}/icon.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${url}/icon.png`,
        button: {
          title: "Launch Mini App",
          action: {
            type: "launch_miniapp",
            name: title,
            url: url,
            splashImageUrl: `${url}/icon.png`,
            iconUrl: `${url}/icon.png`,
            splashBackgroundColor: "#000000",
            description: description,
            primaryCategory: "utility",
            tags: [],
          },
        },
      }),
    },
  };
}

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
];

const motivationalMessages = [
  { score: 5, message: "Davao Expert! 🇵🇭" },
  { score: 4, message: "Impressive Knowledge!" },
  { score: 3, message: "Impressive Knowledge!" },
  { score: 2, message: "Keep Exploring Davao!" },
  { score: 1, message: "Keep Exploring Davao!" },
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

  const handleStart = () => {
    setStage("quiz");
  };

  const handleOption = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
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
        setCurrent(prev => prev + 1);
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
  };

  const currentQuestion = questions[current];
  const progressValue = ((current + 1) / questions.length) * 100;

  const getMotivational = () => {
    const msg = motivationalMessages.find(m => m.score === score);
    return msg ? msg.message : "";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-animated-gradient relative">
      {stage === "welcome" && (
        <div className="text-center max-w-md">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_the_Philippines.svg"
            alt="Philippines flag"
            className="w-12 h-auto mx-auto mb-4"
          />
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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_the_Philippines.svg"
            alt="Philippines flag"
            className="w-12 h-auto mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_#FCD116] mb-4">
            Quiz Completed!
          </h1>
          <p className="text-2xl text-white mb-2">
            You scored {score}/{questions.length}!
          </p>
          <p className="text-lg text-white mb-6">{getMotivational()}</p>
          <Button
            onClick={handlePlayAgain}
            className="bg-[#0038A8] text-white text-xl py-4 px-8 rounded-full hover:scale-105 transition-transform"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
