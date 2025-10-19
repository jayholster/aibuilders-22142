import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const SubmissionsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header
        title="Prototype Submissions"
        subtitle="Admin Panel"
      />

      <div className="relative">
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <SubmissionsTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubmissionsAdmin;
