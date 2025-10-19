import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import InteractiveBackground from "@/components/InteractiveBackground";
import { PrototypeSubmissionForm } from "@/components/PrototypeSubmissionForm";
import cpadLogo from "@/assets/cpad-logo-new.png";
import { 
  Mail, 
  Video, 
  Calendar, 
  FileText, 
  ExternalLink,
  BookOpen,
  Clock,
  Users,
  Target,
  Lightbulb,
  Zap,
  ArrowRight,
  Sparkles,
  Home as HomeIcon,
  Shield,
  Image,
  Code,
  Bot,
  Palette,
  ChevronRight,
  Send
} from "lucide-react";

const Home = () => {
  const [reflection, setReflection] = useState<string>('');
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('faculty-reflection');
    if (saved) setReflection(saved);
  }, []);

  const saveReflection = (text: string) => {
    localStorage.setItem('faculty-reflection', text);
    setReflection(text);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="text-primary-foreground relative overflow-hidden py-12 md:py-16 lg:py-20">
        {/* Enhanced background with consistent primary color */}
        <div className="absolute inset-0 bg-primary"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        {/* Interactive Background */}
        <InteractiveBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Main Title */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.85] tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-2xl">
                    AI Builders
                  </span>
                  <span className="block bg-gradient-to-r from-white/95 via-white to-white/90 bg-clip-text text-transparent drop-shadow-2xl">
                    Toolkit
                  </span>
                </h1>
                
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/70 font-light leading-relaxed">
                    A comprehensive resource for building AI literacy, exploring Gen-AI tools, and prototyping solutions to problems.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => document.getElementById('start-with-problem')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="flex items-center gap-2">
                    Start with Your Problem
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Side - Facilitator Info */}
            <div className="space-y-8 lg:pl-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold text-primary-foreground mb-6">Workshop Facilitator</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mt-1">
                      <span className="text-white text-lg">👨‍🏫</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-foreground mb-1">Dr. Jacob Holster</h4>
                      <p className="text-primary-foreground/80 text-sm mb-2">Assistant Teaching Professor of Music Education and Coordinator of the Center for Pedagogy in Arts & Design</p>
                      <a href="mailto:jbh6331@psu.edu" className="text-primary-foreground/70 hover:text-primary-foreground/90 transition-colors">
                        jbh6331@psu.edu
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New White Background Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16">
          
          {/* Start with Your Problem - Reflection Section */}
          <div id="start-with-problem">
            <Card className="rounded-2xl border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-7 h-7 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Start with Your Problem</h2>
                </div>
                <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  The best way to explore AI is by connecting it to real challenges. Take a moment to reflect on your goals.
                </p>
                
                {/* Reflection Prompts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Card className="border-accent/30 bg-card/50">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-sm text-foreground">What teaching challenge or workflow friction do you face most often?</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-accent/30 bg-card/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-sm text-foreground">What tasks take you the most time that AI might help streamline?</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-accent/30 bg-card/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Palette className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-sm text-foreground">What would you create for your class if you had unlimited time and skills?</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-accent/30 bg-card/50">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-sm text-foreground">How might your students benefit from AI-enhanced learning experiences?</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Reflection Textarea */}
                <div className="mb-6 sm:mb-8">
                  <label className="block text-sm sm:text-base font-medium text-foreground mb-3">Your Thoughts:</label>
                  <Textarea 
                    placeholder="Example: My students struggle to stay engaged during music history lectures. I spend hours creating presentation slides, but I wonder if AI could help me generate more interactive content or create virtual 'listening guides' that make the material more accessible..."
                    value={reflection}
                    onChange={(e) => saveReflection(e.target.value)}
                    className="min-h-[100px] sm:min-h-[120px] bg-background/50 border-border text-base"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Toolkit Overview & Navigation Guide */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">Navigate the Toolkit</h2>
              <p className="text-muted-foreground text-lg">
                This workshop contains 6 interconnected modules. Start anywhere based on your interests and needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {/* AI Literacy Checklist */}
              <Card className="rounded-2xl border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-xl flex-shrink-0">
                      <HomeIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">AI Literacy Checklist</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">Develop essential AI literacy skills through 5 interactive modules: prompt engineering fundamentals, understanding capabilities and limitations, critical evaluation, reasoning models, and extended tools like Deep Research and Agent Mode.</p>
                      <Button variant="outline" className="min-h-[44px]" asChild>
                        <Link to="/week1" className="flex items-center gap-2">
                          Explore <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Ethics & Bias */}
              <Card className="rounded-2xl border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-xl flex-shrink-0">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">AI Ethics & Bias</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">Examine how AI systems can perpetuate bias, explore sycophancy in language models, and develop critical perspectives on responsible AI use in educational settings.</p>
                      <Button variant="outline" className="min-h-[44px]" asChild>
                        <Link to="/week3" className="flex items-center gap-2">
                          Explore <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vibecoding */}
              <Card className="rounded-2xl border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-xl flex-shrink-0">
                      <Code className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Vibecoding</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">Build interactive educational games, websites, and learning modules using AI-assisted development platforms like Lovable. No traditional coding experience required.</p>
                      <Button variant="outline" className="min-h-[44px]" asChild>
                        <Link to="/week6" className="flex items-center gap-2">
                          Explore <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Storytelling */}
              <Card className="rounded-2xl border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-xl flex-shrink-0">
                      <Image className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Storytelling with AI</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">Create compelling visual content using AI image generation tools like Midjourney and Kling. Learn diffusion model workflows and develop multimedia materials for your courses.</p>
                      <Button variant="outline" className="min-h-[44px]" asChild>
                        <Link to="/week4" className="flex items-center gap-2">
                          Explore <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Custom GPTs */}
              <Card className="rounded-2xl border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-xl flex-shrink-0">
                      <Bot className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Custom GPTs</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">Design specialized AI assistants tailored to your teaching needs. Create custom chatbots for grading support, lesson planning, research assistance, and student feedback.</p>
                      <Button variant="outline" className="min-h-[44px]" asChild>
                        <Link to="/custom-gpts" className="flex items-center gap-2">
                          Explore <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Assignment Ideas */}
              <Card className="rounded-2xl border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-xl flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Prototype Planner</h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">Transform your teaching challenges into actionable prototypes. Get AI-powered guidance on tools, approaches, and next steps to build your ideas.</p>
                      <Button variant="outline" className="min-h-[44px]" asChild>
                        <Link to="/prototype-planner" className="flex items-center gap-2">
                          Explore <ChevronRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </section>

      {/* Submit for Feedback Banner */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 text-primary mb-4">
            <Send className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-semibold text-ink mb-4">
            Built Something? Get Feedback!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Share your prototype with the workshop facilitators for personalized feedback 
            and a chance to be featured in our community gallery.
          </p>
          <Button 
            size="lg" 
            onClick={() => setIsSubmissionOpen(true)}
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <Send className="h-5 w-5" />
            Submit for Feedback
          </Button>
        </div>
      </section>

      {/* Submission Dialog */}
      <Dialog open={isSubmissionOpen} onOpenChange={setIsSubmissionOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle className="text-foreground">Submit Your Prototype</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Share your work and get personalized feedback from our team.
            </DialogDescription>
          </DialogHeader>
          <PrototypeSubmissionForm onSuccess={() => setIsSubmissionOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;