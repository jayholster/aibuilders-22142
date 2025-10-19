import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CourseTimeline from "@/components/CourseTimeline";
import TaskChecklist from "@/components/TaskChecklist";
import TodaysPlan from "@/components/TodaysPlan";
import StatsCards from "@/components/StatsCards";
import LearningOutcomes from "@/components/LearningOutcomes";
import pennStateHeaderImage from "@/assets/penn-state-header.jpg";
import { 
  Mail, 
  Video, 
  Calendar, 
  FileText, 
  MessageCircle, 
  ExternalLink,
  Info,
  Users,
  CheckCircle2,
  Clock
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <img 
          src={pennStateHeaderImage} 
          alt="Penn State University themed header with navy blue and white geometric design"
          className="w-full h-80 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
          <div className="text-center space-y-6">
            <Badge variant="warn" className="mb-4">
              <Clock className="w-3 h-3 mr-1" />
              Due this week: Task 1 - Account Setup
            </Badge>
            <h1 className="text-5xl font-bold text-ink leading-tight">
              AA290G: Creating & Learning with AI
            </h1>
            <div className="text-xl text-ink-muted space-y-2">
              <p>Fall 2025 • Wed 2:30–3:45 • Borland 113</p>
              <p>Instructor: Dr. Jacob Holster • jbh6331@psu.edu</p>
              <p>Office hours: Zoom/in-person by appointment</p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:jbh6331@psu.edu" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="#" className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Zoom
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* Today's Plan */}
        <section>
          <TodaysPlan />
        </section>

        {/* What This Course Is */}
        <section>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-6">What This Course Is</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-ink">Make</h3>
                    <p className="text-ink-muted text-sm">text, image, music, video—portfolio-ready artifacts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-medium text-ink">Learn by doing</h3>
                    <p className="text-ink-muted text-sm">weekly mini-tasks + one bigger project</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-warn mt-0.5" />
                  <div>
                    <h3 className="font-medium text-ink">Compare/contrast tools</h3>
                    <p className="text-ink-muted text-sm">strengths, limits, trade-offs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-ink">Reflect on impact</h3>
                    <p className="text-ink-muted text-sm">bias, privacy, attribution, cultural context (stated plainly, no slogans)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <LearningOutcomes />
          </div>
        </section>

        {/* Logistics */}
        <section>
          <h2 className="text-2xl font-semibold text-ink mb-6">Logistics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">Meets Wednesdays 2:30–3:45</p>
                      <p className="text-sm text-ink-muted">(Borland 113)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">Hybrid 50/50</p>
                      <p className="text-sm text-ink-muted">in-person + weekly async work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-warn mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">All weekly tasks due Sundays</p>
                      <p className="text-sm text-ink-muted">@ 11:59 PM (Canvas)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-ink mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="#calendar" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Full Course Calendar
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href="#" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Canvas Course Page
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Assignments & Points */}
        <section>
          <h2 className="text-2xl font-semibold text-ink mb-6">Assignments & Points</h2>
          <StatsCards />
          <div className="mt-4 text-center">
            <p className="text-ink-muted">
              <strong>Note:</strong> Presentations + in-class work are required to pass
            </p>
          </div>
        </section>

        {/* Task 1 */}
        <section id="task1">
          <TaskChecklist />
        </section>

        {/* Course Calendar */}
        <section id="calendar">
          <h2 className="text-2xl font-semibold text-ink mb-6">Full Course Calendar</h2>
          <CourseTimeline />
        </section>

        {/* Use of AI & Originality */}
        <section>
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-ink mb-4">Use of AI & Originality</h3>
                  <div className="space-y-3 text-ink-muted">
                    <p>• You are expected to use AI; you must also add value beyond it</p>
                    <p>• Document your process (briefly) when you submit: models, prompts, key edits</p>
                    <p>• If work looks low-effort or obviously AI-written, I'll tell you that in feedback and ask for revision or process evidence</p>
                    <p>• I may request a live walkthrough or source files for any submission</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Space Care */}
        <section>
          <h2 className="text-2xl font-semibold text-ink mb-6">Space Care (Borland 113)</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-ink">Use the whiteboards</p>
                    <p className="text-sm text-ink-muted">walls & tables — erase before you leave</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-ink">No food or drinks</p>
                    <p className="text-sm text-ink-muted">clean spills/crumbs immediately if it happens</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-ink">Tidy up</p>
                    <p className="text-sm text-ink-muted">cables and chairs — leave better than found</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Get Help */}
        <section>
          <h2 className="text-2xl font-semibold text-ink mb-6">How to Get Help</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card className="border border-border hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-ink">Canvas</p>
                      <p className="text-sm text-ink-muted">weekly module pages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-ink">Office hours</p>
                      <p className="text-sm text-ink-muted">email to schedule (Zoom or in-person)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card className="border border-border hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-warn" />
                    <div>
                      <p className="font-medium text-ink">Quick questions</p>
                      <p className="text-sm text-ink-muted">ask in class or Canvas discussion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button variant="default" className="w-full" asChild>
                <a href="mailto:jbh6331@psu.edu" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Dr. Holster
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="text-center">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-ink mb-6">Next Steps</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-ink-muted">• Finish Task 1 by Sun Aug 31, 11:59 PM</p>
                  <p className="text-ink-muted">• Bring laptop + headphones next class</p>
                  <p className="text-ink-muted">• Come ready with one idea you might want to build</p>
                </div>
                <div className="pt-4">
                  <Button size="lg" variant="default" asChild>
                    <a href="#task1" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Open Task 1
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default Index;