import { useEffect, useState } from "react";
import appImage from "./assets/app.jpg";

const rawQuestions = [
  {
    question: "What is the main function of red blood cells?",
    options: ["Fight infection", "Clot blood", "Carry oxygen", "Produce hormones"],
    answer: "Carry oxygen",
  },
  {
    question: "Where does digestion of proteins begin in the body?",
    options: ["Mouth", "Stomach", "Small intestine", "Large intestine"],
    answer: "Stomach",
  },
  {
    question: "Which organ controls most automatic body functions like breathing and heart rate?",
    options: ["Cerebrum", "Spinal cord", "Medulla oblongata", "Cerebellum"],
    answer: "Medulla oblongata",
  },
  {
    question: "What nutrient is most responsible for building and repairing tissues?",
    options: ["Carbohydrates", "Fats", "Proteins", "Vitamins"],
    answer: "Proteins",
  },
  {
    question: "Which mineral helps in forming strong bones and teeth?",
    options: ["Iron", "Iodine", "Calcium", "Zinc"],
    answer: "Calcium",
  },
  {
    question: "Which blood vessels carry blood away from the heart?",
    options: ["Veins", "Arteries", "Capillaries", "Venules"],
    answer: "Arteries",
  },
  {
    question: "Which organ is responsible for filtering blood and forming urine?",
    options: ["Liver", "Heart", "Kidney", "Lungs"],
    answer: "Kidney",
  },
  {
    question: "Which part of the digestive system absorbs most nutrients?",
    options: ["Stomach", "Large intestine", "Small intestine", "Esophagus"],
    answer: "Small intestine",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Liver", "Skin", "Brain", "Lung"],
    answer: "Skin",
  },
  {
    question: "Which vitamin helps with vision in low light?",
    options: ["Vitamin C", "Vitamin D", "Vitamin A", "Vitamin K"],
    answer: "Vitamin A",
  },
  {
    question: "What part of the brain is responsible for balance and coordination?",
    options: ["Cerebellum", "Hypothalamus", "Medulla", "Frontal lobe"],
    answer: "Cerebellum",
  },
  {
    question: "Which type of joint is found in the shoulder and hip?",
    options: ["Hinge joint", "Pivot joint", "Ball and socket joint", "Gliding joint"],
    answer: "Ball and socket joint",
  },
  {
    question: "What type of blood cell helps fight infection?",
    options: ["Platelets", "Red blood cells", "White blood cells", "Plasma"],
    answer: "White blood cells",
  },
  {
    question: "Which nutrient is the body's main source of energy?",
    options: ["Protein", "Carbohydrates", "Fats", "Vitamins"],
    answer: "Carbohydrates",
  },
  {
    question: "What is the name of the muscular tube that connects the throat to the stomach?",
    options: ["Trachea", "Esophagus", "Pharynx", "Bronchus"],
    answer: "Esophagus",
  },
  {
    question: "Which vitamin deficiency impairs calcium absorption and can lead to osteomalacia in adults?",
    options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin K"],
    answer: "Vitamin D",
  },
  {
    question: "Which cellular organelle is responsible for ATP production through oxidative phosphorylation?",
    options: ["Endoplasmic reticulum", "Mitochondria", "Peroxisome", "Lysosome"],
    answer: "Mitochondria",
  },
  {
    question: "A person with which blood type can donate to all ABO blood groups?",
    options: ["AB+", "O+", "O−", "A−"],
    answer: "O−",
  },
  {
    question: "Which molecule carries the genetic code from the nucleus to the ribosome?",
    options: ["DNA", "mRNA", "tRNA", "rRNA"],
    answer: "mRNA",
  },
  {
    question: "During aerobic respiration, which molecule is the final electron acceptor in the electron transport chain?",
    options: ["Carbon dioxide", "Water", "NADH", "Oxygen"],
    answer: "Oxygen",
  },
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
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
    <div
    className="min-h-screen flex flex-col items-center justify-center p-6"
    style={{
      backgroundImage: `url(${appImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    {!hasStarted ? (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-4 text-green-700">
           Welcome to <span className="italic">BioFusion IQ</span>
        </h1>
        <p className="mb-6 text-gray-700">
          Where intelligence meets the science of life.
        </p>
        <button
          onClick={() => setHasStarted(true)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Start Quiz
        </button>
      </div>
    ) : questions.length === 0 ? (
      <p className="p-6 text-white">Loading...</p>
    ) : (
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
    )}
    </div>
  );
}

export default App;
