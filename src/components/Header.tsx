import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import SimpleInteractiveBackground from "./SimpleInteractiveBackground";

interface HeaderProps {
  title: string;
  subtitle?: string;
  dueDate?: string;
}

export default function Header({ title, subtitle, dueDate }: HeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center">
      {/* Enhanced professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]"></div>
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20l-10-10h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Interactive Background */}
      <SimpleInteractiveBackground />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
        {/* Top status bar */}
        <div className="flex items-center justify-end mb-12">
          <div className="flex items-center gap-4">
            {dueDate && (
              <div className="bg-warn/90 backdrop-blur-md rounded-full px-4 py-2 border border-warn-foreground/20">
                <div className="flex items-center gap-2 text-warn-foreground text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  Due: {dueDate}
                </div>
              </div>
            )}
            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground to-primary-foreground/95 bg-clip-text text-transparent drop-shadow-2xl">
                {title}
              </span>
            </h1>
            
            {subtitle && (
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-primary-foreground/85 font-light tracking-wide max-w-4xl mx-auto">
                  {subtitle}
                </p>
                <div className="h-px w-20 bg-primary-foreground/30 mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}