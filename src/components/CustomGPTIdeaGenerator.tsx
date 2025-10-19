import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, Wand2, Copy, FileText, Users, MessageSquare, Settings, ArrowDown, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  purpose: z.string().min(10, "Please provide at least 10 characters describing your GPT's purpose"),
  audience: z.string().min(1, "Please select a target audience"),
  contextDocuments: z.string().optional(),
  customInstructions: z.string().min(20, "Please provide at least 20 characters of custom instructions"),
  conversationStarters: z.string().optional(),
  toolCapabilities: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GPTRecommendation {
  gpt_name: string;
  system_prompt: string;
  knowledge_base_recommendations: string[];
  conversation_starter: string;
  configuration_checklist: string[];
}

const toolOptions = [
  { id: "web_browsing", label: "Web Browsing" },
  { id: "image_generation", label: "Image Generation" },
  { id: "data_analysis", label: "Data Analysis" },
  { id: "code_interpreter", label: "Code Interpreter" },
];

const CustomGPTIdeaGenerator = () => {
  const { toast } = useToast();
  const [reflections, setReflections] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<GPTRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: "",
      audience: "",
      contextDocuments: "",
      customInstructions: "",
      conversationStarters: "",
      toolCapabilities: [],
    },
  });

  const analyzeReflections = async () => {
    if (!reflections.trim()) {
      toast({
        title: "Tell us your thoughts",
        description: "Please share your reflections about what you'd like to create.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-gpt-ideas", {
        body: { reflections, step: "analyze" },
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw error;
      }

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data?.suggestions) {
        // Populate form with AI suggestions
        form.reset({
          purpose: data.suggestions.purpose || "",
          audience: data.suggestions.audience || "",
          contextDocuments: data.suggestions.contextDocuments || "",
          customInstructions: data.suggestions.customInstructions || "",
          conversationStarters: data.suggestions.conversationStarters || "",
          toolCapabilities: data.suggestions.toolCapabilities || [],
        });
        setShowForm(true);
        toast({
          title: "✨ Form populated!",
          description: "Review and adjust the suggestions below.",
        });
      }
    } catch (error) {
      console.error("Error analyzing reflections:", error);
      toast({
        title: "Oops!",
        description: "Failed to analyze reflections. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsGenerating(true);
    setRecommendation(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-gpt-ideas", {
        body: { formData: values, step: "generate" },
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw error;
      }

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data?.recommendation) {
        setRecommendation(data.recommendation);
        toast({
          title: "✨ Custom GPT Plan Ready!",
          description: "Your personalized GPT configuration is ready to use.",
        });
      }
    } catch (error) {
      console.error("Error generating recommendation:", error);
      toast({
        title: "Oops!",
        description: "Failed to generate recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const reset = () => {
    setReflections("");
    setShowForm(false);
    form.reset();
    setRecommendation(null);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto border-2 border-primary/20 shadow-xl overflow-hidden">
      <CardHeader className="space-y-3 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wand2 className="w-7 h-7 text-primary animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">GPT Planner</CardTitle>
            <CardDescription className="text-base mt-1">
              Share your thoughts, and AI will help design your custom GPT ✨
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-8">
        {!recommendation ? (
          <>
            {/* Step 1: Reflections */}
            {!showForm && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        Share Your Thoughts
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Tell us what you're thinking. What challenge are you facing? What would make your work easier? Who would benefit?
                      </p>
                      <Textarea
                        value={reflections}
                        onChange={(e) => setReflections(e.target.value)}
                        placeholder="Example: I'm a teaching assistant for a large lecture course and I need help organizing office hour questions by topic. Students often ask similar questions, and I'd like a way to categorize them so I can prepare better responses and identify common confusion points..."
                        className="min-h-[180px] text-base resize-none"
                        disabled={isAnalyzing}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={analyzeReflections} 
                  disabled={!reflections.trim() || isAnalyzing}
                  className="w-full h-14 text-lg font-semibold group"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Your Reflections...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Step 2: Review & Edit Form */}
            {showForm && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          Review & Refine
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          We've analyzed your reflections and filled in the details below. Feel free to adjust anything.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purpose Field */}
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          GPT Purpose/Role
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What is the main purpose of your Custom GPT?"
                            className="min-h-[80px] text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Target Audience */}
                  <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Target Audience
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select who will use this GPT" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="students">Students</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="researchers">Researchers</SelectItem>
                            <SelectItem value="administrators">Administrators</SelectItem>
                            <SelectItem value="mixed">Mixed Audience</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Context Documents */}
                  <FormField
                    control={form.control}
                    name="contextDocuments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          Context Documents <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What knowledge or context should your GPT reference?"
                            className="min-h-[70px] text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Custom Instructions */}
                  <FormField
                    control={form.control}
                    name="customInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <Settings className="w-4 h-4 text-primary" />
                          Custom Instructions
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What specific behavior or tone should your GPT have?"
                            className="min-h-[80px] text-base resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Conversation Starters */}
                  <FormField
                    control={form.control}
                    name="conversationStarters"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          Conversation Starter <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Add one conversation starter"
                            className="text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          A single prompt to help users get started
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tool Capabilities */}
                  <FormField
                    control={form.control}
                    name="toolCapabilities"
                    render={() => (
                      <FormItem>
                        <div className="mb-3">
                          <FormLabel className="text-base font-semibold">
                            Tool Capabilities <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
                          </FormLabel>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {toolOptions.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="toolCapabilities"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm cursor-pointer">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isGenerating}
                      className="flex-1 h-12 text-base font-semibold group"
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                          Generating Plan...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                          Generate My GPT Plan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b-2 border-primary/20 pb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                Your Custom GPT Plan
              </h3>
              <Button 
                onClick={reset} 
                variant="outline"
                className="gap-2"
              >
                <Wand2 className="w-4 h-4" />
                Create Another
              </Button>
            </div>

            {/* GPT Name */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center justify-between">
                  {recommendation.gpt_name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(recommendation.gpt_name, "GPT name")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>Your Custom GPT Name</CardDescription>
              </CardHeader>
            </Card>

            {/* System Prompt */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">System Prompt</CardTitle>
                    <CardDescription>Ready to copy and paste</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(recommendation.system_prompt, "System prompt")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono">{recommendation.system_prompt}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Base Recommendations */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Knowledge Base Recommendations
                </CardTitle>
                <CardDescription>Documents to upload to your GPT</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendation.knowledge_base_recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">{i + 1}</Badge>
                      <span className="text-base">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Conversation Starter */}
            {recommendation.conversation_starter && (
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Conversation Starter
                      </CardTitle>
                      <CardDescription>Use this to help users get started</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(recommendation.conversation_starter, "Conversation starter")}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <p className="text-sm">{recommendation.conversation_starter}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Configuration Checklist */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Configuration Checklist
                </CardTitle>
                <CardDescription>Follow these steps to build your GPT</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recommendation.configuration_checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {i + 1}
                      </div>
                      <span className="text-base pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>


            {/* Ready to Build Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-xl p-6 space-y-3 text-center mt-6">
              <h4 className="font-bold text-xl flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                Ready to Build Your GPT?
              </h4>
              <p className="text-base leading-relaxed">
                Follow the step-by-step guide below to bring your Custom GPT to life!
              </p>
              <ArrowDown className="w-8 h-8 text-primary mx-auto animate-bounce" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomGPTIdeaGenerator;