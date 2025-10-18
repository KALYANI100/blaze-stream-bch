import { Button } from "@/components/ui/button";
import { Play, Coins, TrendingUp, Shield } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powered by Bitcoin Cash</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Stream, Earn & Tip
            <br />
            <span className="text-primary">with Bitcoin Cash</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the decentralized video revolution. Support creators directly, unlock premium content, and earn BCH for your contributions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="hero" className="gap-2 text-lg px-8 animate-glow">
              <Play className="w-5 h-5" />
              Start Watching
            </Button>
            
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 border-primary/50 hover:bg-primary/10">
              <Coins className="w-5 h-5" />
              Connect Wallet
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-border/50">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Videos</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
                <TrendingUp className="w-6 h-6" />
                500K
              </div>
              <div className="text-sm text-muted-foreground">BCH Tipped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
