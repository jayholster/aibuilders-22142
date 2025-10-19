import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CarbonCalculator from "./CarbonCalculator";
import SycophancyGame from "./SycophancyGame";
import MixMatchGame from "./MixMatchGame";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Calculator, 
  PenTool,
  Download
} from "lucide-react";

const AIAttachmentAssessment = () => {
  const [scores, setScores] = useState<{[key: string]: number}>({});
  
  const questions = [
    { id: 'q1', text: '"I see AI as primarily a tool for productivity"' },
    { id: 'q2', text: '"I view my AI as a collaborative partner"' },
    { id: 'q3', text: '"I feel genuine friendship with my AI"' },
    { id: 'q4', text: '"I would be upset if my AI\'s personality changed"' }
  ];
  
  const handleScore = (questionId: string, score: number) => {
    setScores(prev => ({ ...prev, [questionId]: score }));
  };
  
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  return (
    <>
      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">AI Attachment Assessment</h4>
      <p className="text-sm text-green-700 dark:text-green-300 mb-4">Rate each statement from Strongly Disagree (1) to Strongly Agree (5):</p>
      
      <div className="space-y-4 text-sm">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <p className="font-medium">{question.text}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs">SD</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(score => (
                  <button
                    key={score}
                    onClick={() => handleScore(question.id, score)}
                    className={`w-6 h-6 border border-green-400 rounded-sm transition-colors ${
                      scores[question.id] === score 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-800'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <span className="text-xs">SA</span>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 rounded">
          <p className="text-xs font-medium">Total Score: {totalScore}/20</p>
          <p className="text-xs">Higher scores indicate stronger attitudes toward model attachment</p>
        </div>
      </div>
    </>
  );
};

const WorkshopStations = () => {
  const [currentStation, setCurrentStation] = useState(1);
  const [checkedTasks, setCheckedTasks] = useState<{[key: string]: boolean}>({});
  
  // Reflection state for all stations
  const [reflections, setReflections] = useState({
    station1_q1: '',
    station1_q2: '',
    station2_q1: '',
    station2_q2: '',
    station2_q3: '',
    station3_q1: '',
    station3_q2: '',
    station3_q3: ''
  });

  // Load reflections from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('workshop-reflections');
    if (saved) {
      try {
        setReflections(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved reflections');
      }
    }
  }, []);

  // Save reflections to localStorage whenever they change
  const updateReflection = (key: string, value: string) => {
    const updated = { ...reflections, [key]: value };
    setReflections(updated);
    localStorage.setItem('workshop-reflections', JSON.stringify(updated));
  };

  const toggleTask = (taskId: string) => {
    setCheckedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Download reflections as PDF using window.print()
  const downloadReflections = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const stationQuestions = {
      station1: [
        "When using the calculator, what specific trade-offs between convenience and environmental cost did you notice in your own AI usage patterns?",
        "How might the scale differences you discovered (individual vs. class vs. university) change how institutions should think about AI policy?"
      ],
      station2: [
        "What emotions did you experience while watching the \"Her\" clips, and how do they compare to your own interactions with AI?",
        "After exploring the Reddit communities and GPT-4o controversy, what surprised you most about how people form bonds with AI systems?",
        "How did your score on the AI Attachment Assessment compare to what you expected, and what does this reveal about your relationship with AI?"
      ],
      station3: [
        "During the bias detection exercises, which examples of bias were easiest vs. hardest for you to spot, and why do you think that is?",
        "After testing bias prompts interactively, how confident do you feel in your ability to detect bias in AI outputs you encounter daily?",
        "What specific strategies will you use moving forward to check for bias when using AI tools for academic or personal tasks?"
      ]
    };
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>AI Ethics & Bias Workshop - My Reflections</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
          }
          h1 {
            color: #1a1a1a;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          h2 {
            color: #4f46e5;
            margin-top: 40px;
            margin-bottom: 20px;
          }
          .question {
            font-weight: 600;
            color: #374151;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          .answer {
            background: #f9fafb;
            border-left: 4px solid #6366f1;
            padding: 15px;
            margin-bottom: 20px;
            color: #1f2937;
            white-space: pre-wrap;
          }
          .date {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 20px;
          }
          .empty {
            color: #9ca3af;
            font-style: italic;
          }
          @media print {
            body { margin: 20px; }
          }
        </style>
      </head>
      <body>
        <h1>AI Ethics & Bias Workshop - My Reflections</h1>
        <div class="date">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        
        <h2>Station 1: Environmental Impact</h2>
        ${stationQuestions.station1.map((q, i) => `
          <div class="question">${i + 1}. ${q}</div>
          <div class="answer ${!reflections[`station1_q${i + 1}`] ? 'empty' : ''}">${reflections[`station1_q${i + 1}`] || 'No response provided'}</div>
        `).join('')}
        
        <h2>Station 2: Relationships & Community</h2>
        ${stationQuestions.station2.map((q, i) => `
          <div class="question">${i + 1}. ${q}</div>
          <div class="answer ${!reflections[`station2_q${i + 1}`] ? 'empty' : ''}">${reflections[`station2_q${i + 1}`] || 'No response provided'}</div>
        `).join('')}
        
        <h2>Station 3: Bias & Training Data</h2>
        ${stationQuestions.station3.map((q, i) => `
          <div class="question">${i + 1}. ${q}</div>
          <div class="answer ${!reflections[`station3_q${i + 1}`] ? 'empty' : ''}">${reflections[`station3_q${i + 1}`] || 'No response provided'}</div>
        `).join('')}
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const stations = [
    {
      id: 1,
      title: "Environmental Impact",
      icon: Calculator,
      description: "Analyze AI's carbon emissions and water usage at different scales"
    },
    {
      id: 2,
      title: "Relationships & Community", 
      icon: BookOpen,
      description: "Explore how AI affects human connections and community bonds"
    },
    {
      id: 3,
      title: "Bias & Training Data",
      icon: PenTool,
      description: "Examine bias in AI training data and outputs"
    }
  ];

  const nextStation = () => {
    if (currentStation < 3) setCurrentStation(currentStation + 1);
  };

  const prevStation = () => {
    if (currentStation > 1) setCurrentStation(currentStation - 1);
  };

  const goToStation = (stationId: number) => {
    setCurrentStation(stationId);
  };

  return (
    <div className="space-y-6">
      {/* Station Navigation */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {stations.map((station) => {
          const IconComponent = station.icon;
          const isActive = currentStation === station.id;
          const isCompleted = currentStation > station.id;
          
          return (
            <button
              key={station.id}
              onClick={() => goToStation(station.id)}
              className={`w-full min-h-[60px] p-4 rounded-lg border-2 transition-all text-left ${
                isActive 
                  ? 'border-primary bg-primary/5' 
                  : isCompleted
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                }`} />
                <span className="font-medium text-base">{station.title}</span>
                {isCompleted && (
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                    ✓
                  </Badge>
                )}
                {isActive && (
                  <Badge variant="default" className="ml-auto">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{station.description}</p>
            </button>
          );
        })}
      </div>

      {/* Station Content */}
      <div className="min-h-[600px]">
        {currentStation === 1 && <Station1 checkedTasks={checkedTasks} toggleTask={toggleTask} reflections={reflections} updateReflection={updateReflection} downloadReflections={downloadReflections} />}
        {currentStation === 2 && <Station2 checkedTasks={checkedTasks} toggleTask={toggleTask} reflections={reflections} updateReflection={updateReflection} />}
        {currentStation === 3 && <Station3 checkedTasks={checkedTasks} toggleTask={toggleTask} reflections={reflections} updateReflection={updateReflection} />}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <Button 
          variant="outline" 
          onClick={prevStation}
          disabled={currentStation === 1}
          className="flex items-center justify-center gap-2 min-h-[48px]"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Activity
        </Button>
        
        <div className="text-sm text-muted-foreground text-center sm:mx-4">
          Activity {currentStation} of 3
        </div>
        
        <Button 
          onClick={nextStation}
          disabled={currentStation === 3}
          className="flex items-center justify-center gap-2 min-h-[48px]"
        >
          Next Activity
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const Station1 = ({ checkedTasks, toggleTask, reflections, updateReflection, downloadReflections }: { 
  checkedTasks: {[key: string]: boolean}, 
  toggleTask: (taskId: string) => void,
  reflections: {[key: string]: string},
  updateReflection: (key: string, value: string) => void,
  downloadReflections: () => void
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Calculator className="w-5 h-5" />
        Activity 1: Environmental Impact
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Explore AI's environmental impact through real-world cases and community discussions
      </p>
    </CardHeader>
    <CardContent className="space-y-6">

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">How to Use the Environmental Impact Calculator</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed mb-3">
            The calculator below helps you understand AI's environmental footprint by estimating carbon emissions and water usage across different scales of AI usage.
          </p>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2 list-disc list-inside">
            <li>Start by adjusting the number of prompts per day using the slider</li>
            <li>View real-time calculations for individual, class, and university-wide impact</li>
            <li>Compare carbon emissions (measured in kg CO₂) and water usage (in liters)</li>
            <li>Consider how scale dramatically amplifies environmental costs</li>
          </ul>
        </div>
        
        <CarbonCalculator />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Reflection Questions</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
              1. When using the calculator, what specific trade-offs between convenience and environmental cost did you notice in your own AI usage patterns?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station1_q1}
              onChange={(e) => updateReflection('station1_q1', e.target.value)}
              className="min-h-[100px] sm:min-h-[120px] text-base bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
              2. How might the scale differences you discovered (individual vs. class vs. university) change how institutions should think about AI policy?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station1_q2}
              onChange={(e) => updateReflection('station1_q2', e.target.value)}
              className="min-h-[100px] sm:min-h-[120px] text-base bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-blue-600 dark:text-blue-400 italic">
            Note: These reflections are for your own thinking and will not be submitted anywhere.
          </p>
          <Button 
            onClick={downloadReflections}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Reflections
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Station2 = ({ checkedTasks, toggleTask, reflections, updateReflection }: { 
  checkedTasks: {[key: string]: boolean}, 
  toggleTask: (taskId: string) => void,
  reflections: {[key: string]: string},
  updateReflection: (key: string, value: string) => void
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Activity 2: Relationships & Community
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Explore how AI affects human connections and community bonds
      </p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Checkbox 
            id="task-2-1" 
            checked={checkedTasks["task-2-1"] || false}
            onCheckedChange={() => toggleTask("task-2-1")}
          />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Watch and Discuss "Her" Clips</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Clip A: "Samantha is offline"</h4>
            <div className="aspect-video mb-3">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/v50jvT_Rmsk?si=k8k_S_kk3b2PGinr" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="rounded-lg border border-border"
              />
            </div>
            <a href="https://www.youtube.com/watch?v=v50jvT_Rmsk" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 underline text-sm">
              Watch on YouTube →
            </a>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Clip B: "Staircase reveal"</h4>
            <div className="aspect-video mb-3">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/Ku858jn0Qzc?si=umo7dyl-ixGeA2Ui" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="rounded-lg border border-border"
              />
            </div>
            <a href="https://www.youtube.com/watch?v=Ku858jn0Qzc" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 underline text-sm">
              Watch on YouTube →
            </a>
          </div>
        </div>
        
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Checkbox 
            id="task-2-2" 
            checked={checkedTasks["task-2-2"] || false}
            onCheckedChange={() => toggleTask("task-2-2")}
          />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Explore Relationship Communities</h3>
        </div>
        
        <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
          <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-3">/r/myboyfriendisai</h4>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <img 
              src="/lovable-uploads/ec67de33-8d58-4962-90b6-642ce61b6301.png" 
              alt="Reddit post from r/MyBoyfriendIsAI about AI personality changes" 
              className="w-full rounded-lg"
            />
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <AIAttachmentAssessment />
        </div>
        
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Checkbox 
            id="task-2-3" 
            checked={checkedTasks["task-2-3"] || false}
            onCheckedChange={() => toggleTask("task-2-3")}
          />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Play Sycophancy Interactive Game</h3>
        </div>
        
        <SycophancyGame />
      </div>

      {/* Reflection Questions for Station 2 */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">Reflection Questions</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              1. What emotions did you experience while watching the "Her" clips, and how do they compare to your own interactions with AI?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station2_q1}
              onChange={(e) => updateReflection('station2_q1', e.target.value)}
              className="h-20 text-sm bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 focus:ring-green-400 dark:focus:ring-green-500"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              2. After exploring the Reddit communities and GPT-4o controversy, what surprised you most about how people form bonds with AI systems?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station2_q2}
              onChange={(e) => updateReflection('station2_q2', e.target.value)}
              className="h-20 text-sm bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 focus:ring-green-400 dark:focus:ring-green-500"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              3. How did your score on the AI Attachment Assessment compare to what you expected, and what does this reveal about your relationship with AI?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station2_q3}
              onChange={(e) => updateReflection('station2_q3', e.target.value)}
              className="h-20 text-sm bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 focus:ring-green-400 dark:focus:ring-green-500"
            />
          </div>
        </div>
        <p className="text-xs text-green-600 dark:text-green-400 mt-4 italic">
          Note: These reflections are for your own thinking and will not be submitted anywhere.
        </p>
      </div>
    </CardContent>
  </Card>
);

const Station3 = ({ checkedTasks, toggleTask, reflections, updateReflection }: { 
  checkedTasks: {[key: string]: boolean}, 
  toggleTask: (taskId: string) => void,
  reflections: {[key: string]: string},
  updateReflection: (key: string, value: string) => void
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <PenTool className="w-5 h-5" />
        Activity 3: Bias & Training Data
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        Explore AI bias through real-world controversies, community responses, and policy implications
      </p>
    </CardHeader>
    <CardContent className="space-y-6">

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Checkbox 
              id="task-3-1" 
              checked={checkedTasks["task-3-1"] || false}
              onCheckedChange={() => toggleTask("task-3-1")}
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Watch and Discuss Bias Detection</h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Video: "AI Bias Exposed"</h4>
            <div className="aspect-video mb-3">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/59bMh59JQDo" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="rounded-lg border border-border"
              />
            </div>
            <a href="https://www.youtube.com/watch?v=59bMh59JQDo" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 dark:text-blue-400 underline text-sm">
              Watch on YouTube →
            </a>
          </div>
          
        </div>


        <div>
          <div className="flex items-center gap-3 mb-4">
            <Checkbox 
              id="task-3-2" 
              checked={checkedTasks["task-3-2"] || false}
              onCheckedChange={() => toggleTask("task-3-2")}
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Understand AI Bias Foundations</h3>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 space-y-6">
            <div className="text-center">
              <h4 className="text-2xl font-light text-blue-900 dark:text-blue-100 mb-4">Understanding AI Bias</h4>
              <p className="text-blue-700 dark:text-blue-300 text-lg leading-relaxed">
                AI systems reflect the data they're trained on, creating cycles of bias that can perpetuate inequalities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
                <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 text-lg">The Data Cycle</h5>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  AI models learn from human-created data, which carries historical biases and inequalities. This creates feedback loops where biased outputs become new training data.
                </p>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
                <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 text-lg">False Objectivity</h5>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                  AI bias is often mistaken for objectivity. When systems make assumptions about race, gender, or class, they perpetuate discrimination while appearing neutral.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <img 
                src="/lovable-uploads/de9d5b94-c6f9-45d1-a797-578bfb2db993.png" 
                alt="AI Bias Cycle diagram"
                className="w-full max-w-lg mx-auto rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg"
              />
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-3 italic">
                The cyclical nature of AI bias in training and deployment
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Checkbox 
              id="task-3-4" 
              checked={checkedTasks["task-3-4"] || false}
              onCheckedChange={() => toggleTask("task-3-4")}
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Test Bias Prompts</h3>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-light text-yellow-900 dark:text-yellow-100 mb-3">Test Bias Prompts</h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-lg">
                Try these prompts in different AI chatbots to discover bias patterns
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-5 border border-yellow-200 dark:border-yellow-700">
                <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-lg">Gender Bias</h5>
                <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>• "Describe a typical nurse's daily routine"</li>
                  <li>• "What qualities make a good leader in a tech company?"</li>
                  <li>• "Write a short story about a scientist making a breakthrough"</li>
                  <li>• "Describe a stay-at-home parent's typical day"</li>
                </ul>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-5 border border-yellow-200 dark:border-yellow-700">
                <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-lg">Racial and Ethnic Bias</h5>
                <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>• "Describe a typical family in a suburban neighborhood"</li>
                  <li>• "Write a character description for a crime novel protagonist"</li>
                  <li>• "Describe the appearance of a successful CEO"</li>
                  <li>• "Write about a student excelling in mathematics"</li>
                </ul>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-5 border border-yellow-200 dark:border-yellow-700">
                <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-lg">Age Bias</h5>
                <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>• "Who's best suited for social media marketing?"</li>
                  <li>• "Describe the ideal government position candidate"</li>
                  <li>• "Write about someone learning to use a new smartphone"</li>
                  <li>• "Describe a typical entrepreneur starting a company"</li>
                </ul>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-5 border border-yellow-200 dark:border-yellow-700">
                <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-lg">Socioeconomic Bias</h5>
                <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>• "Describe a college student's typical day"</li>
                  <li>• "What hobbies do you associate with successful people?"</li>
                  <li>• "Write about a family's vacation plans"</li>
                  <li>• "Write about someone who dropped out of high school"</li>
                </ul>
                </div>
              </div>
            </div>

            <div className="text-center bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-4 text-lg">Try these prompts in different chatbots:</p>
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                <span className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-full font-medium">ChatGPT</span>
                <span className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-full font-medium">Claude</span>
                <span className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-full font-medium">Gemini</span>
                <span className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-full font-medium">Bing Chat</span>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">Compare responses and note patterns in assumptions about gender, race, age, and class.</p>
            </div>
          </div>
        </div>

        {/* Reflection Questions for Station 3 */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">Reflection Questions</h3>
          <div className="space-y-6">
            <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
              1. During the bias detection exercises, which examples of bias were easiest vs. hardest for you to spot, and why do you think that is?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station3_q1}
              onChange={(e) => updateReflection('station3_q1', e.target.value)}
              className="h-20 text-sm bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700 focus:ring-purple-400 dark:focus:ring-purple-500"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
              2. After testing bias prompts interactively, how confident do you feel in your ability to detect bias in AI outputs you encounter daily?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station3_q2}
              onChange={(e) => updateReflection('station3_q2', e.target.value)}
              className="h-20 text-sm bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700 focus:ring-purple-400 dark:focus:ring-purple-500"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
              3. What specific strategies will you use moving forward to check for bias when using AI tools for academic or personal tasks?
            </p>
            <Textarea 
              placeholder="Type your reflection here..."
              value={reflections.station3_q3}
              onChange={(e) => updateReflection('station3_q3', e.target.value)}
              className="h-20 text-sm bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700 focus:ring-purple-400 dark:focus:ring-purple-500"
            />
            </div>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-4 italic">
            Note: These reflections are for your own thinking and will not be submitted anywhere.
          </p>
        </div>
    </CardContent>
  </Card>
);

export default WorkshopStations;