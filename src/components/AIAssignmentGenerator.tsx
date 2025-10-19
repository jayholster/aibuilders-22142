import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, Share2, Sparkles, FileText, ClipboardList } from "lucide-react";

export const AIAssignmentGenerator = () => {
  const [subjectArea, setSubjectArea] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [aiTools, setAiTools] = useState("");
  const [duration, setDuration] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const { toast } = useToast();

  const generateIdeas = async () => {
    if (!subjectArea || !gradeLevel || !learningObjectives || !aiTools || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate assignment ideas.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-assignment-ideas', {
        body: {
          subjectArea,
          gradeLevel,
          learningObjectives,
          aiTools,
          duration,
        },
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

      setGeneratedIdeas(data.content);
      toast({
        title: "Success!",
        description: "Assignment ideas generated successfully.",
      });
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: "Error",
        description: "Failed to generate assignment ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFollowUp = async (type: "rubric" | "guide") => {
    setIsGeneratingFollowUp(true);
    try {
      const prompt = type === "rubric" 
        ? `Create a detailed assessment rubric for this assignment:\n\n${generatedIdeas}\n\nInclude criteria, point values, and performance levels.`
        : `Create a step-by-step student guide for this assignment:\n\n${generatedIdeas}\n\nMake it clear, actionable, and student-friendly.`;

      const { data, error } = await supabase.functions.invoke('generate-assignment-ideas', {
        body: {
          subjectArea: "Follow-up",
          gradeLevel: gradeLevel,
          learningObjectives: prompt,
          aiTools: aiTools,
          duration: duration,
        },
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

      setGeneratedIdeas(generatedIdeas + "\n\n---\n\n" + data.content);
      toast({
        title: "Generated!",
        description: `${type === "rubric" ? "Rubric" : "Student guide"} added successfully.`,
      });
    } catch (error) {
      console.error("Error generating follow-up:", error);
      toast({
        title: "Error",
        description: "Failed to generate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFollowUp(false);
    }
  };

  const reset = () => {
    setSubjectArea("");
    setGradeLevel("");
    setLearningObjectives("");
    setAiTools("");
    setDuration("");
    setGeneratedIdeas("");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedIdeas);
    toast({
      title: "Copied!",
      description: "Assignment ideas copied to clipboard.",
    });
  };

  const shareIdeas = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI-Enhanced Assignment Ideas',
          text: generatedIdeas,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Assignment Generator
        </CardTitle>
        <CardDescription>
          Generate custom assignment ideas that integrate AI tools effectively
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!generatedIdeas ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject Area</Label>
              <Input
                id="subject"
                placeholder="e.g., English Literature, Computer Science, History"
                value={subjectArea}
                onChange={(e) => setSubjectArea(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="grade">Grade Level</Label>
              <Input
                id="grade"
                placeholder="e.g., 9-10, College Freshman, Adult Learners"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="objectives">Learning Objectives</Label>
              <Textarea
                id="objectives"
                placeholder="What should students learn or be able to do? Include specific skills or knowledge areas."
                value={learningObjectives}
                onChange={(e) => setLearningObjectives(e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="tools">Available AI Tools</Label>
              <Textarea
                id="tools"
                placeholder="e.g., ChatGPT, Midjourney, Claude, Gemini, GitHub Copilot, Grammarly"
                value={aiTools}
                onChange={(e) => setAiTools(e.target.value)}
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="duration">Assignment Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 1 week, 2 class periods, semester-long project"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={generateIdeas} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Assignment Ideas
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
                {generatedIdeas}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button 
                  onClick={() => generateFollowUp("rubric")} 
                  variant="outline" 
                  className="flex-1"
                  disabled={isGeneratingFollowUp}
                >
                  {isGeneratingFollowUp ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ClipboardList className="mr-2 h-4 w-4" />
                  )}
                  Add Rubric
                </Button>
                <Button 
                  onClick={() => generateFollowUp("guide")} 
                  variant="outline" 
                  className="flex-1"
                  disabled={isGeneratingFollowUp}
                >
                  {isGeneratingFollowUp ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  Add Student Guide
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button onClick={shareIdeas} variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button onClick={reset} className="flex-1">
                  Generate New
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
