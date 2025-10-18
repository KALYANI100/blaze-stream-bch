import { Header } from "@/components/Header";
import { CategoryBar } from "@/components/CategoryBar";
import { VideoCard } from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Flame, 
  Crown,
  Sparkles,
  Award
} from "lucide-react";

const Explore = () => {
  const trendingVideos = [
    {
      id: "1",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80",
      title: "Building Decentralized Apps with Bitcoin Cash",
      creator: "CryptoDevHub",
      views: "125K",
      duration: "15:30",
      isPremium: true,
      price: "0.05"
    },
    {
      id: "2",
      thumbnail: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&q=80",
      title: "Music NFTs: The Future of Digital Rights",
      creator: "BlockchainMusic",
      views: "89K",
      duration: "12:45"
    },
    {
      id: "3",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80",
      title: "Live Gaming Tournament - Finals",
      creator: "GamersUnited",
      views: "234K",
      duration: "2:15:00",
      isPremium: true,
      price: "0.10"
    },
    {
      id: "4",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=500&q=80",
      title: "Understanding Blockchain Technology",
      creator: "TechEdu",
      views: "45K",
      duration: "8:20"
    },
  ];

  const topCreators = [
    { name: "CryptoDevHub", subscribers: "42.5K", earnings: "12.5", avatar: "CD" },
    { name: "BlockchainMusic", subscribers: "89.2K", earnings: "28.3", avatar: "BM" },
    { name: "GamersUnited", subscribers: "234K", earnings: "45.8", avatar: "GU" },
    { name: "TechEdu", subscribers: "156K", earnings: "32.1", avatar: "TE" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryBar />

      <div className="container mx-auto px-4 py-8">
        {/* Featured Banner */}
        <Card className="mb-8 overflow-hidden border-primary/30 bg-gradient-to-r from-primary/20 via-card to-secondary/20">
          <div className="p-8 md:p-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Discover Amazing Content
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Explore trending videos, support creators with BCH, and unlock premium content from the best creators in the ecosystem.
            </p>
            <Button variant="hero" size="lg" className="gap-2">
              <TrendingUp className="w-5 h-5" />
              Browse Trending
            </Button>
          </div>
        </Card>

        {/* Hot & Trending Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-bold">Hot & Trending</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </section>

        {/* Top Creators Leaderboard */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Top Creators</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCreators.map((creator, index) => (
              <Card 
                key={creator.name} 
                className={`p-6 border-border hover:border-primary/50 transition-all duration-300 ${
                  index === 0 ? 'border-primary/50 bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                      {creator.avatar}
                    </div>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Crown className="w-3 h-3 text-background" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      #{index + 1} {creator.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{creator.subscribers} subscribers</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Earnings</span>
                    <span className="font-bold text-primary">{creator.earnings} BCH</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Choice */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-bold">Community Choice</h2>
            <Badge variant="secondary">Voted by Users</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {trendingVideos.slice(0, 4).map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
