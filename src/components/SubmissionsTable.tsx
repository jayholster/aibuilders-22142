import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Eye, Loader2 } from "lucide-react";

type Submission = {
  id: string;
  name: string;
  email: string;
  prototype_title: string;
  modules_used: string[];
  prototype_link: string | null;
  description: string;
  feedback_requested: string | null;
  consent_public_gallery: boolean;
  status: "pending" | "reviewed" | "approved" | "declined";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export function SubmissionsTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchSubmissions();

    const channel = supabase
      .channel("submissions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "prototype_submissions",
        },
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("prototype_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Submission["status"]) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("prototype_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Submission marked as ${status}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleNotesUpdate = async () => {
    if (!selectedSubmission) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("prototype_submissions")
        .update({ admin_notes: adminNotes })
        .eq("id", selectedSubmission.id);

      if (error) throw error;

      toast({
        title: "Notes saved",
        description: "Admin notes updated successfully",
      });

      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        title: "Error",
        description: "Failed to update notes",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: Submission["status"]) => {
    const variants = {
      pending: "secondary",
      reviewed: "outline",
      approved: "default",
      declined: "destructive",
    } as const;

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gallery</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No submissions yet
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.prototype_title}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    {submission.consent_public_gallery ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(submission.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setAdminNotes(submission.admin_notes || "");
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select
                        value={submission.status}
                        onValueChange={(value) =>
                          handleStatusUpdate(submission.id, value as Submission["status"])
                        }
                        disabled={updating}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSubmission?.prototype_title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedSubmission?.name} on{" "}
              {selectedSubmission &&
                new Date(selectedSubmission.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-sm text-muted-foreground">{selectedSubmission.email}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Modules Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.modules_used.map((module) => (
                    <Badge key={module} variant="secondary">
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedSubmission.prototype_link && (
                <div>
                  <h4 className="font-semibold mb-1">Prototype Link</h4>
                  <a
                    href={selectedSubmission.prototype_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {selectedSubmission.prototype_link}
                  </a>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-1">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedSubmission.description}
                </p>
              </div>

              {selectedSubmission.feedback_requested && (
                <div>
                  <h4 className="font-semibold mb-1">Feedback Requested</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedSubmission.feedback_requested}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Admin Notes</h4>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this submission..."
                  rows={4}
                />
              </div>

              <Button onClick={handleNotesUpdate} disabled={updating} className="w-full">
                {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Notes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
