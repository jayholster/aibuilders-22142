import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import CustomGPTIdeaGenerator from "@/components/CustomGPTIdeaGenerator";
import litReviewProImg from "@/assets/gpt-lit-review-pro.png";
import classroomCoachImg from "@/assets/gpt-classroom-coach.png";
import selfieStationImg from "@/assets/gpt-selfie-station.png";
import topicModelerImg from "@/assets/gpt-topic-modeler.png";
import musicPlannerImg from "@/assets/gpt-music-planner.png";
import bystanderImg from "@/assets/gpt-bystander.png";
import classroomCoachPrototypeImg from "@/assets/classroom-coach-prototype.png";
import studentProfileExcerptsImg from "@/assets/student-profile-excerpts.png";
import { 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Bot,
  Zap,
  Users,
  Target,
  FileText,
  Settings,
  Upload,
  Share2,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Copy
} from "lucide-react";
import ReasoningModelsComparison from "@/components/ReasoningModelsComparison";

const CustomGPTs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header
        title="Custom GPTs"
        subtitle="CPAD AI Builders Toolkit"
      />

      {/* Main Content */}
      <div className="relative space-y-16">
        {/* Introduction */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-6">
            <Card className="rounded-2xl border border-white/40 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur mb-8">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Bot className="h-6 w-6" />
                  <p className="text-sm font-medium tracking-[0.3em] uppercase">Introduction</p>
                </div>
                <h2 className="text-2xl font-semibold text-ink">What are Custom GPTs?</h2>
                <p className="text-lg">
                  Custom GPTs are versions of ChatGPT that can be configured for specific tasks. Instead of a general AI assistant, you can create one that follows specialized instructions for a particular use case. GPTs will also reference uploaded "knowledge" documents. You can request that GPTs use external tools including web browsing, image generation, data analysis tools, as well means for external API connections. GPTs can answer domain-specific questions, generate creative or educational content, simulate conversations or experiences, analyze data, write code, guide learning experiences, to name a few potential use cases.
                </p>

                <div className="pt-4 border-t border-border/40">
                  <h3 className="text-xl font-semibold text-ink mb-3">Custom GPTs Are Just Clear Prompts</h3>
                  <p className="text-muted-foreground mb-4">
                    A custom GPT is really just a well-structured prompt with a clear role, context, and instructions. 
                    You can achieve the same results by prompting any AI model with these role-based frameworks. Consider these instructions and try a few of the custom GPTs linked below.
                  </p>

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h4 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Essential Prompting Guidelines
                    </h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-lg">•</span>
                        <div>
                          <strong className="text-foreground">Be specific:</strong>
                          <p className="mt-1">Define the role, context, task, and constraints clearly</p>
                        </div>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-lg">•</span>
                        <div>
                          <strong className="text-foreground">Set expectations:</strong>
                          <p className="mt-1">Specify format, length, tone, and style</p>
                        </div>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-lg">•</span>
                        <div>
                          <strong className="text-foreground">Provide examples:</strong>
                          <p className="mt-1">Show what good output looks like</p>
                        </div>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-lg">•</span>
                        <div>
                          <strong className="text-foreground">Iterate:</strong>
                          <p className="mt-1">Refine prompts based on results and add constraints as needed</p>
                        </div>
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-lg">•</span>
                        <div>
                          <strong className="text-foreground">Match model to task:</strong>
                          <p className="mt-1">Use reasoning models for complex logic, general chat for quick answers</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example Custom GPTs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {/* Example 1: Lit Review Pro */}
              <a href="https://chatgpt.com/g/g-Ynx16Lf2m-lit-review-pro" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-lg border border-border/40 aspect-video overflow-hidden">
                      <img 
                        src={litReviewProImg} 
                        alt="Lit Review Pro GPT Interface" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-ink">Lit Review Pro</h3>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Helps students and researchers structure literature reviews by organizing notes, PDFs, and citations into academic prose. Compares arguments across sources, identifies research gaps, and guides scholarly writing while keeping your unique voice at the center.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Example 2: Classroom Coach */}
              <a href="https://chatgpt.com/g/g-6796c2d3f79881918d0d5f56955d2b8f-classroom-coach-3-6" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-lg border border-border/40 aspect-video overflow-hidden">
                      <img 
                        src={classroomCoachImg} 
                        alt="Classroom Coach 3.6 GPT Interface" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-ink">Classroom Coach 3.6</h3>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        A simulation-focused GPT for preservice teachers featuring high-fidelity voice-to-voice classroom scenarios. Places you in live classroom moments with dynamic feedback loops, culturally responsive student profiles, and reflective practice to develop teaching presence.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Example 3: AI Selfie Station */}
              <a href="https://chatgpt.com/g/g-68252849c0988191b16b43ed5f83acc5-ai-selfie-station" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-lg border border-border/40 aspect-video overflow-hidden">
                      <img 
                        src={selfieStationImg} 
                        alt="AI Selfie Station GPT Interface" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-ink">AI Selfie Station</h3>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        A playful arts-based GPT that transforms selfies into imaginative portraits across themes like Tailgate Vibes, Retro Throwback, or Pop Art Legend. Combines AI technology with arts, design, and storytelling for creative community engagement.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Example 4: Semantic Topic Modeler */}
              <a href="https://chatgpt.com/g/g-82GXRCjGv-semantic-topic-modeler" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-lg border border-border/40 aspect-video overflow-hidden">
                      <img 
                        src={topicModelerImg} 
                        alt="Semantic Topic Modeler GPT Interface" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-ink">Semantic Topic Modeler</h3>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyzes qualitative data through topic modeling methods similar to LDA. Outputs topic categories, labels, keywords, representative sentences, and percentage distribution of themes. Makes it easier to identify patterns in text corpora for academic research.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Example 5: Music Lesson Planner */}
              <a href="https://chatgpt.com/g/g-ENe5ea6xP-music-lesson-planner" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-lg border border-border/40 aspect-video overflow-hidden">
                      <img 
                        src={musicPlannerImg} 
                        alt="Music Lesson Planner GPT Interface" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-ink">Music Lesson Planner</h3>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Built for music educators to generate structured, standards-aligned lesson plans. Teachers can begin with objectives, agendas, or standards, guided step-by-step using SMART goals and Bloom's Taxonomy. Compiles inputs into polished, downloadable plans.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Example 6: BYSTANDER */}
              <a href="https://chatgpt.com/g/g-6823ec31e340819181a60c36b0ad8e77-bystander" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className="rounded-lg border border-border/40 aspect-video overflow-hidden">
                      <img 
                        src={bystanderImg} 
                        alt="🆘 BYSTANDER GPT Interface" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-ink">🆘 BYSTANDER</h3>
                        <ExternalLink className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Real-time voice simulation for emergency response training. Simulates high-stakes public health crises through realistic dialogue-heavy roleplay. Users practice responding under pressure with voice-led scenarios that loop until resolution, ending with custom infographics for reference.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>

            {/* Custom GPT Idea Generator */}
            <div className="mt-12">
              <CustomGPTIdeaGenerator />
            </div>
          </div>
        </section>

        {/* Build a Custom GPT Activity */}
        <section id="workshop-activity" className="bg-gradient-to-b from-background/50 to-background">
          <div className="max-w-6xl mx-auto px-6">
            <Card className="rounded-2xl border border-white/40 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur mb-12">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Target className="h-6 w-6" />
                  <p className="text-sm font-medium tracking-[0.3em] uppercase">Workshop Activity</p>
                </div>
                <h2 className="text-3xl font-semibold text-ink">Build a Custom GPT</h2>
                <p className="text-lg text-muted-foreground">
                  Custom GPTs combine context documents, conversation starters, and custom instructions to create specialized AI assistants. They can connect to external tools, browse the web, generate images, analyze data, and be embedded directly into websites or learning management systems for seamless access.
                </p>
                
                {/* Video and Image Side by Side */}
                <div className="my-8 grid md:grid-cols-2 gap-6 items-start">
                  {/* YouTube Video Embed - Sized as Short */}
                  <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-1">
                    <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        src="https://youtube.com/embed/mO2X3ctuNDk?si=7iW4JYToDD-isyAz"
                        title="Custom GPT Tutorial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Right Column - Images Stacked */}
                  <div className="space-y-6">
                    {/* Classroom Coach Prototype Image */}
                    <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-1">
                      <img 
                        src={classroomCoachPrototypeImg} 
                        alt="Classroom Coach Prototype showing good and bad outcomes for teacher moves and peer dynamics"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Student Profile Excerpts Image */}
                    <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-1">
                      <img 
                        src={studentProfileExcerptsImg} 
                        alt="Student Profile Excerpts showing interests, academics, friends, and rivals across different grades"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="pickaxe" className="w-full mt-8">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                    <TabsTrigger value="pickaxe" className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Build with Pickaxe
                    </TabsTrigger>
                    <TabsTrigger value="chatgpt" className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      Build with ChatGPT
                    </TabsTrigger>
                  </TabsList>

                  {/* Pickaxe Content */}
                  <TabsContent value="pickaxe" className="space-y-6">
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-ink mb-2">Pickaxe: No-Code, Embeddable</h3>
                          <p className="text-muted-foreground mb-4">
                            Perfect for embedding directly into your LMS or website. No coding required.
                          </p>
                          <Button variant="default" size="lg" asChild>
                            <a href="https://pickaxe.co/user/templates/pickaxes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Browse Pickaxe Templates
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Step 1 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">1</div>
                            <CardTitle className="text-lg">Create Your Pickaxe</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Go to <a href="https://pickaxe.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pickaxe.co</a> → Create Pickaxe
                          </p>
                          <p className="text-sm text-muted-foreground">
                            You'll land in the Builder with prompt/files/settings on the left and live preview on the right.
                          </p>
                        </CardContent>
                      </Card>

                      {/* Step 2 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">2</div>
                            <CardTitle className="text-lg">Name, Model, Purpose</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Give it a clear teacher use-case name
                          </p>
                          <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                            <p className="text-sm font-medium text-accent">Example: "Concert Week Comms"</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Choose your model (e.g., GPT-4.x)
                          </p>
                        </CardContent>
                      </Card>

                      {/* Step 3 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">3</div>
                            <CardTitle className="text-lg">Core Prompt (System Rules)</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Keep it logistics/comms/assessment only
                          </p>
                          <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
                            <code className="text-xs text-muted-foreground">
                              "You help with planning, emails, and rubrics. Keep it practical and concise. Test in preview."
                            </code>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Step 4 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">4</div>
                            <CardTitle className="text-lg">Knowledge Base</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Upload 1–3 reusable files
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>BellSchedule.md</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>Rubric.md</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>Standards.csv</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Step 5 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">5</div>
                            <CardTitle className="text-lg">Input Fields</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Create fast-form fields for user input
                          </p>
                          <div className="bg-muted/30 rounded-lg p-4 border border-border/40 space-y-2 text-xs">
                            <div>• Ensemble/Grade</div>
                            <div>• Minutes</div>
                            <div>• Focus Skill</div>
                            <div>• Standards Code (optional)</div>
                            <div>• Audience</div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Step 6 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">6</div>
                            <CardTitle className="text-lg">Test in Preview</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Use the right-side preview to test your prompts and inputs
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Iterate until outputs match your needs
                          </p>
                        </CardContent>
                      </Card>

                      {/* Step 7 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 md:col-span-3">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">7</div>
                            <CardTitle className="text-lg">Publish & Embed</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Publish to your Studio → Add Embed → paste into LMS/website
                          </p>
                          <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
                            <code className="text-xs text-muted-foreground">
                              {"<iframe src='...'></iframe>"}
                            </code>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* ChatGPT Content */}
                  <TabsContent value="chatgpt" className="space-y-6">
                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-ink mb-2">ChatGPT Custom GPT Editor</h3>
                          <p className="text-muted-foreground mb-4">
                            Built-in editor with access to the GPT Store for wider distribution.
                          </p>
                          <Button variant="default" size="lg" asChild>
                            <a href="https://chatgpt.com/gpts/editor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Open ChatGPT Editor
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Step 1 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">1</div>
                            <CardTitle className="text-lg">Open the Editor</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Go to <a href="https://chatgpt.com/gpts/editor" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">chatgpt.com/gpts/editor</a>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Click Explore GPTs → Create
                          </p>
                        </CardContent>
                      </Card>

                      {/* Step 2 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">2</div>
                            <CardTitle className="text-lg">Instructions</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Define role, scope, and format
                          </p>
                          <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
                            <code className="text-xs text-muted-foreground">
                              "You are a music teacher assistant. Focus on logistics and planning. No composing or arranging."
                            </code>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Step 3 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">3</div>
                            <CardTitle className="text-lg">Conversation Starters</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Add quick-access buttons for common tasks
                          </p>
                          <div className="space-y-2">
                            <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                              <p className="text-sm">"Emergency sub plan for 45 min"</p>
                            </div>
                            <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                              <p className="text-sm">"Create parent email from bullets"</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Step 4 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">4</div>
                            <CardTitle className="text-lg">Knowledge & Capabilities</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Upload reference files and enable needed capabilities
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>Upload knowledge files</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>Enable web browsing (if needed)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>Add API actions (optional)</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Step 5 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">5</div>
                            <CardTitle className="text-lg">Test Your GPT</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Use the preview chat to test responses
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Refine instructions based on outputs
                          </p>
                        </CardContent>
                      </Card>

                      {/* Step 6 */}
                      <Card className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">6</div>
                            <CardTitle className="text-lg">Share Your GPT</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Set visibility: share via link or list in the GPT Store (if eligible)
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="bg-muted/30 rounded-lg p-2 border border-border/40 text-center">
                              <p className="font-medium">Only Me</p>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-2 border border-border/40 text-center">
                              <p className="font-medium">With Link</p>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-2 border border-border/40 text-center">
                              <p className="font-medium">GPT Store</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-b from-background/50 to-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link to="/week4" className="flex items-center gap-3">
                  <ChevronLeft className="w-4 h-4" />
                  Storytelling
                </Link>
              </Button>
              
              <Button size="lg" asChild className="rounded-full px-8">
                <Link to="/" className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4" />
                  Back to Workshop Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link to="/prototype-planner" className="flex items-center gap-3">
                  Prototype Planner
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

export default CustomGPTs;