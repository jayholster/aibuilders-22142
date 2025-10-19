import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const MODULE_OPTIONS = [
  "Getting Started",
  "AI Ethics & Bias",
  "Storytelling with AI",
  "Custom GPTs",
  "Vibecoding with ChatGPT",
  "Prototype Planner",
];

const submissionSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email").max(255),
  prototype_title: z.string().min(3, "Title is required").max(200),
  modules_used: z.array(z.string()).min(1, "Select at least one module"),
  prototype_link: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().min(50, "Please provide more detail (min 50 chars)").max(1000),
  feedback_requested: z.string().max(500).optional(),
  consent_public_gallery: z.boolean(),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

interface PrototypeSubmissionFormProps {
  onSuccess?: () => void;
}

export function PrototypeSubmissionForm({ onSuccess }: PrototypeSubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      consent_public_gallery: false,
      modules_used: [],
    },
  });

  const handleModuleToggle = (module: string) => {
    const updated = selectedModules.includes(module)
      ? selectedModules.filter((m) => m !== module)
      : [...selectedModules, module];
    setSelectedModules(updated);
    setValue("modules_used", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: SubmissionFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("prototype_submissions").insert({
        name: data.name,
        email: data.email,
        prototype_title: data.prototype_title,
        modules_used: data.modules_used,
        prototype_link: data.prototype_link || null,
        description: data.description,
        feedback_requested: data.feedback_requested || null,
        consent_public_gallery: data.consent_public_gallery,
      });

      if (error) throw error;

      toast({
        title: "Submission received!",
        description: "Thank you for sharing your prototype. We'll review it and get back to you soon.",
      });

      reset();
      setSelectedModules([]);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting prototype:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your prototype. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Your full name"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="your.email@example.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Prototype Title */}
      <div className="space-y-2">
        <Label htmlFor="prototype_title">Prototype Title *</Label>
        <Input
          id="prototype_title"
          {...register("prototype_title")}
          placeholder="What did you build?"
          className={errors.prototype_title ? "border-destructive" : ""}
        />
        {errors.prototype_title && (
          <p className="text-sm text-destructive">{errors.prototype_title.message}</p>
        )}
      </div>

      {/* Modules Used */}
      <div className="space-y-3">
        <Label>Workshop Modules Used *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MODULE_OPTIONS.map((module) => (
            <div key={module} className="flex items-center space-x-2">
              <Checkbox
                id={module}
                checked={selectedModules.includes(module)}
                onCheckedChange={() => handleModuleToggle(module)}
              />
              <label
                htmlFor={module}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {module}
              </label>
            </div>
          ))}
        </div>
        {errors.modules_used && (
          <p className="text-sm text-destructive">{errors.modules_used.message}</p>
        )}
      </div>

      {/* Prototype Link */}
      <div className="space-y-2">
        <Label htmlFor="prototype_link">Prototype Link (optional)</Label>
        <Input
          id="prototype_link"
          {...register("prototype_link")}
          placeholder="https://your-prototype.com"
          className={errors.prototype_link ? "border-destructive" : ""}
        />
        {errors.prototype_link && (
          <p className="text-sm text-destructive">{errors.prototype_link.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description * (min 50 characters)</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Tell us about your prototype, what problem it solves, and how you built it..."
          rows={5}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Feedback Requested */}
      <div className="space-y-2">
        <Label htmlFor="feedback_requested">Specific Feedback Areas (optional)</Label>
        <Textarea
          id="feedback_requested"
          {...register("feedback_requested")}
          placeholder="What specific aspects would you like feedback on?"
          rows={3}
        />
      </div>

      {/* Public Gallery Consent */}
      <div className="flex items-start space-x-2 p-4 bg-accent/10 rounded-lg">
        <Checkbox
          id="consent_public_gallery"
          {...register("consent_public_gallery")}
        />
        <div className="space-y-1">
          <label
            htmlFor="consent_public_gallery"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            I consent to showcasing my prototype in the public gallery
          </label>
          <p className="text-xs text-muted-foreground">
            If approved, your prototype will be featured in our community gallery for others to see and learn from.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit for Feedback
      </Button>
    </form>
  );
}
