import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "capability" | "limitation";
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Can ChatGPT access real-time stock prices or current weather?",
    options: ["Yes, it has internet access", "No, it has a knowledge cutoff date", "Only with plugins", "Yes, but only for major stocks"],
    correctAnswer: 1,
    explanation: "ChatGPT has a knowledge cutoff date and cannot access real-time information unless specifically connected to external tools or APIs. Standard ChatGPT operates on training data up to a certain date.",
    category: "limitation"
  },
  {
    id: 2,
    question: "Will AI always cite its sources accurately?",
    options: ["Yes, AI is trained to cite properly", "No, AI can hallucinate citations", "Only for academic papers", "Yes, if you ask it to"],
    correctAnswer: 1,
    explanation: "AI models can 'hallucinate' - generating plausible-sounding but incorrect information, including fake citations. Always verify sources independently.",
    category: "limitation"
  },
  {
    id: 3,
    question: "Can AI understand emotional nuance in text?",
    options: ["Yes, perfectly", "No, not at all", "Somewhat, but not like humans", "Only in certain languages"],
    correctAnswer: 2,
    explanation: "AI can detect patterns associated with emotions in text, but it doesn't truly 'understand' emotions. It recognizes linguistic patterns without genuine emotional comprehension.",
    category: "limitation"
  },
  {
    id: 4,
    question: "What is a 'hallucination' in AI context?",
    options: ["When AI gets confused", "When AI generates false but confident-sounding information", "A visual glitch", "An error message"],
    correctAnswer: 1,
    explanation: "AI hallucination refers to when models generate information that sounds plausible and is presented confidently, but is actually false or nonsensical. This is a critical limitation to be aware of.",
    category: "limitation"
  },
  {
    id: 5,
    question: "Can AI models generate creative content like stories and poems?",
    options: ["No, only factual content", "Yes, based on patterns in training data", "Only if given exact templates", "Yes, but only in English"],
    correctAnswer: 1,
    explanation: "AI excels at generating creative content by learning patterns from vast amounts of text. However, this 'creativity' is pattern-based rather than truly original thinking.",
    category: "capability"
  },
  {
    id: 6,
    question: "Are AI models biased?",
    options: ["No, AI is objective", "Yes, they reflect biases in training data", "Only older models", "Only in certain topics"],
    correctAnswer: 1,
    explanation: "AI models can perpetuate and amplify biases present in their training data, which reflects human-created content with its inherent biases. Critical evaluation is essential.",
    category: "limitation"
  },
  {
    id: 7,
    question: "Can AI explain its reasoning process?",
    options: ["Yes, always transparently", "No, it's a 'black box'", "It can provide explanations, but they may not reflect actual processes", "Only in reasoning models"],
    correctAnswer: 2,
    explanation: "While AI can generate explanations for its outputs, these explanations are themselves generated text and may not accurately represent the model's actual decision-making process. Newer reasoning models are improving this.",
    category: "limitation"
  },
  {
    id: 8,
    question: "What can AI do particularly well?",
    options: ["Make ethical decisions", "Pattern recognition and text generation", "Understand context like humans", "Replace teachers"],
    correctAnswer: 1,
    explanation: "AI excels at pattern recognition, text generation, summarization, and processing large amounts of information quickly. However, it lacks human judgment, ethical reasoning, and true contextual understanding.",
    category: "capability"
  },
  {
    id: 9,
    question: "Can AI understand images and generate text about them?",
    options: ["No, only text-to-text", "Yes, multimodal models can process images", "Only simple images", "Only with special training"],
    correctAnswer: 1,
    explanation: "Modern multimodal AI models can process and understand images, generating relevant text descriptions and answering questions about visual content.",
    category: "capability"
  },
  {
    id: 10,
    question: "Should you trust AI-generated medical or legal advice?",
    options: ["Yes, AI is highly accurate", "No, always verify with qualified professionals", "Only for minor issues", "Yes, if it cites sources"],
    correctAnswer: 1,
    explanation: "AI should never replace professional medical or legal advice. While it can provide general information, it can hallucinate, miss critical context, and lacks the accountability and nuanced judgment of licensed professionals.",
    category: "limitation"
  }
];

export default function CapabilitiesQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  const getBadge = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return { name: "AI Expert", emoji: "🏆", color: "bg-accent" };
    if (percentage >= 70) return { name: "Reality Checker", emoji: "✅", color: "bg-primary" };
    if (percentage >= 50) return { name: "Myth Buster", emoji: "💡", color: "bg-secondary" };
    return { name: "AI Learner", emoji: "📚", color: "bg-muted" };
  };

  if (quizComplete) {
    const badge = getBadge();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Award className="w-8 h-8 text-accent" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="text-6xl">{badge.emoji}</div>
            <Badge className={`${badge.color} text-lg px-4 py-2`}>
              {badge.name}
            </Badge>
            <div className="text-4xl font-bold text-ink">
              {score}/{quizQuestions.length}
            </div>
            <p className="text-xl text-ink-muted">
              You scored {percentage}%
            </p>
          </div>

          <div className="space-y-2 text-left">
            <h4 className="font-semibold text-ink text-center">What You Learned:</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>AI models have knowledge cutoff dates and can't access real-time data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>Hallucinations are a critical limitation - always verify important information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>AI excels at pattern recognition but lacks true understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>Never rely on AI for medical or legal advice without professional verification</span>
              </li>
            </ul>
          </div>

          <Button onClick={resetQuiz} variant="outline" className="w-full">
            <RotateCcw className="mr-2 w-4 h-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-ink">AI Capabilities & Limitations Quiz</h3>
        <p className="text-ink-muted">Test your understanding of what AI can and cannot do</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-ink-muted">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>Score: {score}/{answeredQuestions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={question.category === "capability" ? "default" : "secondary"}>
              {question.category === "capability" ? "Capability" : "Limitation"}
            </Badge>
          </div>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showExplanation;

              let buttonVariant: "outline" | "default" | "destructive" = "outline";
              let icon = null;

              if (showResult) {
                if (isCorrect) {
                  buttonVariant = "default";
                  icon = <CheckCircle className="w-4 h-4" />;
                } else if (isSelected && !isCorrect) {
                  buttonVariant = "destructive";
                  icon = <XCircle className="w-4 h-4" />;
                }
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className={`w-full justify-start text-left h-auto py-3 px-4 ${
                    isSelected && !showResult ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                >
                  <span className="flex-1">{option}</span>
                  {icon}
                </Button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-4 p-4 rounded-lg bg-muted/50 border space-y-2 animate-fade-in">
              <h4 className="font-semibold text-ink flex items-center gap-2">
                {selectedAnswer === question.correctAnswer ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-accent" />
                    Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    Not quite
                  </>
                )}
              </h4>
              <p className="text-sm text-ink-muted">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <Button 
              onClick={handleNext} 
              className="w-full mt-4"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
