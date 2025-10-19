import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

type GallerySubmission = {
  id: string;
  name: string;
  prototype_title: string;
  modules_used: string[];
  prototype_link: string | null;
  description: string;
  created_at: string;
};

const Gallery = () => {
  const [submissions, setSubmissions] = useState<GallerySubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallerySubmissions();
  }, []);

  const fetchGallerySubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("prototype_submissions")
        .select("id, name, prototype_title, modules_used, prototype_link, description, created_at")
        .eq("status", "approved")
        .eq("consent_public_gallery", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching gallery submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header
        title="Community Gallery"
        subtitle="Explore prototypes built with the CPAD AI Builders Toolkit"
      />

      <div className="relative">
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No prototypes in the gallery yet. Be the first to share yours!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions.map((submission) => (
                  <Card key={submission.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        {submission.prototype_title}
                      </CardTitle>
                      <CardDescription>
                        by {getFirstName(submission.name)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground line-clamp-4">
                        {submission.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {submission.modules_used.map((module) => (
                          <Badge key={module} variant="secondary" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>

                      {submission.prototype_link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-auto"
                          asChild
                        >
                          <a
                            href={submission.prototype_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Project
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
