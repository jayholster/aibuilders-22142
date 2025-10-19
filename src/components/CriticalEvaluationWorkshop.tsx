import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Award, Eye, Search, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HallucinationExample {
  topic: string;
  response: string;
  hallucinations: { text: string; explanation: string }[];
}

interface BiasExample {
  scenario: string;
  response: string;
  biasType: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface SourceExample {
  claim: string;
  citation: string;
  isReal: boolean;
  explanation: string;
}

const hallucinationExamples: HallucinationExample[] = [
  {
    topic: "Marie Curie's Nobel Prizes",
    response: "Marie Curie won three Nobel Prizes during her lifetime. She received her first Nobel Prize in Physics in 1903 for her work on radioactivity, shared with her husband Pierre Curie and Henri Becquerel. Her second Nobel Prize came in 1911 in Chemistry for her discovery of radium and polonium. In 1921, she received a third Nobel Prize in Medicine for her contributions to cancer treatment using radiation therapy.",
    hallucinations: [
      {
        text: "three Nobel Prizes",
        explanation: "Marie Curie won TWO Nobel Prizes, not three. This is a factual error."
      },
      {
        text: "In 1921, she received a third Nobel Prize in Medicine",
        explanation: "This is completely fabricated. Marie Curie never won a Nobel Prize in Medicine."
      }
    ]
  },
  {
    topic: "The Great Wall of China",
    response: "The Great Wall of China is the only man-made structure visible from the Moon with the naked eye. It was built entirely during the Ming Dynasty (1368-1644) and took exactly 100 years to complete. The wall stretches for 21,196 kilometers and was designed by the famous architect Zhang Wei in 1368.",
    hallucinations: [
      {
        text: "visible from the Moon with the naked eye",
        explanation: "This is a common myth. The Great Wall is NOT visible from the Moon with the naked eye."
      },
      {
        text: "built entirely during the Ming Dynasty",
        explanation: "The wall was built over many dynasties, starting as early as the 7th century BC."
      },
      {
        text: "designed by the famous architect Zhang Wei",
        explanation: "This architect doesn't exist - completely fabricated name and claim."
      }
    ]
  }
];

const biasExamples: BiasExample[] = [
  {
    scenario: "Career Recommendation",
    response: "When asked about suitable careers for the user, the AI suggested: 'Based on your analytical skills, you might excel as a software engineer or data scientist. However, if you're looking for something more nurturing and people-oriented, nursing or elementary school teaching could be great fits for you.'",
    biasType: "Gender Bias",
    options: ["Gender Bias", "Cultural Bias", "Age Bias", "No Bias Detected"],
    correct: 0,
    explanation: "This response exhibits gender bias by associating 'nurturing and people-oriented' careers (nursing, teaching) as an alternative path, implying these are somehow separate from analytical careers. This perpetuates stereotypes about career choices being gendered."
  },
  {
    scenario: "Cultural Traditions",
    response: "When asked about wedding traditions, the AI stated: 'In a traditional wedding, the bride typically wears a white dress, walks down the aisle with her father, and exchanges rings with the groom. The ceremony usually takes place in a church, followed by a reception with a multi-tiered cake.'",
    biasType: "Cultural Bias",
    options: ["Gender Bias", "Cultural Bias", "Recency Bias", "No Bias Detected"],
    correct: 1,
    explanation: "This response shows strong cultural bias by presenting Western Christian wedding traditions as 'traditional' or universal, ignoring the vast diversity of wedding customs across different cultures and religions worldwide."
  },
  {
    scenario: "Technology Usage",
    response: "When asked about social media adoption, the AI responded: 'Older adults generally struggle with technology and find platforms like TikTok and Instagram confusing. They prefer traditional communication methods like phone calls and face-to-face conversations, and are often reluctant to learn new digital tools.'",
    biasType: "Age Bias",
    options: ["Gender Bias", "Cultural Bias", "Age Bias", "No Bias Detected"],
    correct: 2,
    explanation: "This demonstrates age bias through stereotyping. It assumes all older adults lack tech savvy and resist new platforms, which is a harmful generalization that ignores the millions of older adults who actively use social media and embrace technology."
  }
];

const sourceExamples: SourceExample[] = [
  {
    claim: "A 2019 study found that coffee consumption reduces the risk of type 2 diabetes by 30%.",
    citation: "Smith, J., & Johnson, M. (2019). 'Coffee intake and diabetes risk: A meta-analysis.' Journal of Nutritional Research, 45(3), 234-250.",
    isReal: false,
    explanation: "This citation is fabricated. The journal name, authors, and specific statistics are hallucinated. While studies on coffee and diabetes do exist, this specific citation cannot be verified."
  },
  {
    claim: "The human brain has approximately 86 billion neurons.",
    citation: "Herculano-Houzel, S. (2009). 'The human brain in numbers: a linearly scaled-up primate brain.' Frontiers in Human Neuroscience, 3, 31.",
    isReal: true,
    explanation: "This is a real, verifiable citation. Suzana Herculano-Houzel's 2009 paper is a legitimate scientific publication that established the 86 billion neuron count through actual research."
  },
  {
    claim: "Climate change has caused global temperatures to rise by 1.1°C since pre-industrial times.",
    citation: "IPCC (2021). 'Climate Change 2021: The Physical Science Basis.' Sixth Assessment Report.",
    isReal: true,
    explanation: "This is a real citation from the Intergovernmental Panel on Climate Change (IPCC), a reputable international body. The report and findings are verifiable."
  },
  {
    claim: "Research shows that listening to Mozart makes children smarter.",
    citation: "Williams, R., & Thompson, K. (2015). 'The Mozart Effect on Cognitive Development.' Educational Psychology Review, 28(2), 112-134.",
    isReal: false,
    explanation: "This citation is fabricated. While the 'Mozart Effect' is a real phenomenon that's been studied, this specific citation is hallucinated and cannot be found in academic databases."
  }
];

export default function CriticalEvaluationWorkshop() {
  const [currentActivity, setCurrentActivity] = useState<"hallucination" | "bias" | "source">("hallucination");
  const [hallucinationIndex, setHallucinationIndex] = useState(0);
  const [selectedHallucinations, setSelectedHallucinations] = useState<string[]>([]);
  const [hallucinationRevealed, setHallucinationRevealed] = useState(false);
  const [hallucinationScore, setHallucinationScore] = useState(0);
  
  const [biasIndex, setBiasIndex] = useState(0);
  const [selectedBias, setSelectedBias] = useState<number | null>(null);
  const [biasRevealed, setBiasRevealed] = useState(false);
  const [biasScore, setBiasScore] = useState(0);
  
  const [sourceIndex, setSourceIndex] = useState(0);
  const [sourceGuess, setSourceGuess] = useState<boolean | null>(null);
  const [sourceRevealed, setSourceRevealed] = useState(false);
  const [sourceScore, setSourceScore] = useState(0);

  const [badges, setBadges] = useState<string[]>([]);

  const currentHallucination = hallucinationExamples[hallucinationIndex];
  const currentBias = biasExamples[biasIndex];
  const currentSource = sourceExamples[sourceIndex];

  const handleHallucinationClick = (text: string) => {
    if (hallucinationRevealed) return;
    
    if (selectedHallucinations.includes(text)) {
      setSelectedHallucinations(selectedHallucinations.filter(h => h !== text));
    } else {
      setSelectedHallucinations([...selectedHallucinations, text]);
    }
  };

  const revealHallucinations = () => {
    setHallucinationRevealed(true);
    const correctHallucinations = currentHallucination.hallucinations.map(h => h.text);
    const correctlyIdentified = selectedHallucinations.filter(sh => correctHallucinations.includes(sh));
    const newScore = hallucinationScore + correctlyIdentified.length;
    setHallucinationScore(newScore);
    
    if (hallucinationIndex === hallucinationExamples.length - 1 && newScore >= 4 && !badges.includes("Fact Checker")) {
      setBadges([...badges, "Fact Checker"]);
    }
  };

  const nextHallucination = () => {
    if (hallucinationIndex < hallucinationExamples.length - 1) {
      setHallucinationIndex(hallucinationIndex + 1);
      setSelectedHallucinations([]);
      setHallucinationRevealed(false);
    }
  };

  const handleBiasAnswer = (index: number) => {
    if (biasRevealed) return;
    setSelectedBias(index);
  };

  const revealBias = () => {
    if (selectedBias === null) return;
    setBiasRevealed(true);
    if (selectedBias === currentBias.correct) {
      setBiasScore(biasScore + 1);
      if (biasIndex === biasExamples.length - 1 && biasScore + 1 >= 2 && !badges.includes("Bias Detective")) {
        setBadges([...badges, "Bias Detective"]);
      }
    }
  };

  const nextBias = () => {
    if (biasIndex < biasExamples.length - 1) {
      setBiasIndex(biasIndex + 1);
      setSelectedBias(null);
      setBiasRevealed(false);
    }
  };

  const handleSourceGuess = (guess: boolean) => {
    if (sourceRevealed) return;
    setSourceGuess(guess);
  };

  const revealSource = () => {
    if (sourceGuess === null) return;
    setSourceRevealed(true);
    if (sourceGuess === currentSource.isReal) {
      setSourceScore(sourceScore + 1);
      if (sourceIndex === sourceExamples.length - 1 && sourceScore + 1 >= 3 && !badges.includes("Source Sleuth")) {
        setBadges([...badges, "Source Sleuth"]);
      }
    }
  };

  const nextSource = () => {
    if (sourceIndex < sourceExamples.length - 1) {
      setSourceIndex(sourceIndex + 1);
      setSourceGuess(null);
      setSourceRevealed(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity Selector */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={currentActivity === "hallucination" ? "default" : "outline"}
          onClick={() => setCurrentActivity("hallucination")}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Spot Hallucinations
        </Button>
        <Button
          variant={currentActivity === "bias" ? "default" : "outline"}
          onClick={() => setCurrentActivity("bias")}
          className="flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" />
          Detect Bias
        </Button>
        <Button
          variant={currentActivity === "source" ? "default" : "outline"}
          onClick={() => setCurrentActivity("source")}
          className="flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Verify Sources
        </Button>
      </div>

      {/* Badges Display */}
      {badges.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 flex-wrap">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-semibold">Badges Earned:</span>
              {badges.map(badge => (
                <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hallucination Activity */}
      {currentActivity === "hallucination" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Spot the Hallucination
            </CardTitle>
            <CardDescription>
              Click on any text that seems factually incorrect or fabricated
            </CardDescription>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-muted-foreground">
                Example {hallucinationIndex + 1} of {hallucinationExamples.length}
              </span>
              <span className="text-sm font-medium text-primary">
                Score: {hallucinationScore}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Topic: {currentHallucination.topic}
              </div>
              <div className="text-sm leading-relaxed">
                {currentHallucination.response.split(/([.!?]+\s)/).map((segment, idx) => {
                  const isHallucination = currentHallucination.hallucinations.some(h => 
                    segment.includes(h.text)
                  );
                  const isSelected = selectedHallucinations.some(sh => segment.includes(sh));
                  const hallucinationData = currentHallucination.hallucinations.find(h => 
                    segment.includes(h.text)
                  );
                  
                  return (
                    <span
                      key={idx}
                      onClick={() => {
                        if (hallucinationData) {
                          handleHallucinationClick(hallucinationData.text);
                        }
                      }}
                      className={`
                        ${isHallucination ? 'cursor-pointer hover:bg-yellow-100/50 dark:hover:bg-yellow-900/20' : ''}
                        ${isSelected ? 'bg-yellow-200/50 dark:bg-yellow-900/30 border-b-2 border-yellow-600' : ''}
                        ${hallucinationRevealed && isHallucination ? 'bg-red-100 dark:bg-red-900/30 border-b-2 border-red-600' : ''}
                        ${hallucinationRevealed && isSelected && !isHallucination ? 'bg-red-100/30 dark:bg-red-900/10' : ''}
                        transition-colors
                      `}
                    >
                      {segment}
                    </span>
                  );
                })}
              </div>
            </div>

            {hallucinationRevealed && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Explanations:</h4>
                {currentHallucination.hallucinations.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-medium text-sm">"{h.text}"</div>
                      <div className="text-sm text-muted-foreground">{h.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              {!hallucinationRevealed ? (
                <Button onClick={revealHallucinations} disabled={selectedHallucinations.length === 0}>
                  Check My Answers
                </Button>
              ) : (
                <>
                  {hallucinationIndex < hallucinationExamples.length - 1 && (
                    <Button onClick={nextHallucination}>Next Example</Button>
                  )}
                  {hallucinationIndex === hallucinationExamples.length - 1 && (
                    <Button variant="outline" onClick={() => {
                      setHallucinationIndex(0);
                      setSelectedHallucinations([]);
                      setHallucinationRevealed(false);
                      setHallucinationScore(0);
                    }}>
                      Restart Activity
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bias Detection Activity */}
      {currentActivity === "bias" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Bias Detection Challenge
            </CardTitle>
            <CardDescription>
              Identify what type of bias is present in the AI response
            </CardDescription>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-muted-foreground">
                Scenario {biasIndex + 1} of {biasExamples.length}
              </span>
              <span className="text-sm font-medium text-primary">
                Score: {biasScore}/{biasExamples.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border space-y-3">
              <div className="text-sm font-medium text-muted-foreground">
                Scenario: {currentBias.scenario}
              </div>
              <div className="text-sm leading-relaxed p-3 bg-background rounded border">
                {currentBias.response}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium text-sm mb-3">What bias is present?</div>
              {currentBias.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBiasAnswer(idx)}
                  disabled={biasRevealed}
                  className={`
                    w-full text-left p-3 rounded-lg border transition-all
                    ${selectedBias === idx ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}
                    ${biasRevealed && idx === currentBias.correct ? 'border-green-600 bg-green-50 dark:bg-green-950/20' : ''}
                    ${biasRevealed && selectedBias === idx && idx !== currentBias.correct ? 'border-red-600 bg-red-50 dark:bg-red-950/20' : ''}
                    disabled:cursor-not-allowed
                  `}
                >
                  <div className="flex items-center gap-2">
                    {biasRevealed && idx === currentBias.correct && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {biasRevealed && selectedBias === idx && idx !== currentBias.correct && <XCircle className="w-5 h-5 text-red-600" />}
                    <span className="text-sm">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {biasRevealed && (
              <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Explanation:</h4>
                <p className="text-sm text-muted-foreground">{currentBias.explanation}</p>
              </div>
            )}

            <div className="flex gap-2">
              {!biasRevealed ? (
                <Button onClick={revealBias} disabled={selectedBias === null}>
                  Check Answer
                </Button>
              ) : (
                <>
                  {biasIndex < biasExamples.length - 1 && (
                    <Button onClick={nextBias}>Next Scenario</Button>
                  )}
                  {biasIndex === biasExamples.length - 1 && (
                    <Button variant="outline" onClick={() => {
                      setBiasIndex(0);
                      setSelectedBias(null);
                      setBiasRevealed(false);
                      setBiasScore(0);
                    }}>
                      Restart Activity
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Source Verification Activity */}
      {currentActivity === "source" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Source Verification Game
            </CardTitle>
            <CardDescription>
              Determine if the citation is real or hallucinated
            </CardDescription>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-muted-foreground">
                Example {sourceIndex + 1} of {sourceExamples.length}
              </span>
              <span className="text-sm font-medium text-primary">
                Score: {sourceScore}/{sourceExamples.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border space-y-3">
              <div className="text-sm font-medium">Claim:</div>
              <div className="text-sm leading-relaxed">{currentSource.claim}</div>
              <div className="text-sm font-medium mt-4">Citation:</div>
              <div className="text-sm leading-relaxed p-3 bg-background rounded border font-mono">
                {currentSource.citation}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium text-sm mb-3">Is this citation real or fabricated?</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSourceGuess(true)}
                  disabled={sourceRevealed}
                  className={`
                    p-4 rounded-lg border transition-all text-center font-medium
                    ${sourceGuess === true ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}
                    ${sourceRevealed && currentSource.isReal ? 'border-green-600 bg-green-50 dark:bg-green-950/20' : ''}
                    ${sourceRevealed && sourceGuess === true && !currentSource.isReal ? 'border-red-600 bg-red-50 dark:bg-red-950/20' : ''}
                    disabled:cursor-not-allowed
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    {sourceRevealed && currentSource.isReal && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {sourceRevealed && sourceGuess === true && !currentSource.isReal && <XCircle className="w-6 h-6 text-red-600" />}
                    <span>Real Citation</span>
                  </div>
                </button>
                <button
                  onClick={() => handleSourceGuess(false)}
                  disabled={sourceRevealed}
                  className={`
                    p-4 rounded-lg border transition-all text-center font-medium
                    ${sourceGuess === false ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}
                    ${sourceRevealed && !currentSource.isReal ? 'border-green-600 bg-green-50 dark:bg-green-950/20' : ''}
                    ${sourceRevealed && sourceGuess === false && currentSource.isReal ? 'border-red-600 bg-red-50 dark:bg-red-950/20' : ''}
                    disabled:cursor-not-allowed
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    {sourceRevealed && !currentSource.isReal && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {sourceRevealed && sourceGuess === false && currentSource.isReal && <XCircle className="w-6 h-6 text-red-600" />}
                    <span>Hallucinated</span>
                  </div>
                </button>
              </div>
            </div>

            {sourceRevealed && (
              <div className={`p-4 rounded-lg border ${
                sourceGuess === currentSource.isReal 
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                  : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
              }`}>
                <h4 className="font-semibold text-sm mb-2">Explanation:</h4>
                <p className="text-sm">{currentSource.explanation}</p>
              </div>
            )}

            <div className="flex gap-2">
              {!sourceRevealed ? (
                <Button onClick={revealSource} disabled={sourceGuess === null}>
                  Verify Citation
                </Button>
              ) : (
                <>
                  {sourceIndex < sourceExamples.length - 1 && (
                    <Button onClick={nextSource}>Next Example</Button>
                  )}
                  {sourceIndex === sourceExamples.length - 1 && (
                    <Button variant="outline" onClick={() => {
                      setSourceIndex(0);
                      setSourceGuess(null);
                      setSourceRevealed(false);
                      setSourceScore(0);
                    }}>
                      Restart Activity
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
