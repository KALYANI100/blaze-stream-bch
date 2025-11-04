import { Play, Eye, ThumbsUp, Coins, Settings, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  views: number;
  likes: number;
  duration: string;
  isPremium?: boolean;
  price?: string;
  contractAddress?: string;        // ← NEW: Contract link
  earnings?: number;              // ← NEW: Video earnings
  showContract?: boolean;         // ← NEW: Show contract in dashboard
  showActions?: boolean;          // ← NEW: Dashboard actions
}

export const VideoCard = ({ 
  id, 
  thumbnail, 
  title, 
  creator, 
  views, 
  likes, 
  duration, 
  isPremium = false,
  price,
  contractAddress,
  earnings = 0,
  showContract = false,
  showActions = false
}: VideoCardProps) => {
  const navigate = useNavigate();
  // **NEW: Copy contract to clipboard**
  const copyContract = () => {
    if (contractAddress) {
      navigator.clipboard.writeText(contractAddress);
      // Show toast (implement your toast system)
      console.log("✅ Contract copied!");
    }
  };
console.log(thumbnail);
 const handleVideoClick = () => {
    navigate(`/watch/id=${id}`);
  };

  return (
    <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,92,0.2)] bg-card" onClick={handleVideoClick}>
      
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
        {isPremium && price && (
          <Badge className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm text-secondary-foreground border-0">
            <Coins className="w-3 h-3 mr-1" />
            {price} BCH
          </Badge>
        )}

        {/* Earnings Badge - DASHBOARD ONLY */}
        {showActions && earnings > 0 && (
          <Badge className="absolute top-2 right-2 bg-green-500/90 text-white border-0">
            +{earnings.toFixed(3)} BCH
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
              {/* {views.toLocaleString()} */}
              {views?.toLocaleString() ?? "--"}

            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {likes?.toLocaleString() ?? '0'}

            </span>
          </div>
        </div>

        {/* **NEW: CONTRACT DISPLAY - DASHBOARD ONLY** */}
        {showContract && contractAddress && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-2 px-2 py-1 bg-primary/10 rounded text-xs text-primary flex items-center gap-1 cursor-pointer hover:bg-primary/20 transition-colors">
                  <span>🔗</span>
                  <span className="font-mono truncate">
                    {contractAddress.slice(0, 8)}...
                  </span>
                  <Copy className="w-3 h-3 ml-auto" onClick={copyContract} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">{contractAddress}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* **NEW: DASHBOARD ACTIONS - BOTTOM RIGHT** */}
      {showActions && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-background/90 backdrop-blur-sm h-8 w-8 p-0"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* **LINK WRAPPER** */}
      {!showActions && (
        <Link to={`/watch/${id}`} className="block h-full" />
      )}
    </Card>
  );
};