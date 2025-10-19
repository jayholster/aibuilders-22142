import { useState } from "react";
import { Link } from "react-router-dom";
import WeekLayout from "@/components/layout/WeekLayout";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import aiArtifactsTypes from "@/assets/ai-artifacts-types.png";
import aiCodeShareInfographic from "@/assets/ai-code-share-infographic.png";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Atom,
  Binary,
  Calendar,
  CircuitBoard,
  Film,
  Layers,
  Rocket,
  Sparkles,
  Wand2,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface FormData {
  title: string;
  [key: string]: string;
}

const Vibecoding = () => {
  const title = "Vibecoding";
  const [activeTab, setActiveTab] = useState('a');
  const { toast } = useToast();
  const [loadingRound, setLoadingRound] = useState<string | null>(null);
  const [ideaOverview, setIdeaOverview] = useState('');
  
  const [formData, setFormData] = useState({
    a: { title: '', verb: '', scoring: '', reset: '', accessibility: '' },
    b: { title: '', audience: '', goal: '', sections: '', cta: '' },
    c: { title: '', audience: '', concept: '', control: '', quiz: '' }
  });

  const updateFormField = (round: 'a' | 'b' | 'c', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [round]: { ...prev[round], [field]: value }
    }));
  };

  const generatePrompt = (round: 'a' | 'b' | 'c'): string => {
    const data = formData[round] as any;
    
    if (round === 'a') {
      const { title = '', verb = '', scoring = '', reset = '' } = data;
      // If user has entered a custom overview, incorporate it
      const overview = ideaOverview.trim() ? ` (${ideaOverview.trim()})` : '';
      return `Create a single-file HTML canvas game${overview}${title ? ` called ${title}` : ''}${verb ? `. Core verb: ${verb}` : ''}${scoring ? `. Scoring: ${scoring}` : ''}${reset ? `. Lose/reset: ${reset}` : ''}. Include a restart button and keyboard controls. No external libraries; inline CSS/JS; return one complete HTML file I can paste into a host.`;
    } else if (round === 'b') {
      const { title = '', audience = '', goal = '', sections = '', cta = '' } = data;
      const overview = ideaOverview.trim() ? ` (${ideaOverview.trim()})` : '';
      return `Produce a single-file HTML site${overview}${title ? ` ${title}` : ''}${audience ? ` for ${audience}` : ''}${goal ? `. Goal: ${goal}` : ''}. Include a hero (≤12-word headline, ≤18-word subhead)${sections ? `, ${sections}` : ''}${cta ? `, and a footer ${cta}` : ''}. Add in-page nav, skip-to-content, and accessible landmarks. Inline CSS/JS only. Return one complete HTML file.`;
    } else if (round === 'c') {
      const { title = '', audience = '', concept = '', control = '', quiz = '' } = data;
      const overview = ideaOverview.trim() ? ` (${ideaOverview.trim()})` : '';
      return `Generate a single-file HTML micro-lesson${overview}${title ? ` called ${title}` : ''}${audience ? ` for ${audience}` : ''}. Sections: brief intro${control && concept ? `; a live demo using ${control} to illustrate ${concept}` : ''}${quiz ? `; one MCQ about ${quiz} with instant feedback` : ''}; short accessibility notes. No external libraries; inline CSS/JS; return one complete file.`;
    }
    return '';
  };

  const copyPrompt = (round: 'a' | 'b' | 'c') => {
    const prompt = generatePrompt(round);
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Paste your prompt into any AI tool",
    });
  };

  const randomizeRound = async (round: 'a' | 'b' | 'c', retryCount = 0) => {
    setLoadingRound(round);
    
    // Include user's idea overview in the request
    const userContext = ideaOverview.trim() ? ideaOverview : undefined;
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-vibecode-ideas', {
        body: { round, userContext }
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw error;
      }

      if (data?.error) {
        // Handle rate limiting with retry
        if (data.error.includes("Rate limit") && retryCount < 2) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          toast({
            title: "Rate limited",
            description: `Retrying in ${delay / 1000} seconds...`,
          });
          await new Promise(resolve => setTimeout(resolve, delay));
          return randomizeRound(round, retryCount + 1);
        }
        
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data?.idea) {
        setFormData(prev => ({ 
          ...prev, 
          [round]: { ...prev[round], ...data.idea } 
        }));
        
        toast({
          title: "AI Idea Generated! ✨",
          description: "Check out your new vibecoding concept",
        });
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: "Error",
        description: "Failed to generate ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingRound(null);
    }
  };

  const renderRoundA = () => (
    <div className={activeTab === 'a' ? '' : 'hidden'}>
      <div className="flex items-center gap-3 text-primary mb-4">
        <Wand2 className="h-6 w-6" />
        <h3 className="text-xl font-semibold text-ink">Option A: Game</h3>
      </div>
      <p className="text-ink-muted mb-6">Create a single-screen game with one verb and a restart.</p>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Title:</label>
            <input 
              type="text" 
              value={formData.a.title}
              onChange={(e) => updateFormField('a', 'title', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="Enter your game title..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Core verb (tap/drag/dodge):</label>
            <input 
              type="text" 
              value={formData.a.verb}
              onChange={(e) => updateFormField('a', 'verb', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="tap, drag, dodge, etc..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Scoring rule:</label>
            <input 
              type="text" 
              value={formData.a.scoring}
              onChange={(e) => updateFormField('a', 'scoring', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="How do players earn points?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Lose/reset rule:</label>
            <input 
              type="text" 
              value={formData.a.reset}
              onChange={(e) => updateFormField('a', 'reset', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="When does the game end?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Accessibility note:</label>
            <input 
              type="text" 
              value={formData.a.accessibility}
              onChange={(e) => updateFormField('a', 'accessibility', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="labels/contrast/keyboard considerations"
            />
          </div>
        </div>
        
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
            <h4 className="font-medium text-ink mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Game Idea Generator
            </h4>
            <p className="text-sm text-ink-muted mb-3">Get creative game ideas powered by AI</p>
            <div className="mb-3">
              <label htmlFor="ideaOverviewA" className="block text-xs font-medium text-ink mb-1.5">
                Enter a rough overview of your idea (optional)
              </label>
              <textarea
                id="ideaOverviewA"
                value={ideaOverview}
                onChange={(e) => setIdeaOverview(e.target.value)}
                placeholder="E.g., A rhythm game where students learn fractions..."
                className="w-full h-20 px-3 py-2 text-sm rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary text-ink placeholder:text-ink-muted"
              />
            </div>
            <Button 
              onClick={() => randomizeRound('a')}
              className="w-full"
              variant="outline"
              disabled={loadingRound === 'a'}
            >
              {loadingRound === 'a' ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Binary className="w-4 h-4 mr-2" />
                  Generate Game Ideas
                </>
              )}
            </Button>
          </div>
          
          <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
            <h4 className="font-medium text-ink mb-2">Your Prompt</h4>
            <textarea 
              value={generatePrompt('a')}
              className="w-full h-32 text-xs text-ink-muted bg-transparent border-0 resize-none"
              readOnly
            />
            <p className="text-xs text-primary mt-2">+1 improvement: touch controls • pause overlay • difficulty ramp</p>
            
            <div className="mt-4 pt-4 border-t border-border/40">
              <p className="text-base font-semibold text-ink mb-3">💡 Try this prompt in:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <a href="https://lovable.dev" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Lovable <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-muted">•</span>
                <a href="https://claude.ai" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Claude <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-muted">•</span>
                <a href="https://chatgpt.com" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  ChatGPT <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <Button 
                onClick={() => copyPrompt('a')}
                variant="outline" 
                size="sm"
                className="w-full"
              >
                <Copy className="w-3 h-3 mr-2" />
                Copy Prompt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoundB = () => (
    <div className={activeTab === 'b' ? '' : 'hidden'}>
      <div className="flex items-center gap-3 text-primary mb-4">
        <CircuitBoard className="h-6 w-6" />
        <h3 className="text-xl font-semibold text-ink">Option B: Website</h3>
      </div>
      <p className="text-ink-muted mb-6">Create a one-pager with a hero, two sections, and a CTA.</p>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Title:</label>
            <input 
              type="text" 
              value={formData.b.title}
              onChange={(e) => updateFormField('b', 'title', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="Enter your website title..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Audience/Context:</label>
            <input 
              type="text" 
              value={formData.b.audience}
              onChange={(e) => updateFormField('b', 'audience', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="Who is this for?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Goal (1 sentence):</label>
            <input 
              type="text" 
              value={formData.b.goal}
              onChange={(e) => updateFormField('b', 'goal', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="What should this accomplish?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Sections (2-3):</label>
            <input 
              type="text" 
              value={formData.b.sections}
              onChange={(e) => updateFormField('b', 'sections', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="About, Features, Testimonials..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Call-to-Action:</label>
            <input 
              type="text" 
              value={formData.b.cta}
              onChange={(e) => updateFormField('b', 'cta', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="Sign up, Contact us, Learn more..."
            />
          </div>
        </div>
        
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
            <h4 className="font-medium text-ink mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Website Idea Generator
            </h4>
            <p className="text-sm text-ink-muted mb-3">Get creative website ideas powered by AI</p>
            <div className="mb-3">
              <label htmlFor="ideaOverviewB" className="block text-xs font-medium text-ink mb-1.5">
                Enter a rough overview of your idea (optional)
              </label>
              <textarea
                id="ideaOverviewB"
                value={ideaOverview}
                onChange={(e) => setIdeaOverview(e.target.value)}
                placeholder="E.g., A resource hub for music teachers to share lesson plans..."
                className="w-full h-20 px-3 py-2 text-sm rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary text-ink placeholder:text-ink-muted"
              />
            </div>
            <Button 
              onClick={() => randomizeRound('b')}
              className="w-full"
              variant="outline"
              disabled={loadingRound === 'b'}
            >
              {loadingRound === 'b' ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Binary className="w-4 h-4 mr-2" />
                  Generate Website Ideas
                </>
              )}
            </Button>
          </div>
          
          <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
            <h4 className="font-medium text-ink mb-2">Your Prompt</h4>
            <textarea 
              value={generatePrompt('b')}
              className="w-full h-32 text-xs text-ink-muted bg-transparent border-0 resize-none"
              readOnly
            />
            <p className="text-xs text-primary mt-2">+1 improvement: anchors + back-to-top • FAQ accordion • contact form</p>
            
            <div className="mt-4 pt-4 border-t border-border/40">
              <p className="text-xs text-ink-muted mb-3">Try this prompt in:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <a href="https://lovable.dev" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Lovable <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-muted">•</span>
                <a href="https://claude.ai" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Claude <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-muted">•</span>
                <a href="https://chatgpt.com" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  ChatGPT <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <Button 
                onClick={() => copyPrompt('b')}
                variant="outline" 
                size="sm"
                className="w-full"
              >
                <Copy className="w-3 h-3 mr-2" />
                Copy Prompt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoundC = () => (
    <div className={activeTab === 'c' ? '' : 'hidden'}>
      <div className="flex items-center gap-3 text-primary mb-4">
        <Layers className="h-6 w-6" />
        <h3 className="text-xl font-semibold text-ink">Option C: Learning Module</h3>
      </div>
      <p className="text-ink-muted mb-6">Create a micro-lesson with one demo and one check-for-understanding.</p>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Title:</label>
            <input 
              type="text" 
              value={formData.c.title}
              onChange={(e) => updateFormField('c', 'title', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="Enter your lesson title..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Audience:</label>
            <input 
              type="text" 
              value={formData.c.audience}
              onChange={(e) => updateFormField('c', 'audience', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="Who will learn from this?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Concept to demonstrate:</label>
            <input 
              type="text" 
              value={formData.c.concept}
              onChange={(e) => updateFormField('c', 'concept', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="What concept will you teach?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Interactive control:</label>
            <input 
              type="text" 
              value={formData.c.control}
              onChange={(e) => updateFormField('c', 'control', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="slider, button, dropdown..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-ink">Quiz question (MCQ, 3 options):</label>
            <input 
              type="text" 
              value={formData.c.quiz}
              onChange={(e) => updateFormField('c', 'quiz', e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-ink placeholder:text-ink-muted"
              placeholder="What question will test understanding?"
            />
          </div>
        </div>
        
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
            <h4 className="font-medium text-ink mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Learning Module Generator
            </h4>
            <p className="text-sm text-ink-muted mb-3">Get creative learning module ideas powered by AI</p>
            <div className="mb-3">
              <label htmlFor="ideaOverviewC" className="block text-xs font-medium text-ink mb-1.5">
                Enter a rough overview of your idea (optional)
              </label>
              <textarea
                id="ideaOverviewC"
                value={ideaOverview}
                onChange={(e) => setIdeaOverview(e.target.value)}
                placeholder="E.g., An interactive lesson teaching students about the water cycle..."
                className="w-full h-20 px-3 py-2 text-sm rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary text-ink placeholder:text-ink-muted"
              />
            </div>
            <Button 
              onClick={() => randomizeRound('c')}
              className="w-full"
              variant="outline"
              disabled={loadingRound === 'c'}
            >
              {loadingRound === 'c' ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Binary className="w-4 h-4 mr-2" />
                  Generate Module Ideas
                </>
              )}
            </Button>
          </div>
          
          <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
            <h4 className="font-medium text-ink mb-2">Your Prompt</h4>
            <textarea 
              value={generatePrompt('c')}
              className="w-full h-32 text-xs text-ink-muted bg-transparent border-0 resize-none"
              readOnly
            />
            <p className="text-xs text-primary mt-2">+1 improvement: dynamic caption • keyboard shortcuts • progress indicator</p>
            
            <div className="mt-4 pt-4 border-t border-border/40">
              <p className="text-xs text-ink-muted mb-3">Try this prompt in:</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <a href="https://lovable.dev" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Lovable <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-muted">•</span>
                <a href="https://claude.ai" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Claude <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-ink-muted">•</span>
                <a href="https://chatgpt.com" target="_blank" rel="noopener" className="text-xs text-primary hover:underline flex items-center gap-1">
                  ChatGPT <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <Button 
                onClick={() => copyPrompt('c')}
                variant="outline" 
                size="sm"
                className="w-full"
              >
                <Copy className="w-3 h-3 mr-2" />
                Copy Prompt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header
        title={title}
        subtitle="CPAD AI Builders Toolkit"
      />

      {/* Main Content */}
      <div className="relative">
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Card className="rounded-3xl border border-white/40 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur">
          <CardContent className="p-8 space-y-5">
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-6 w-6" />
              <p className="text-sm font-medium tracking-[0.3em] uppercase">Vibecoding Orientation</p>
            </div>
            <p className="text-xl text-ink">You don't need a background in coding to be able to code. AI can help you create it without needing to write everything yourself, or writing anything at all. All you need to do is describe what you want, experiment with the results, and refine through conversation. Some call this process "vibe-coding," or prompting general requests and allow the model maximum agency to develop a tool.</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/40 bg-card/80 backdrop-blur">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 text-primary">
              <Rocket className="h-6 w-6" />
              <CardTitle className="text-lg tracking-[0.2em] uppercase text-ink">Quick Start</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-base text-ink">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <a href="https://claude.ai" target="_blank" rel="noopener" className="font-medium text-primary hover:underline">Claude</a>
                  <span className="text-ink-muted"> - Renders and hosts code instantly with artifacts, perfect for quick prototyping</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <a href="https://chatgpt.com" target="_blank" rel="noopener" className="font-medium text-primary hover:underline">ChatGPT 5 Thinking with Canvas</a>
                  <span className="text-ink-muted"> - Advanced reasoning with interactive editing capabilities</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <a href="https://openai.com/codex" target="_blank" rel="noopener" className="font-medium text-primary hover:underline">Codex</a>
                  <span className="text-ink-muted"> - Powerful code generation and completion for complex projects</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <div>
                  <a href="https://lovable.dev" target="_blank" rel="noopener" className="font-medium text-primary hover:underline">Lovable</a>
                  <span className="text-ink-muted"> - Full-stack playground with built-in hosting and deployment</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
            </div>
          </div>
        </section>

        {/* Second section with continued content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <Card className="rounded-3xl border border-white/40 bg-card/80 backdrop-blur mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-6 w-6" />
              <CardTitle className="text-2xl text-ink">Why it matters:</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-lg text-ink">AI generated code is becoming the norm, and you have access to many of the same tools that software engineers do.</p>
              <div className="flex justify-center">
                <img 
                  src={aiCodeShareInfographic} 
                  alt="AI code usage statistics at major tech companies showing 25%+ at Google, 20-30% at Microsoft, 30%+ at Google (updated), and ~30% at GitHub Copilot" 
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/40 bg-card/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3 text-primary">
              <Atom className="h-6 w-6" />
              <CardTitle className="text-2xl text-ink">What Are AI-Generated Artifacts?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div className="space-y-4 text-lg text-ink">
                <p>AI-generated artifacts are structured outputs—functional code that AI generates in response to your request. Instead of just getting a block of text, you receive something interactive, editable, and instantly usable.</p>
                <p>These artifacts can range from small web components to full interactive tools, allowing you to experiment, refine, and even deploy projects without needing to manually write code from scratch. Just describe your idea, let the AI generate an initial version, and refine it step by step. Examples include:</p>
                <ul className="space-y-2 text-base text-ink-muted">
                  <li className="flex items-start gap-2">
                    <Layers className="mt-1 h-4 w-4 text-primary" />
                    <span>Web Components – Buttons, search bars, forms, interactive widgets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Film className="mt-1 h-4 w-4 text-primary" />
                    <span>Visualizations – Charts, diagrams, animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-1 h-4 w-4 text-primary" />
                    <span>Mini Apps – Simple games, calculators, quizzes, tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircuitBoard className="mt-1 h-4 w-4 text-primary" />
                    <span>Dynamic Webpages – AI-generated HTML/CSS layouts</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src={aiArtifactsTypes} 
                  alt="Types of AI-generated artifacts: Game, Website, Learning Module, and Application" 
                  className="w-full max-w-sm rounded-2xl"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-5 text-sm leading-relaxed text-ink-muted">
              Before you create your own, take a look at these examples:
            </div>
          </CardContent>
                </Card>
              </div>
            </section>

            <section className="py-12">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid gap-8 md:grid-cols-2">
        <Card className="rounded-3xl border border-white/40 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-xs tracking-[0.3em] uppercase">
              Example 1
            </Badge>
            <CardTitle className="text-ink text-xl">Ukulele Learning App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-base text-ink">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/H9Z6O7FRLKM?si=78eHNqIYn4Xsf0QN" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="rounded-2xl"
              />
            </div>
            <p>
              This demo shows how AI can quickly prototype playful, interactive learning modules. This web app was generated with GPT-5 Thinking and built in React using Web Audio and Canvas/SVG, featuring a clickable ukulele fretboard (A–E–C–G top-to-bottom), chord trainer, mic tuner, and metronome.
            </p>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://chatgpt.com/canvas/shared/68d9d32afe0c819190f24b8c2f1a997d" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                View Ukulele App
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/40 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-xs tracking-[0.3em] uppercase">
              Example 2
            </Badge>
            <CardTitle className="text-ink text-xl">Course Website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-base text-ink">
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/NjGvThRggm4?si=voJYIpTHchd5EaSG" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
            <p>
              This course website demonstrates how AI can help create comprehensive educational platforms. This very course website you're viewing is made in Lovable using React and HTML, showcasing how modern web development tools can quickly build interactive learning experiences.
            </p>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="https://aa290g.lovable.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                View Course Site
              </a>
            </Button>
          </CardContent>
        </Card>

                </div>
              </div>
            </section>

            <section className="py-12">
              <div className="max-w-6xl mx-auto px-6">
        
        <Card className="rounded-3xl border border-white/40 bg-card/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3 text-primary">
                <Rocket className="h-6 w-6" />
                <p className="text-sm font-medium tracking-[0.3em] uppercase">Workshop Activity</p>
              </div>
              <h2 className="text-3xl font-semibold text-ink">Vibecoding Workshop</h2>
              <p className="text-lg text-muted-foreground">
                Build, experiment, and share your AI-generated artifacts. Copy your generated prompt and paste it into one of the AI tools above (Claude, ChatGPT, Codex, or Lovable) to instantly create your artifact!
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex space-x-1 rounded-lg bg-background/60 p-1">
                <button 
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === 'a' ? 'bg-primary text-primary-foreground' : 'text-ink-muted hover:text-ink'
                  }`}
                  onClick={() => setActiveTab('a')}
                >
                  Option A: Game
                </button>
                <button 
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === 'b' ? 'bg-primary text-primary-foreground' : 'text-ink-muted hover:text-ink'
                  }`}
                  onClick={() => setActiveTab('b')}
                >
                  Option B: Website
                </button>
                <button 
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    activeTab === 'c' ? 'bg-primary text-primary-foreground' : 'text-ink-muted hover:text-ink'
                  }`}
                  onClick={() => setActiveTab('c')}
                >
                  Option C: Learning
                </button>
              </div>
            </div>

                  {renderRoundA()}
                  {renderRoundB()}
                  {renderRoundC()}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Navigation Buttons */}
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Button variant="outline" size="lg" asChild className="rounded-full px-8 w-full sm:w-auto">
                  <Link to="/week3" className="flex items-center gap-3">
                    <ChevronLeft className="w-4 h-4" />
                    AI Ethics & Bias
                  </Link>
                </Button>
                
                <Button size="lg" asChild className="rounded-full px-8 w-full sm:w-auto">
                  <Link to="/" className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4" />
                    Back to Workshop Home
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild className="rounded-full px-8 w-full sm:w-auto">
                  <Link to="/week4" className="flex items-center gap-3">
                    Storytelling
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  export default Vibecoding;
