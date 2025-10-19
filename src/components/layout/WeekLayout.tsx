import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface WeekLayoutProps {
  weekNumber: number;
  title: string;
  dueDate?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function WeekLayout({ weekNumber, title, dueDate, subtitle, children }: WeekLayoutProps) {
  const prevWeek = weekNumber > 1 ? weekNumber - 1 : null;
  const nextWeek = weekNumber < 15 ? weekNumber + 1 : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header 
        title={title}
        subtitle={subtitle || "AA290G: Creating & Learning with AI"}
        dueDate={dueDate}
      />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {children}

        {/* Navigation */}
        <section className="mt-20">
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/40">
            <div className="flex items-center justify-between gap-4">
              <Button variant="outline" size="lg" asChild className="min-w-[120px]">
                <Link to="/week3" className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  AI Ethics & Bias
                </Link>
              </Button>
              
              <Button size="lg" asChild className="min-w-[180px]">
                <Link to="/" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Course Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="min-w-[120px]">
                <Link to="/week4" className="flex items-center gap-2">
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
}