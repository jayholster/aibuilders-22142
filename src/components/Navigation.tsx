import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import cpadLogo from "@/assets/cpad-logo-with-text.png";
import { 
  Home, 
  BookOpen, 
  Menu,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reflection, setReflection] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/week1", label: "AI Literacy Checklist" },
    { path: "/week3", label: "AI Ethics & Bias" },
    { path: "/week6", label: "Vibecoding" },
    { path: "/week4", label: "Storytelling" },
    { path: "/custom-gpts", label: "Custom GPTs" },
    { path: "/prototype-planner", label: "Prototype Planner" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Preserve scroll position and load reflection
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('nav-scroll-position');
    if (savedScrollPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = parseInt(savedScrollPosition);
    }
    
    // Load reflection from localStorage
    const savedReflection = localStorage.getItem('faculty-reflection');
    if (savedReflection) {
      setReflection(savedReflection);
    }
    
    // Listen for storage changes (when reflection is updated)
    const handleStorageChange = () => {
      const updatedReflection = localStorage.getItem('faculty-reflection');
      setReflection(updatedReflection || '');
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also poll localStorage periodically since storage event doesn't fire in same window
    const interval = setInterval(() => {
      const currentReflection = localStorage.getItem('faculty-reflection');
      if (currentReflection !== reflection) {
        setReflection(currentReflection || '');
      }
    }, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [reflection]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      sessionStorage.setItem('nav-scroll-position', scrollContainerRef.current.scrollLeft.toString());
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Desktop Navigation - Scrollable */}
          <div className="hidden md:flex items-center w-full">
            {/* CPAD Logo */}
            <div className="flex-shrink-0 mr-6">
              <a 
                href="https://forms.gle/71sL56MFsKo1WTKR8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={cpadLogo} 
                  alt="Center for Pedagogy in Arts & Design" 
                  className="h-16 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex items-center space-x-1 overflow-x-auto scrollbar-hide pb-1 scroll-smooth"
              onScroll={handleScroll}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={`${
                      isActive(item.path) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    } transition-colors whitespace-nowrap flex-shrink-0`}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    asChild
                    className={`${
                      isActive(item.path) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    } justify-start min-h-[48px] text-base`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Reflection Display - Below Navigation */}
        {reflection && (
          <div className="py-3 px-4 bg-primary/5 border-t border-border/30">
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-muted-foreground flex-shrink-0">Your Problem:</span>
              <p className="text-sm text-foreground line-clamp-2">{reflection}</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}