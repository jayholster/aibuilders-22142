import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Volume2,
  Users,
  Play
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import diffusionSteps from "@/assets/diffusion-steps.png";
import diffusionProcess from "@/assets/diffusion-process.png";
import humanInTheLoopAlbum from "@/assets/human-in-the-loop-album.png";
import klingInterface from "@/assets/kling-interface.png";
import googleFlowDemo from "@/assets/google-flow-demo.gif";
import notatingImagesDemo from "@/assets/notating-images-demo.gif";
import midjourneyMoodboard from "@/assets/midjourney-moodboard.png";

const Storytelling = () => {
  const title = "Storytelling";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header
        title={title}
        subtitle="CPAD AI Builders Toolkit"
      />

      <div className="relative space-y-12">

        {/* How Diffusion Works */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <Card className="rounded-2xl border border-white/40 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur mb-8">
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles className="h-6 w-6" />
                  <p className="text-sm font-medium tracking-[0.3em] uppercase">Technical Deep Dive</p>
                </div>
                <h2 className="text-2xl font-semibold text-ink">Storytelling Starts with Diffusion</h2>
                <p className="text-lg">
                  Understanding the process behind AI image generation
                </p>
              </CardContent>
            </Card>

            <div className="max-w-6xl mx-auto space-y-12">
              {/* Main Explanation */}
              <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl p-8 border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300">
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  <strong className="text-foreground text-2xl">Imagine TV static that slowly turns into a photo.</strong> That's diffusion. There are two directions:
                </p>
                
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-10">
                  <div className="group">
                    <div className="bg-gradient-to-br from-accent/15 to-accent/5 rounded-2xl p-8 border border-accent/30 h-full transition-all duration-300 hover:shadow-lg hover:border-accent/50 hover:-translate-y-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <span className="text-accent text-3xl">→</span> Forward (scramble)
                      </h3>
                      <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                        Start with a normal picture and sprinkle in a tiny bit of noise again and again until it looks like pure snow.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This is how the model learns: it studies millions of images at every noise level, understanding what each stage should look like.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl p-8 border border-primary/30 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <span className="text-primary text-3xl">←</span> Reverse (unscramble)
                      </h3>
                      <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                        Start from snow and gently remove small bits of noise, step by step, while "listening" to your text idea (the prompt). Bit by bit, shapes appear, then structure, then fine details.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This is generation: the model predicts what the image should look like with slightly less noise, guided by your prompt at every step.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-background/70 to-background/40 rounded-3xl p-8 border border-border/40 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Why so many small steps?</h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    Because little corrections are safer than one giant guess. Early steps (high noise) nudge big shapes into place (where things are). Middle steps settle relationships and composition (how things line up). Late steps polish edges, textures, and fine details (what things look like up close).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Think of it like sculpting: you start with rough cuts to get the basic form, then gradually refine details. Each step builds on the previous one, making small but meaningful improvements.
                  </p>
                </div>
              </div>

              {/* Visual Examples */}
              <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl p-8 border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h3 className="text-3xl font-bold text-foreground mb-8 text-center">See Diffusion in Action</h3>
                
                {/* Diffusion Steps */}
                <div className="mb-12">
                  <div className="bg-background/30 rounded-3xl p-6 border border-border/30">
                    <img 
                      src={diffusionSteps} 
                      alt="Diffusion denoising steps showing progression from noise to clear castle image" 
                      className="w-full h-auto rounded-2xl border border-border/50 shadow-xl"
                    />
                    <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
                      <strong className="text-foreground">Steps in action:</strong> Watch how the same castle scene emerges from pure noise. Early steps (1-3) establish basic shapes and composition. Middle steps (5-20) refine structure and relationships. Final steps (30-40) add fine details and textures.
                    </p>
                  </div>
                </div>

                {/* Forward and Reverse Process */}
                <div className="bg-background/30 rounded-3xl p-6 border border-border/30">
                  <img 
                    src={diffusionProcess} 
                    alt="Diffusion forward and reverse process diagram showing chair transforming to noise and back" 
                    className="w-full h-auto rounded-2xl border border-border/50 shadow-xl"
                  />
                  <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
                    <strong className="text-foreground">The complete process:</strong> Top row shows the forward diffusion process—gradually adding noise to training images until they become pure static. Bottom row shows the reverse generative process—starting from noise and removing it step by step to create new images guided by text prompts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tools Carousel */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Interactive Tools & Practice</h2>
              <p className="text-xl text-muted-foreground">Explore AI tools for image generation, editing, and music creation</p>
              
              {/* What you'll do */}
              <div className="bg-gradient-to-r from-background/70 to-background/40 rounded-3xl p-8 border border-border/40 max-w-4xl mx-auto mt-8">
                <h4 className="text-2xl font-bold text-foreground mb-6">What you'll do</h4>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-card/60 to-card/30 rounded-2xl border border-border/30 hover:border-border/50 transition-colors">
                    <div className="text-3xl mb-3">1️⃣</div>
                    <p className="text-muted-foreground font-medium">Make an image in ImageFX</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-card/60 to-card/30 rounded-2xl border border-border/30 hover:border-border/50 transition-colors">
                    <div className="text-3xl mb-3">2️⃣</div>
                    <p className="text-muted-foreground font-medium">Try a "different angle" edit in Nano Banana</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-card/60 to-card/30 rounded-2xl border border-border/30 hover:border-border/50 transition-colors">
                    <div className="text-3xl mb-3">3️⃣</div>
                    <p className="text-muted-foreground font-medium">Make music that fits the image</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-accent/15 to-accent/5 rounded-2xl p-6 border border-accent/30 mb-6">
                  <p className="text-foreground font-bold mb-2 text-lg">Your workflow:</p>
                  <p className="text-muted-foreground text-lg">Create image → Edit from different angle → Generate matching music</p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <p className="text-foreground font-bold mb-2 text-lg">Bonus:</p>
                  <p className="text-muted-foreground text-lg">Game Worlds (if time allows)</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Use arrow buttons to navigate</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <Carousel className="w-full relative">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <CarouselPrevious className="static h-10 w-10 border-2 border-primary bg-background/95 backdrop-blur-sm hover:bg-primary/10 shadow-lg" />
                <CarouselNext className="static h-10 w-10 border-2 border-primary bg-background/95 backdrop-blur-sm hover:bg-primary/10 shadow-lg" />
              </div>
              <CarouselContent>
                {/* Slide 1: Make an Image in ImageFX */}
                <CarouselItem>
                  <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl p-8">
                    <div className="flex items-center gap-3 text-primary mb-8 justify-center">
                      <Sparkles className="h-7 w-7" />
                      <p className="text-sm font-semibold tracking-[0.3em] uppercase">Practice Session</p>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
                      Step 1: Make an Image
                    </h3>
                    
                    <div className="space-y-10 max-w-6xl mx-auto">

                      {/* Step 1: ImageFX */}
                      <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                        <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">Step 1</span>
                          ImageFX — 1 sentence → image
                        </h4>
                        
                        <div className="mb-4">
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://labs.google/fx/tools/image-fx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Open ImageFX
                            </a>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Google Labs</p>
                        
                        <div className="bg-card/50 rounded-xl p-4 border border-border/30">
                          <p className="text-foreground font-medium mb-2">Recipe: object + place + lighting + mood → Create</p>
                          <p className="text-sm text-muted-foreground">
                            Example: "red bicycle in a sunlit garden, golden hour lighting, peaceful mood"
                          </p>
                        </div>
                      </div>

                      {/* Optional Helper */}
                      <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                        <p className="text-foreground font-medium mb-2">Optional helper for stories + prompts:</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://chatgpt.com/g/g-67bcd8d73fc881919950294cbb42baaa-musegpt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            MuseGPT
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Slide 2: Nano Banana */}
                <CarouselItem>
                  <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl p-8">
                    <div className="flex items-center gap-3 text-primary mb-8 justify-center">
                      <Sparkles className="h-7 w-7" />
                      <p className="text-sm font-semibold tracking-[0.3em] uppercase">Image Editing</p>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
                      Step 2: Different Angle with Nano Banana
                    </h3>
                    
                    <div className="max-w-6xl mx-auto space-y-10">
                      <div className="bg-gradient-to-r from-background/70 to-background/40 rounded-3xl p-8 border border-border/40">
                        <h4 className="text-2xl font-bold text-foreground mb-6">Try it yourself:</h4>
                        <ol className="space-y-3 text-lg text-muted-foreground">
                          <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-1">1</span>
                            <span>Open <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">AI Studio</a></span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-1">2</span>
                            <span>Select the Nano Banana model</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-1">3</span>
                            <span>Upload an image and try the prompts shown below</span>
                          </li>
                        </ol>
                      </div>

                      {/* Image Grid - Single Example */}
                      <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Dog Example */}
                        <div className="space-y-4">
                          <div className="relative group">
                            <img 
                              src="/lovable-uploads/f9aafd32-d250-4a6c-8abb-7fd1e15bc930.png" 
                              alt="Original dog photo" 
                              className="w-full h-auto rounded-2xl border border-border/50 shadow-lg group-hover:shadow-xl transition-all duration-300"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-medium">Original</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="relative group">
                            <img 
                              src="/lovable-uploads/5418daa5-2d3f-4509-b0d8-fc94a7e229c6.png" 
                              alt="Edited dog photo" 
                              className="w-full h-auto rounded-2xl border border-border/50 shadow-lg group-hover:shadow-xl transition-all duration-300"
                            />
                            <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full font-medium">Edited</div>
                          </div>
                          <div className="bg-muted/50 rounded-xl p-4 border border-border/30">
                            <code className="text-sm text-foreground font-mono">"turn towards his head a bit more"</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Slide 3: Udio */}
                <CarouselItem>
                  <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl p-8">
                    <div className="flex items-center gap-3 text-primary mb-8 justify-center">
                      <Volume2 className="h-7 w-7" />
                      <p className="text-sm font-semibold tracking-[0.3em] uppercase">Make Music</p>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
                      Step 3: Make Music That Fits the Image
                    </h3>
                    
                    <div className="max-w-6xl mx-auto space-y-10">
                      <div className="bg-gradient-to-r from-background/70 to-background/40 rounded-3xl p-8 border border-border/40">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Volume2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-foreground">Udio</h4>
                            <p className="text-muted-foreground text-lg">AI-powered music generation from text</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h5 className="text-lg font-semibold text-foreground mb-3">What it does:</h5>
                            <p className="text-muted-foreground mb-4">
                              Generates complete songs (vocals, instruments, production) from text descriptions. You can specify genre, mood, lyrics, and style to create original music compositions.
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="text-lg font-semibold text-foreground mb-3">Key features:</h5>
                            <ul className="text-muted-foreground space-y-2">
                              <li>• Generate songs with custom lyrics or instrumental tracks</li>
                              <li>• Choose from various genres and musical styles</li>
                              <li>• Extend existing songs or create variations</li>
                              <li>• High-quality audio output with professional sound</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Usage Tips */}
                      <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                        <h4 className="text-lg font-semibold text-foreground mb-4">Tips for better results:</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-foreground mb-2">Prompt Structure:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Start with genre (e.g., "folk rock," "jazz," "electronic")</li>
                              <li>• Add mood descriptors ("upbeat," "melancholic," "energetic")</li>
                              <li>• Include instruments ("acoustic guitar," "synthesizer," "strings")</li>
                              <li>• Specify vocal style ("raspy vocals," "smooth harmonies," "rap verses")</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground mb-2">Lyrics & Structure:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Use [Verse], [Chorus], [Bridge] tags to structure songs</li>
                              <li>• Keep initial generations to 30-60 seconds, then extend</li>
                              <li>• Try both custom lyrics and letting Udio write them</li>
                              <li>• Use "instrumental" for background music without vocals</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
                          <p className="text-sm text-foreground">
                            <strong>Example prompt:</strong> "Upbeat indie folk song with acoustic guitar, gentle drums, and warm female vocals about finding home"
                          </p>
                        </div>
                      </div>
                      
                      {/* Personal Example */}
                      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0">
                            <img 
                              src={humanInTheLoopAlbum} 
                              alt="Human in the Loop Album Cover" 
                              className="w-32 h-44 rounded-xl object-cover border border-border/30 shadow-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-foreground mb-3">Real Example: AI Album on Spotify</h5>
                            <p className="text-muted-foreground mb-4">
                              I created an entire AI-generated album called "Human in the Loop v1" that's now available on Spotify and other streaming platforms. The project explored the creative possibilities and process challenges of human-AI collaboration in music production.
                            </p>
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://sites.psu.edu/socialai/2024/05/29/new-release-human-in-the-loop-v1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="w-3 h-3" />
                                Read about the process
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center pt-6 border-t border-border/30">
                        <Button variant="default" size="lg" asChild>
                          <a href="https://udio.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Try Udio
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Slide 4: Tool Chaining */}
                <CarouselItem>
                  <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl p-8">
                    <div className="flex items-center gap-3 text-primary mb-8 justify-center">
                      <Sparkles className="h-7 w-7" />
                      <p className="text-sm font-semibold tracking-[0.3em] uppercase">Tool-Chaining</p>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
                      Step 4: Animate with an Image to Video Tool
                    </h3>
                    
                    <div className="max-w-6xl mx-auto space-y-10">
                      <div className="bg-gradient-to-r from-background/70 to-background/40 rounded-3xl p-8 border border-border/40">
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                          The next step in tool chaining: bringing your static images to life with animation
                        </p>
                        <p className="text-muted-foreground mb-6">
                          Tool chaining connects specialized tools in sequence. After creating and editing your image, the next natural step is animating it with an image-to-video tool. Each tool's output becomes the input for the next, allowing you to create complex, professional-quality content that no single tool could achieve alone.
                        </p>
                        <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Note:</strong> Video editing tools are recommended in two slides for final assembly and polish.
                          </p>
                        </div>
                      </div>

                      {/* Example Workflow */}
                      <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                        <h4 className="text-xl font-semibold text-foreground mb-6 text-center">Example workflow for this video</h4>
                        
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                          {[
                            { name: "ChatGPT" },
                            { name: "Midjourney" },
                            { name: "wan 2.2 + Veo" },
                            { name: "Udio" },
                            { name: "Filmora Editor" }
                          ].map((tool, index, array) => (
                            <div key={tool.name} className="flex items-center">
                              <div className="bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium border border-primary/20">
                                {tool.name}
                              </div>
                              {index < array.length - 1 && (
                                <div className="mx-4 text-muted-foreground text-2xl">→</div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-muted-foreground text-center leading-relaxed">
                          Used ChatGPT for prompts and planning → Midjourney for images and upscaling → wan 2.2 + Veo for animating + sound effects → Udio for music → edited with Filmora Editor.
                        </p>
                      </div>

                      {/* Video Section */}
                      <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                        <div className="flex items-center gap-3 text-primary mb-6">
                          <Play className="h-6 w-6" />
                          <h4 className="text-xl font-semibold text-foreground">Tool-Chaining in Action</h4>
                        </div>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/mMiNiRBKiDs?si=VFTNqX2hyKykfuKD" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Slide 5: Game Worlds */}
                <CarouselItem>
                  <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl p-8">
                    <div className="flex items-center gap-3 text-primary mb-8 justify-center">
                      <Users className="h-7 w-7" />
                      <p className="text-sm font-semibold tracking-[0.3em] uppercase">Interactive Gaming</p>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
                      Bonus: Game Worlds
                    </h3>
                    
                    <div className="max-w-6xl mx-auto space-y-10">
                      <div className="bg-gradient-to-r from-background/70 to-background/40 rounded-3xl p-8 border border-border/40">
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                          Interactive environments where stories, characters, and media generate on the fly
                        </p>
                        <p className="text-muted-foreground mb-6">
                          AI-powered game worlds represent the next frontier in interactive entertainment and education. These environments combine world models with creative storytelling to create spaces where players can explore, learn, and create in ways that adapt to their choices and interests.
                        </p>
                        
                        {/* Visual Example */}
                        <div className="rounded-2xl overflow-hidden mb-8">
                          <img src="/lovable-uploads/e0508721-e67d-4fb9-b6a7-82bed4b08525.png" alt="Interactive game world example showing dynamic environments and adaptive storytelling" className="w-full h-auto rounded-2xl border border-border/50 shadow-lg" />
                        </div>
                      </div>

                      {/* Application Types */}
                      <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                        <h4 className="text-xl font-semibold text-foreground mb-6 text-center">Consider designing worlds for:</h4>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="bg-gradient-to-br from-card/60 to-card/30 rounded-2xl p-6 border border-border/30">
                            <h5 className="font-semibold text-foreground mb-3">Educational Simulations</h5>
                            <p className="text-muted-foreground">Historical events, scientific concepts, or language learning</p>
                          </div>
                          <div className="bg-gradient-to-br from-card/60 to-card/30 rounded-2xl p-6 border border-border/30">
                            <h5 className="font-semibold text-foreground mb-3">Creative Sandboxes</h5>
                            <p className="text-muted-foreground">Open-ended environments for artistic expression and experimentation</p>
                          </div>
                          <div className="bg-gradient-to-br from-card/60 to-card/30 rounded-2xl p-6 border border-border/30">
                            <h5 className="font-semibold text-foreground mb-3">Narrative Adventures</h5>
                            <p className="text-muted-foreground">Branching stories that adapt to player choices and actions</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card/30 rounded-2xl p-6 border border-border/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-xl font-medium text-foreground">Design Your Game World</h4>
                            <p className="text-sm text-muted-foreground">Collaborative brainstorming exercise</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">
                              Title/Name:
                            </label>
                            <Textarea 
                              placeholder="What would you call your game world?"
                              className="min-h-[60px] resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">
                              One-sentence description:
                            </label>
                            <Textarea 
                              placeholder="Describe your world in one compelling sentence..."
                              className="min-h-[60px] resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">
                              Player goals (3 bullets): what the player is trying to achieve or learn.
                            </label>
                            <Textarea 
                              placeholder="• Goal 1:&#10;• Goal 2:&#10;• Goal 3:"
                              className="min-h-[80px] resize-none"
                            />
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-xs text-muted-foreground mb-2">
                            <strong className="text-foreground">Try it yourself:</strong> Explore interactive world generation at Runway's Game Worlds
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://play.runwayml.com/" target="_blank" rel="noopener noreferrer">
                              Game Worlds Beta <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Slide 5: Other Essential Tools for AI Storytelling */}
                <CarouselItem>
                  <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-3xl border border-border/40 shadow-xl p-12">
                    <div className="flex items-center gap-3 text-primary mb-8 justify-center">
                      <Sparkles className="h-7 w-7" />
                      <p className="text-sm font-semibold tracking-[0.3em] uppercase">AI Storytelling</p>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-12 text-center">
                      Other Essential Tools for AI Storytelling
                    </h3>
                    <p className="text-xl text-muted-foreground mb-12 text-center">
                      Powerful AI tools for creating compelling video narratives and visual stories
                    </p>
                    
                    <div className="space-y-10 max-w-6xl mx-auto">
                      {/* Video Generation Tools */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-4 h-4 text-primary bg-primary/20 rounded-sm"></div>
                            Kling AI
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">Keyframe workflow with DeepSeek prompt assistance for smooth video transitions</p>
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img src={klingInterface} alt="Kling AI interface" className="w-full h-auto" />
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://klingai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Try Kling
                            </a>
                          </Button>
                        </div>

                        <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-4 h-4 text-primary bg-primary/20 rounded-sm"></div>
                            Google Flow Studio
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">Create/extend clips, maintain continuity with camera movements</p>
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img src={googleFlowDemo} alt="Google Flow Studio" className="w-full h-auto" />
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://labs.google/fx/tools/flow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Flow Studio
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Preparation & Workflow */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            Notating Images
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">Add arrows/boxes/notes on frames for motion paths and timing guidance. Input an image you made into ChatGPT and ask it to annotate it, or open it in PowerPoint or another visual editor.</p>
                          <div className="rounded-lg overflow-hidden">
                            <img src={notatingImagesDemo} alt="Image annotation demo" className="w-full h-auto" />
                          </div>
                        </div>

                        <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Midjourney Moodboards
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">Build reference boards and apply consistent vibes using --p or Personalization toggle</p>
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img src={midjourneyMoodboard} alt="Midjourney moodboard interface" className="w-full h-auto" />
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://docs.midjourney.com/hc/en-us/articles/39193335040013-Moodboards" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Docs
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Character & Animation */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-4 h-4 text-primary bg-primary/20 rounded-sm"></div>
                            Wan-Animate
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">Animate characters from single images using performance video (motion + lip-sync)</p>
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img src="/lovable-uploads/636289ec-53a6-4fce-adb6-e428a1784b2c.png" alt="Character animation example" className="w-full h-auto" />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://humanaigc.github.io/wan-animate/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Project
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <a href="https://github.com/Wan-Video/Wan2.2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                GitHub
                              </a>
                            </Button>
                          </div>
                        </div>

                        <div className="bg-background/50 rounded-2xl p-6 border border-border/30">
                          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-4 h-4 text-primary bg-primary/20 rounded-sm"></div>
                            Runway Aleph & Act Two
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">Runway's latest video generation models for high-quality, consistent video content</p>
                          <div className="rounded-lg overflow-hidden mb-4">
                            <img src="/lovable-uploads/7f9da2b4-5566-48c4-b753-191e30a1b0bb.png" alt="Runway Aleph and Act Two" className="w-full h-auto" />
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="https://runwayml.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Try Runway
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link to="/week6" className="flex items-center gap-3">
                  <ChevronLeft className="w-4 h-4" />
                  Vibecoding
                </Link>
              </Button>
              
              <Button size="lg" asChild className="rounded-full px-8">
                <Link to="/" className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4" />
                  Back to Course Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link to="/custom-gpts" className="flex items-center gap-3">
                  Custom GPTs
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

export default Storytelling;