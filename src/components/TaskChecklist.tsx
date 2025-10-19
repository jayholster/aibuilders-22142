import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

interface TaskItem {
  name: string;
  url: string;
  description: string;
}

const taskItems: TaskItem[] = [
  {
    name: "Gemini",
    url: "https://gemini.google/students",
    description: "AI Pro for Students / free tier"
  },
  {
    name: "ChatGPT",
    url: "https://chat.openai.com/signup",
    description: "free; Plus recommended if possible"
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    description: "free"
  },
  {
    name: "Lovable",
    url: "https://lovable.dev",
    description: "free tier"
  },
  {
    name: "Udio",
    url: "https://udio.com",
    description: "free plan/trial"
  },
  {
    name: "Leonardo AI",
    url: "https://leonardo.ai",
    description: "free, ~150 fast tokens/day"
  },
  {
    name: "Perplexity",
    url: "https://perplexity.ai/backtoschool",
    description: "Back to School page"
  },
  {
    name: "Firebase Studio",
    url: "https://firebase.google.com/docs/studio",
    description: "free access"
  }
];

export default function TaskChecklist() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-ink">
          Set up ALL accounts & capture login screenshots
        </h3>
        <Badge variant="warn" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Due Sun Aug 31, 11:59 PM
        </Badge>
      </div>
      
      <div className="grid gap-4">
        {taskItems.map((item, index) => (
          <Card key={index} className="border border-border hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
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


      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-semibold text-ink mb-3">What to submit (single PDF or DOCX):</h4>
        <div className="text-sm text-ink-muted space-y-2">
          <p><strong>8 screenshots</strong> (one per tool): your logged-in home/dashboard for each.</p>
          <p><strong>Short reflection (100–150 words):</strong></p>
          <ul className="ml-4 space-y-1">
            <li>• Which tool will you reach for first and why?</li>
            <li>• Any signup snags to flag (1–2 sentences).</li>
          </ul>
          <p className="mt-3"><strong>How to create PDF:</strong></p>
          <p>Save all screenshots and your reflection in one pdf. On a mac, select all screenshot files, click quick actions, create a pdf. On windows, select all of your images and hit print, print to pdf.</p>
        </div>
      </div>
    </div>
  );
}