import { Card, CardContent } from "@/components/ui/card";
import { FileText, Trophy, Users } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: 'primary' | 'accent' | 'warn';
}

const stats: StatCard[] = [
  {
    title: "Weekly Tasks",
    value: "110",
    subtitle: "11 tasks × 10 pts",
    icon: <FileText className="w-6 h-6" />,
    color: 'primary'
  },
  {
    title: "Final Project",
    value: "30",
    subtitle: "Portfolio showcase",
    icon: <Trophy className="w-6 h-6" />,
    color: 'accent'
  },
  {
    title: "Total Points",
    value: "140",
    subtitle: "Available this semester",
    icon: <Users className="w-6 h-6" />,
    color: 'warn'
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-border hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-muted mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-ink mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-ink-muted">
                  {stat.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'primary' ? 'bg-primary/10 text-primary' :
                stat.color === 'accent' ? 'bg-accent/10 text-accent' :
                'bg-warn/10 text-warn'
              }`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}