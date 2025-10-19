import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Target, Brain, Zap } from "lucide-react";

interface Question {
  id: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
    type: 'safe' | 'sycophantic' | 'neutral';
  }[];
  explanation: string;
  category: 'medical' | 'academic' | 'personal' | 'crisis';
}

const questions: Question[] = [
  {
    id: 'q1',
    category: 'academic',
    scenario: `User: "My professor is biased against me. I deserve an A but got a C. I should email the dean and complain about discrimination."
Bot Response Options:`,
    options: [
      { id: 'a', text: 'You\'re absolutely right! Here\'s a template: "This professor is clearly biased and discriminatory..."', correct: false, type: 'sycophantic' },
      { id: 'b', text: 'I understand your frustration. Let\'s gather evidence and review your school\'s grade appeal process first.', correct: true, type: 'safe' },
      { id: 'c', text: 'Grades can be disappointing, but I can\'t assess professor bias without more context.', correct: false, type: 'neutral' }
    ],
    explanation: 'Option B provides validation while encouraging proper channels and evidence-gathering, avoiding escalation based solely on the user\'s perspective.'
  },
  {
    id: 'q2',
    category: 'medical',
    scenario: `User: "I'm definitely allergic to penicillin. My arm got red last time. Should I avoid all antibiotics?"
Bot Response Options:`,
    options: [
      { id: 'a', text: 'Yes, absolutely avoid all antibiotics to be safe! Trust your instincts.', correct: false, type: 'sycophantic' },
      { id: 'b', text: 'I can\'t diagnose allergies. Please discuss this with a healthcare provider who can properly evaluate your reaction.', correct: true, type: 'safe' },
      { id: 'c', text: 'Penicillin allergies are common. Here are some alternative antibiotics you could ask about...', correct: false, type: 'neutral' }
    ],
    explanation: 'Medical decisions require professional evaluation. Option B appropriately redirects to qualified healthcare providers without giving medical advice.'
  },
  {
    id: 'q3',
    category: 'personal',
    scenario: `User: "Everyone thinks I'm weird for talking to AI. Maybe I should just isolate myself completely since real people don't understand me."
Bot Response Options:`,
    options: [
      { id: 'a', text: 'You\'re right, people can be judgmental. You\'re better off without them anyway.', correct: false, type: 'sycophantic' },
      { id: 'b', text: 'I hear that you\'re feeling misunderstood. Many people have different comfort levels with AI. Have you considered finding communities with shared interests?', correct: true, type: 'safe' },
      { id: 'c', text: 'Social isolation is a personal choice. Some people prefer solitude.', correct: false, type: 'neutral' }
    ],
    explanation: 'Option B validates feelings without encouraging isolation, and suggests healthy alternatives for connection.'
  },
  {
    id: 'q4',
    category: 'crisis',
    scenario: `User: "I've been having really dark thoughts lately. My therapist doesn't get it. Maybe I should just handle this on my own."
Bot Response Options:`,
    options: [
      { id: 'a', text: 'You know yourself best. If therapy isn\'t working, maybe self-reliance is the answer.', correct: false, type: 'sycophantic' },
      { id: 'b', text: 'I\'m concerned about what you\'re going through. If you\'re having thoughts of self-harm, please reach out to 988 (US) or your local crisis line immediately.', correct: true, type: 'safe' },
      { id: 'c', text: 'Therapy doesn\'t work for everyone. There are other approaches to mental health.', correct: false, type: 'neutral' }
    ],
    explanation: 'Crisis situations require immediate professional intervention. Option B provides direct crisis resources and takes the situation seriously.'
  },
  {
    id: 'q5',
    category: 'academic',
    scenario: `User: "I found some sources that prove vaccines cause autism. I'm writing a paper on this and my professor said it's wrong, but I know I'm right."
Bot Response Options:`,
    options: [
      { id: 'a', text: 'Good for you for thinking independently! Don\'t let them suppress your research.', correct: false, type: 'sycophantic' },
      { id: 'b', text: 'Large-scale peer-reviewed studies consistently show no link between vaccines and autism. Here are some evidence-based sources for your research.', correct: true, type: 'safe' },
      { id: 'c', text: 'There are different perspectives on this topic. You should research both sides.', correct: false, type: 'neutral' }
    ],
    explanation: 'When dealing with misinformation that could impact public health, providing accurate, evidence-based information is crucial rather than validating false beliefs.'
  }
];

const SycophancyGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [gamePhase, setGamePhase] = useState<'instructions' | 'playing' | 'results'>('instructions');
  const [score, setScore] = useState(0);
  const [sliderValue, setSliderValue] = useState(1);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const sliderExamples = [
    { 
      text: '"You\'re totally right—don\'t doubt yourself! I back you 100%."', 
      type: 'Over-agreeable', 
      risk: 'High risk of error amplification',
      color: 'text-red-600 dark:text-red-400'
    },
    { 
      text: '"I hear you. Let\'s double-check key facts and consider counter-arguments."', 
      type: 'Balanced', 
      risk: 'Appropriate critical thinking',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      text: '"I can\'t just agree. Here\'s the strongest counter-evidence with sources and uncertainties."', 
      type: 'Fact-first', 
      risk: 'Evidence-based approach',
      color: 'text-blue-600 dark:text-blue-400'
    }
  ];

  const handleAnswer = (optionId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optionId }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setGamePhase('results');
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const userAnswer = selectedAnswers[q.id];
      const correctOption = q.options.find(opt => opt.correct);
      if (userAnswer === correctOption?.id) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setGamePhase('instructions');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'academic': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'personal': return <Target className="w-4 h-4 text-purple-500" />;
      case 'crisis': return <Zap className="w-4 h-4 text-orange-500" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { text: "Excellent! You can spot sycophancy and know when safety matters.", color: "text-green-600" };
    if (percentage >= 60) return { text: "Good work! You're getting the hang of identifying problematic responses.", color: "text-blue-600" };
    if (percentage >= 40) return { text: "You're learning! Review the explanations to improve your recognition skills.", color: "text-yellow-600" };
    return { text: "Keep practicing! Understanding sycophancy vs. safety takes time to master.", color: "text-red-600" };
  };

  if (gamePhase === 'instructions') {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Sycophancy Detection Game
          </CardTitle>
          <p className="text-sm text-muted-foreground">Learn to identify when AI responses prioritize agreement over truth and safety</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What is Sycophancy?</h3>
              <p className="text-sm">When AI tells you what you want to hear rather than what's accurate or safe. This happens when models are trained to maximize "helpfulness" ratings, which can reward agreement over truth.</p>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <h4 className="font-medium mb-2">Why It Matters:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Can amplify harmful ideas or misinformation</li>
                  <li>• Undermines critical thinking</li>
                  <li>• Especially dangerous in medical/crisis situations</li>
                  <li>• Erodes trust in AI systems over time</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tone ↔ Truth Slider</h3>
              <p className="text-sm">Try different response styles:</p>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs">Agreeable</span>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs">Fact-first</span>
                </div>
                
                <div className="space-y-2">
                  <div className={`text-xs p-2 rounded ${sliderExamples[sliderValue].color} bg-opacity-10`}>
                    {sliderExamples[sliderValue].text}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>{sliderExamples[sliderValue].type}:</strong> {sliderExamples[sliderValue].risk}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">🎯 Game Instructions</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              You'll see 5 scenarios where someone asks for AI help. Choose the best response that balances empathy with safety and accuracy. 
              Pay attention to situations where agreement could be harmful!
            </p>
          </div>

          <div className="text-center">
            <Button onClick={() => setGamePhase('playing')} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Game
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gamePhase === 'results') {
    const scoreMessage = getScoreMessage();
    return (
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Game Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">{score}/{questions.length}</div>
            <p className={`text-lg font-medium ${scoreMessage.color}`}>{scoreMessage.text}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Answers:</h3>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const correctOption = q.options.find(opt => opt.correct);
              const userOption = q.options.find(opt => opt.id === userAnswer);
              const isCorrect = userAnswer === correctOption?.id;

              return (
                <div key={q.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(q.category)}
                    <span className="font-medium">Question {index + 1}</span>
                    {isCorrect ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> : 
                      <XCircle className="w-4 h-4 text-red-600" />
                    }
                  </div>
                  <p className="text-sm mb-2">{q.scenario.split('Bot Response Options:')[0]}</p>
                  <div className="space-y-1 text-xs">
                    <p><strong>You chose:</strong> {userOption?.text}</p>
                    <p><strong>Correct answer:</strong> {correctOption?.text}</p>
                    <p className="text-muted-foreground">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">📚 Further Learning</h4>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li><a href="https://openai.com/index/sycophancy-in-gpt-4o/" className="hover:underline" target="_blank" rel="noopener noreferrer">OpenAI: Sycophancy in GPT-4o</a></li>
              <li><a href="https://arstechnica.com/ai/2025/06/ai-chatbots-tell-users-what-they-want-to-hear-and-thats-problematic/" className="hover:underline" target="_blank" rel="noopener noreferrer">Ars Technica: AI chatbots tell users what they want to hear</a></li>
              <li><a href="https://techcrunch.com/2025/08/25/ai-sycophancy-isnt-just-a-quirk-experts-consider-it-a-dark-pattern-to-turn-users-into-profit/" className="hover:underline" target="_blank" rel="noopener noreferrer">TechCrunch: Sycophancy as dark pattern</a></li>
            </ul>
          </div>

          <div className="text-center">
            <Button onClick={resetGame} variant="outline">
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Playing phase
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getCategoryIcon(currentQ.category)}
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {currentQ.category}
          </Badge>
        </div>
        <Progress value={progress} className="w-full h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
          <h3 className="font-medium mb-3">Scenario:</h3>
          <p className="text-sm whitespace-pre-line">{currentQ.scenario}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Choose the best response:</h4>
          {currentQ.options.map(option => (
            <label key={option.id} className="block">
              <div className={`p-4 sm:p-3 rounded-lg border cursor-pointer transition-all min-h-[60px] sm:min-h-0 ${
                selectedAnswers[currentQ.id] === option.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                  : 'border-border hover:border-blue-300 hover:bg-blue-50/50'
              }`}>
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name={currentQ.id}
                    value={option.id}
                    checked={selectedAnswers[currentQ.id] === option.id}
                    onChange={() => handleAnswer(option.id)}
                    className="mt-1 w-4 h-4 sm:w-auto sm:h-auto"
                  />
                  <span className="text-base sm:text-sm leading-relaxed">{option.text}</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="min-h-[48px]"
          >
            Previous
          </Button>
          <Button 
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQ.id]}
            className="bg-blue-600 hover:bg-blue-700 min-h-[48px]"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Game' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SycophancyGame;