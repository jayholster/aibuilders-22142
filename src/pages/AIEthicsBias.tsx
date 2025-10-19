import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Header from "@/components/Header";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import WorkshopStations from "@/components/WorkshopStations";
import ArticleViewer from "@/components/ArticleViewer";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Users,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import LessonStepper, { LessonBlock } from "@/components/lessons/LessonStepper";
import { useAppProgress } from "@/hooks/useAppProgress";

const AIEthicsBias = () => {
  const title = "AI Ethics & Bias";
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [convivialArticleOpen, setConvivialArticleOpen] = useState(false);
  const { moduleStates, completeModule } = useAppProgress();

  const lessonBlocks = useMemo<LessonBlock[]>(
    () => [
      {
        id: "overview",
        title: "Frame the ethics landscape",
        summary: "Ground your exploration in the three dimensions guiding this module.",
        estimatedTime: "3 min",
        content: (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Start with a shared vocabulary and understand why environmental impact, relational dynamics, and algorithmic bias matter in arts and design contexts.
            </p>
            <Button size="sm" variant="outline" asChild>
              <a href="#ethics-overview">Jump to overview</a>
            </Button>
          </div>
        ),
      },
      {
        id: "stations",
        title: "Work the critical stations",
        summary: "Move through interactive prompts and case studies with your team.",
        estimatedTime: "12-15 min",
        content: (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Use the mobile-ready stations to document observations, debate trade-offs, and capture commitments you can carry into your prototype planning.
            </p>
            <Button size="sm" variant="outline" asChild>
              <a href="#stations">Open stations</a>
            </Button>
          </div>
        ),
      },
      {
        id: "convivial",
        title: "Interrogate convivial tools",
        summary: "Apply the Convivial Tools framework to ChatGPT and similar systems.",
        estimatedTime: "8 min",
        content: (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Read and annotate the companion article to practice making evidence-informed arguments about when and how to deploy AI responsibly.
            </p>
            <Button size="sm" variant="outline" asChild>
              <a href="#convivial">Read the analysis</a>
            </Button>
          </div>
        ),
      },
      {
        id: "references",
        title: "Bookmark your sources",
        summary: "Capture the citations and data sets that support your position.",
        estimatedTime: "5 min",
        content: (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Download the references bundle so you can cite impact data in proposals, grant applications, or class materials.
            </p>
            <Button size="sm" variant="outline" asChild>
              <a href="#references">View references</a>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <DesktopNavigation />
      <Header
        title={title}
        subtitle="CPAD AI Builders Toolkit"
      />

      <div className="mx-auto max-w-3xl px-4 md:hidden">
        <LessonStepper lessonId="ai-ethics" blocks={lessonBlocks} />
      </div>

      {/* Main Content */}
      <div className="relative">

        {/* AI Ethics Section */}
        <section id="ethics-overview" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <Card className="rounded-2xl border border-white/40 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur mb-8">
              <CardContent className="p-8 space-y-5">
                <div className="flex items-center gap-3 text-primary">
                  <FileText className="h-6 w-6" />
                  <p className="text-sm font-medium tracking-[0.3em] uppercase">Ethics Overview</p>
                </div>
                <h2 className="text-2xl font-semibold text-ink">AI Ethics & Bias</h2>
                <p className="text-lg">
                  Explore AI's impact on environment, relationships and fairness through 3 activities. We'll examine three critical dimensions: 
                  <strong className="text-foreground"> environmental impact</strong> (carbon emissions and water usage), <strong className="text-foreground">relationships</strong> (how AI affects human connections and social dynamics), and <strong className="text-foreground">algorithmic bias</strong> (problems in training 
                  data and outputs).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Workshop Stations */}
        <section id="stations" className="py-8 bg-gradient-to-b from-background to-background/50">
          <div className="max-w-6xl mx-auto px-6">
            <WorkshopStations />
          </div>
        </section>

        {/* Convivial Tools Article - Above References */}
        <section id="convivial" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <Collapsible open={convivialArticleOpen} onOpenChange={setConvivialArticleOpen}>
              <Card className="rounded-2xl border-accent/20 bg-accent/5">
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div className="text-left">
                      <h2 className="text-2xl font-semibold text-foreground mb-2">Reflections on Whether We Should Use AI</h2>
                      <p className="text-muted-foreground">A critical analysis applying the Model for Convivial Tools to ChatGPT</p>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-200 ${convivialArticleOpen ? 'rotate-180' : ''}`} />
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-8 px-8">
                    <ArticleViewer 
                      pdfUrl="/assets/convivial-tools-chatgpt.pdf#page=2"
                      title="The Model for Convivial Tools Applied to ChatGPT"
                      subtitle="Daniel J. Shevock & Jacob Holster"
                    />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </section>

        {/* References Section */}
        <section id="references" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <Collapsible open={isReferencesOpen} onOpenChange={setIsReferencesOpen}>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <div className="p-12 hover:bg-card/20 transition-colors">
                    <div className="flex items-center justify-center gap-3">
                      <h2 className="text-3xl font-light text-foreground">References</h2>
                      {isReferencesOpen ? (
                        <ChevronUp className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-12 pb-12">
                    <div className="grid gap-6 text-sm text-muted-foreground leading-relaxed">
                      {[
                        "Business Insider. (2025, June 21). How a data center operator is upgrading its services for AI — and trying to stay green. Business Insider. https://www.businessinsider.com/digital-realty-ai-infrastructure-data-centers-sustainability-strategy-2025-6",
                        "Environmental Protection Agency. (2022). eGRID 2022 summary tables. United States Environmental Protection Agency. https://www.epa.gov/egrid",
                        "Food & Water Watch. (2025, March). AI's water and energy footprint. Food & Water Watch. https://www.foodandwaterwatch.org/wp-content/uploads/2025/03/FSW_0325_AI_Water_Energy.pdf",
                        "Google Cloud. (2025, August 28). Measuring the environmental impact of AI inference. Google Cloud Blog. https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference",
                        "ITPro. (2025, August 29). Google boasts that a single Gemini prompt uses roughly the same energy as a basic search — but that's not painting the full picture. ITPro. https://www.itpro.com/technology/artificial-intelligence/google-boasts-that-a-single-gemini-prompt-uses-roughly-the-same-energy-as-a-basic-search-but-thats-not-painting-the-full-picture",
                        "Morgan Stanley. (2025, March 17). AI boom may drain resources: Data centres' water use could hit 1,068 billion litres by 2028; Morgan Stanley report flags 11× rise. The Times of India. https://timesofindia.indiatimes.com/business/international-business/ai-boom-may-drain-resources-data-centres-water-use-could-hit-1068-billion-litres-by-2028-morgan-stanley-report-flags-11x-rise/articleshow/123758252.cms",
                        "Patterson, D., Gonzalez, J., Le, Q., Liang, C., & Dean, J. (2021). Carbon emissions and large neural network training [Preprint]. arXiv. https://arxiv.org/abs/2104.10350",
                        "Strubell, E., Ganesh, A., & McCallum, A. (2019). Energy and policy considerations for deep learning in NLP. Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics, 3645–3650. https://doi.org/10.48550/arXiv.1906.02243",
                        "U.S. Department of Energy. (2023). Residential energy consumption survey (RECS): Average household electricity use. U.S. Energy Information Administration. https://www.eia.gov/consumption/residential/",
                        "U.S. Environmental Protection Agency. (2023). Greenhouse gases equivalencies calculator – Calculations and references. United States Environmental Protection Agency. https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references"
                      ].map((reference, index) => (
                        <div key={index} className="p-6 bg-background/50 rounded-xl border border-border/30">
                          <p>{reference}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </section>

        <div className="hidden justify-end px-6 md:flex">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => completeModule("ai-ethics")}
            disabled={moduleStates["ai-ethics"]?.completed}
          >
            {moduleStates["ai-ethics"]?.completed ? "Module completed" : "Mark module complete"}
            <Users className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <section className="py-12 bg-gradient-to-b from-background/50 to-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link to="/week1" className="flex items-center gap-3">
                  <ChevronLeft className="w-4 h-4" />
                  AI Literacy Checklist
                </Link>
              </Button>
              
              <Button size="lg" asChild className="rounded-full px-8">
                <Link to="/" className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4" />
                  Back to Workshop Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="rounded-full px-8">
                <Link to="/week6" className="flex items-center gap-3">
                  Vibecoding
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIEthicsBias;