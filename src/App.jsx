import { useEffect, useState } from "react";

const rawQuestions = [
  {
    question: "Which part of the plant is responsible for photosynthesis?",
    options: ["Root", "Stem", "Leaf", "Flower"],
    answer: "Leaf",
  },
  {
    question: "What is the basic unit of life?",
    options: ["Organ", "Tissue", "Cell", "Nucleus"],
    answer: "Cell",
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
  },
  {
    question: "What organ in the human body is responsible for pumping blood?",
    options: ["Lungs", "Liver", "Heart", "Kidneys"],
    answer: "Heart",
  },
  {
    question: "Which vitamin is produced when your skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: "Vitamin D",
  },
  {
    question: "Which part of the cell contains genetic material?",
    options: ["Mitochondria", "Nucleus", "Cytoplasm", "Ribosome"],
    answer: "Nucleus",
  },
  {
    question: "What type of blood cells help fight infection?",
    options: ["Red blood cells", "Platelets", "White blood cells", "Plasma"],
    answer: "White blood cells",
  },
  {
    question: "Which organ is responsible for filtering waste from the blood?",
    options: ["Heart", "Liver", "Kidney", "Lungs"],
    answer: "Kidney",
  },
  {
    question: "What is the process by which plants make their food?",
    options: ["Respiration", "Transpiration", "Digestion", "Photosynthesis"],
    answer: "Photosynthesis",
  },
  {
    question: "Which part of the neuron receives signals?",
    options: ["Axon", "Dendrite", "Myelin", "Synapse"],
    answer: "Dendrite",
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Chloroplast", "Mitochondria", "Vacuole"],
    answer: "Mitochondria",
  },
  {
    question: "Which blood type is known as the universal donor?",
    options: ["A", "B", "O", "AB"],
    answer: "O",
  },
  {
    question: "Which molecule carries genetic information?",
    options: ["RNA", "DNA", "Protein", "Glucose"],
    answer: "DNA",
  },
  {
    question: "How many chromosomes are in a human body cell?",
    options: ["23", "46", "22", "44"],
    answer: "46",
  },
  {
    question: "Which process involves the splitting of glucose to release energy?",
    options: ["Photosynthesis", "Respiration", "Osmosis", "Transpiration"],
    answer: "Respiration",
  },
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); //15 seconds per question

  // Shuffle questions once
  useEffect(() => {
    const shuffled = [...rawQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (showResult || isQuizFinished) return; // pause timer when result or quiz ends

    if (timeLeft === 0) {
      setShowResult(true); // time's up!
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showResult, isQuizFinished]);

  const currentQuestion = questions[current];

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleSubmit = () => {
    if (selected === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelected("");
    setTimeLeft(15); //reset timer

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    const reshuffled = [...rawQuestions].sort(() => Math.random() - 0.5);
    setQuestions(reshuffled);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setShowResult(false);
    setIsQuizFinished(false);
    setTimeLeft(15);
  };

  if (questions.length === 0) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        {!isQuizFinished ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-bold">
                Question {current + 1} of {questions.length}
              </h1>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-mono">
               {timeLeft}s
              </span>
            </div>

            <p className="text-lg mb-6">{currentQuestion.question}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={showResult}
                  className={`block w-full px-4 py-2 border rounded-lg ${
                    selected === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <div className="mt-6">
                <p className="text-lg font-semibold">
                  {selected === currentQuestion.answer
                    ? "Correct!"
                    : selected
                    ? `Incorrect. Correct: ${currentQuestion.answer}`
                    : `Time's up! Correct: ${currentQuestion.answer}`}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Next Question
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-lg mb-6">
              Your Score: <strong>{score}</strong> out of{" "}
              <strong>{questions.length}</strong>
            </p>
            <button
              onClick={restartQuiz}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
