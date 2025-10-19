import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface PlanItem {
  title: string;
  completed?: boolean;
}

const planItems: PlanItem[] = [
  { title: "Welcome & quick overview" },
  { title: "Syllabus headlines" },
  { title: "Q&A" },
  { title: "Tools & Task 1 walkthrough" },
  { title: "Full course calendar" },
  { title: "Space care & expectations" },
  { title: "How to get help + wrap" }
];

export default function TodaysPlan() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-ink">Today's Plan</h2>
      </div>

      <div className="space-y-3">
        {planItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                {index + 1}
              </div>
              <span className="text-ink font-medium">{item.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.completed && (
                <CheckCircle className="w-4 h-4 text-accent" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Badge variant="warn" className="flex items-center gap-1">
          <a href="https://psu.instructure.com/courses/2421561/assignments/17394004?module_item_id=45959786" target="_blank" rel="noopener noreferrer">
            Task 1 due Sun Aug 31, 11:59 PM
          </a>
        </Badge>
      </div>
    </div>
  );
}