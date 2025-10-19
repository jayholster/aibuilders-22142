import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PrototypeSubmissionForm } from "./PrototypeSubmissionForm";
import { Send } from "lucide-react";

export function PrototypeSubmissionCard() {
  console.log("PrototypeSubmissionCard rendered");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-xl">
          <Send className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Submit Your Prototype for Feedback
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Built something amazing? Share your prototype and get expert feedback from workshop facilitators.
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit for Feedback
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Your Prototype</DialogTitle>
            <DialogDescription>
              Share your work and get personalized feedback from our team.
            </DialogDescription>
          </DialogHeader>
          <PrototypeSubmissionForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
