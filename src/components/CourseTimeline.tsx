import { Badge } from "@/components/ui/badge";
import { CalendarDays, ExternalLink } from "lucide-react";

interface TimelineItem {
  week: number;
  date: string;
  title: string;
  task?: string;
  points?: number;
  canvasLink?: string;
  isSpecial?: boolean;
}

const timelineData: TimelineItem[] = [
  {
    week: 1,
    date: "Aug 27",
    title: "Getting Started",
    task: "Task 1: Account Set Up",
    points: 10,
    canvasLink: "#task1"
  },
  {
    week: 2,
    date: "Sep 3",
    title: "Text-Based AI Models",
    task: "Task 2: Problem Identification",
    points: 10
  },
  {
    week: 3,
    date: "Sep 10",
    title: "AI Ethics & Bias",
    task: "Task 3: Analyzing Bias",
    points: 10
  },
  {
    week: 4,
    date: "Sep 17",
    title: "Storytelling",
    task: "Task 4: Animated Sequences",
    points: 10
  },
  {
    week: 6,
    date: "Oct 1",
    title: "Vibecoding Artifacts",
    task: "Task 6: MVP",
    points: 10
  },
  {
    week: 7,
    date: "Oct 8",
    title: "Custom GPTs",
    task: "Task 7: Make a Custom GPT",
    points: 10
  },
  {
    week: 8,
    date: "Oct 15",
    title: "Agents",
    task: "(in-class focus)",
    isSpecial: true
  },
  {
    week: 9,
    date: "Oct 22",
    title: "Palmer Museum",
    task: "Task 8: Augmented Reality",
    points: 10
  },
  {
    week: 10,
    date: "Oct 29",
    title: "Design-Based Research",
    task: "Task 9: Research Proposal",
    points: 10
  },
  {
    week: 11,
    date: "Nov 5",
    title: "Project Workshop",
    task: "Task 10: Project Update 1",
    points: 10
  },
  {
    week: 12,
    date: "Nov 12",
    title: "Individual Meetings",
    task: "(no async task)",
    isSpecial: true
  },
  {
    week: 13,
    date: "Nov 19",
    title: "Project Workshop",
    task: "Task 11: Project Update 2",
    points: 10
  },
  {
    week: 14,
    date: "Dec 3",
    title: "Final Project Presentations",
    task: "(in-class)",
    isSpecial: true
  },
  {
    week: 15,
    date: "Dec 10",
    title: "Final Project Presentations",
    task: "Task 12: Final",
    points: 30
  }
];

export default function CourseTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <div key={item.week} className="relative flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
              Wk{item.week}
            </div>
            <div className="min-h-16 flex-1 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-ink-muted">
                      {item.date}
                    </span>
                    {item.canvasLink && (
                      <a
                        href={item.canvasLink}
                        className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Canvas
                      </a>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-1">
                    {item.title}
                  </h3>
                  <p className="text-ink-muted">
                    {item.task}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.points && (
                    <Badge variant="default">
                      {item.points} pts
                    </Badge>
                  )}
                  {item.isSpecial && (
                    <Badge variant="accent">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      In-Class
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}