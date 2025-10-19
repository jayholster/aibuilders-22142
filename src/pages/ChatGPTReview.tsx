import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CourseTimeline from "@/components/CourseTimeline";
import TaskChecklist from "@/components/TaskChecklist";
import ReasoningModelsComparison from "@/components/ReasoningModelsComparison";
import ArticleViewer from "@/components/ArticleViewer";
import PromptEngineeringLab from "@/components/PromptEngineeringLab";
import CapabilitiesQuiz from "@/components/CapabilitiesQuiz";
import CriticalEvaluationWorkshop from "@/components/CriticalEvaluationWorkshop";
import ExtendedToolsExplorer from "@/components/ExtendedToolsExplorer";

import StatsCards from "@/components/StatsCards";
import LearningOutcomes from "@/components/LearningOutcomes";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Video, 
  Calendar, 
  FileText, 
  MessageCircle, 
  ExternalLink,
  Info,
  Users,
  CheckCircle2,
  Clock,
  Copy,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  GraduationCap,
  MessageSquare,
  Brain,
  Shield,
  Settings,
  Scale,
  Image,
  Paperclip,
  Link as LinkIcon
} from "lucide-react";
import { useState } from "react";

const ChatGPTReview = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [articleOpen, setArticleOpen] = useState(false);

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const taskItems = [
    {
      name: "Gemini",
      url: "https://gemini.google/students",
      description: "Google's multimodal AI assistant for text, image, and document analysis"
    },
    {
      name: "ChatGPT",
      url: "https://chat.openai.com/signup",
      description: "OpenAI's conversational AI for text generation and problem-solving"
    },
    {
      name: "Claude",
      url: "https://claude.ai",
      description: "Anthropic's AI assistant focused on helpful, harmless, and honest responses"
    },
    {
      name: "Lovable",
      url: "https://lovable.dev",
      description: "AI-powered web development platform for creating interactive websites"
    },
    {
      name: "Udio",
      url: "https://udio.com",
      description: "AI music generation tool for creating original audio tracks"
    },
    {
      name: "Leonardo AI",
      url: "https://leonardo.ai",
      description: "AI image generation platform for creating custom visual content"
    },
    {
      name: "Perplexity",
      url: "https://perplexity.ai/backtoschool",
      description: "AI-powered search engine that provides answers with cited sources"
    },
    {
      name: "Firebase Studio",
      url: "https://firebase.google.com/docs/studio",
      description: "Google's platform for building AI-powered applications and workflows"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Header 
        title="AI Literacy Checklist"
        subtitle="CPAD AI Builders Toolkit"
      />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-16">
        
        {/* Welcome Introduction */}
        <section>
          <Card className="rounded-2xl border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Sparkles className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Welcome to Your AI Journey</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    You're likely already familiar with ChatGPT and other large language models (LLMs) from basic use—asking questions, drafting text, or brainstorming ideas. This checklist acknowledges that foundation and helps you move beyond casual experimentation into more intentional, critically-informed practice.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We'll start with fundamental AI literacy skills everyone should develop, then gradually introduce more advanced concepts like reasoning models, specialized tools, and pedagogical applications. Each section builds on the last, helping you develop a comprehensive understanding of how to work effectively with AI in educational contexts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Essential AI Literacy Skills - Interactive */}
        <section>
          <Card className="rounded-2xl border-accent/20 bg-accent/5">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-left">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Essential AI Literacy Skills</h2>
                  <p className="text-muted-foreground">Explore 5 interactive learning modules for core competencies</p>
                </div>
                
                <Accordion type="multiple" className="space-y-4">
                  {/* Prompt Engineering */}
                  <AccordionItem value="prompt-engineering" className="border rounded-xl bg-card/50 px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">Prompt Engineering Fundamentals</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <PromptEngineeringLab />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Capabilities & Limitations */}
                  <AccordionItem value="capabilities" className="border rounded-xl bg-card/50 px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">Understanding Capabilities & Limitations</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <CapabilitiesQuiz />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Critical Evaluation */}
                  <AccordionItem value="evaluation" className="border rounded-xl bg-card/50 px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">Critical Evaluation</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <CriticalEvaluationWorkshop />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Reasoning Models */}
                  <AccordionItem value="reasoning-models" className="border rounded-xl bg-card/50 px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">Understanding Reasoning Models</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <ReasoningModelsComparison />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Extended Tools */}
                  <AccordionItem value="extended-tools" className="border rounded-xl bg-card/50 px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Settings className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">Extended Tools: Deep Research & Agent Mode</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-6">
                      <ExtendedToolsExplorer />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Article Viewer */}
        <section>
          <Collapsible open={articleOpen} onOpenChange={setArticleOpen}>
            <Card className="rounded-2xl border-accent/20 bg-accent/5">
              <CollapsibleTrigger className="w-full">
                <CardContent className="p-8 flex items-center justify-between">
                  <div className="text-left">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Practical Suggestions for Getting Started with AI in Your Teaching</h2>
                    <p className="text-muted-foreground">An article exploring how to integrate AI tools into your teaching practice</p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      Note: This article was written 95% by GPT-4 in May 2023 and underwent blind peer review with editor approval. 
                      Reviewer feedback and improvements were incorporated using ChatGPT with minimal manual edits.
                    </p>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${articleOpen ? 'rotate-180' : ''}`} />
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-8 px-8">
                  <ArticleViewer 
                    pdfUrl="/assets/holster-ai-music-education.pdf"
                    title="Practical Applications of ChatGPT"
                    subtitle=""
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </section>

        {/* Other AI Tools */}
        <section>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-ink mb-6">
              Other AI Tools
            </h3>
            
            <div className="grid gap-4">
              {taskItems.map((item, index) => (
                <Card key={index} className="rounded-2xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold text-ink">{item.name}</span>
                        </div>
                        <p className="text-sm text-ink-muted">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyUrl(item.url)}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          {copiedUrl === item.url ? "Copied!" : "Copy URL"}
                        </Button>
                        <Button
                          variant="accent"
                          size="sm"
                          asChild
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Navigation */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background/50 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div>
              {/* No previous page for ChatGPT Review */}
            </div>
            
            <Button size="lg" asChild className="rounded-full px-8">
              <Link to="/" className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4" />
                Back to Workshop Home
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild className="rounded-full px-8">
              <Link to="/week3" className="flex items-center gap-3">
                AI Ethics & Bias
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ChatGPTReview;
