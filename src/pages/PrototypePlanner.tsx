import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import Header from "@/components/Header";
import { PrototypePlanner as PrototypePlannerComponent } from "@/components/PrototypePlanner";
import { PrototypeSubmissionForm } from "@/components/PrototypeSubmissionForm";
import { ChevronLeft, ChevronRight, Target, Send } from "lucide-react";

const PrototypePlanner = () => {
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const submissionFormRef = useRef<HTMLDivElement>(null);

  const handleSubmitForFeedback = () => {
    submissionFormRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setTimeout(() => setIsSubmissionOpen(true), 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <DesktopNavigation />
      <Header
        title="Prototype Planner"
        subtitle="CPAD AI Builders Toolkit"
      />

      {/* Main Content */}
      <div className="relative">
        {/* Prototype Planning Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 text-primary mb-4">
                <Target className="h-6 w-6" />
                <p className="text-sm font-medium tracking-[0.3em] uppercase">
                  Plan Your Prototype
                </p>
              </div>
              <h2 className="text-3xl font-semibold text-ink mb-4">
                Design Thinking Prototype Wizard
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A 5-phase design thinking journey: Empathize → Define → Ideate → Prototype → Test. 
                Learn the methodology while building your AI prototype plan.
              </p>
            </div>
            
            <PrototypePlannerComponent onSubmitForFeedback={handleSubmitForFeedback} />
          </div>
        </section>

        {/* Submit for Feedback Banner */}
        <section ref={submissionFormRef} className="py-16 md:py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
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

        {/* Navigation */}
        <section className="py-16 md:py-20 bg-accent/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/custom-gpts" className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Custom GPTs
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/" className="flex items-center gap-2">
                  Back to Home
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

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

export default PrototypePlanner;
