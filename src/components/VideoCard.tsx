import { Play, Eye, ThumbsUp, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  views: string;
  duration: string;
  isPremium?: boolean;
  price?: string;
}

export const VideoCard = ({ 
  id, 
  thumbnail, 
  title, 
  creator, 
  views, 
  duration, 
  isPremium = false,
  price 
}: VideoCardProps) => {
  return (
    <Link to={`/watch/${id}`}>
      <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,92,0.2)] bg-card">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            {duration}
          </div>

          {/* Premium Badge */}
          {isPremium && (
            <Badge className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm text-secondary-foreground border-0">
              <Coins className="w-3 h-3 mr-1" />
              {price} BCH
            </Badge>
          )}

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/0 group-hover:bg-primary flex items-center justify-center transition-all duration-300 transform scale-0 group-hover:scale-100">
              <Play className="w-6 h-6 text-background fill-background" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors">{creator}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {views}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {Math.floor(Math.random() * 1000)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
