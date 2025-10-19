import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker - Vite local ESM worker to avoid CDN/CORS issues
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Explicit worker creation as fallback to prevent fake worker
try {
  // @ts-ignore - pdfjs expects a Worker instance here
  pdfjs.GlobalWorkerOptions.workerPort = new Worker(
    new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url),
    { type: 'module' }
  );
} catch (_) {
  // noop - will fall back to workerSrc above
}

interface ArticleViewerProps {
  pdfUrl: string;
  title: string;
  subtitle?: string;
}

export default function ArticleViewer({ pdfUrl, title, subtitle }: ArticleViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Card className="border-accent/20 bg-accent/5">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-ink">{title}</h2>
          {subtitle && (
              <p className="text-ink-muted">{subtitle}</p>
            )}
          </div>

          {/* Article Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href={pdfUrl} download className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://doi.org/10.1177/00274321241255938" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View on Journal
              </a>
            </Button>
          </div>

          {/* PDF Viewer */}
          <div className="bg-background border rounded-lg overflow-hidden">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-ink-muted">Loading article...</div>
              </div>
            )}
            
            <div className="flex justify-center">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading=""
                error={
                  <div className="flex items-center justify-center py-12">
                    <div className="text-destructive">Error loading PDF. Please try downloading the file directly.</div>
                  </div>
                }
              >
                <Page 
                  pageNumber={pageNumber} 
                  width={Math.min(800, window.innerWidth - 100)}
                  loading=""
                />
              </Document>
            </div>

            {/* Navigation */}
            {!loading && numPages > 0 && (
              <div className="flex items-center justify-between p-4 bg-muted/30 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-ink-muted">
                    Page {pageNumber} of {numPages}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={pageNumber >= numPages}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}