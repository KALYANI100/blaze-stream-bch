import { Button } from "@/components/ui/button";
import { Music, Gamepad2, GraduationCap, Code, TrendingUp, Film, Mic, Sparkles } from "lucide-react";

const categories = [
  { name: "All", icon: Sparkles },
  { name: "Trending", icon: TrendingUp },
  { name: "Music", icon: Music },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Education", icon: GraduationCap },
  { name: "Tech", icon: Code },
  { name: "Entertainment", icon: Film },
  { name: "Podcasts", icon: Mic },
];

export const CategoryBar = () => {
  return (
    <div className="border-y border-border bg-card/50 backdrop-blur-sm sticky top-[73px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={category.name === "All" ? "default" : "ghost"}
                size="sm"
                className="whitespace-nowrap gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
