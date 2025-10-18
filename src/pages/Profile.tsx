import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/VideoCard";
import { 
  Settings, 
  Bell, 
  Coins, 
  Video, 
  Heart,
  Eye,
  ThumbsUp,
  Users
} from "lucide-react";

const Profile = () => {
  const userVideos = [
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
      id: "5",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
      title: "Cryptocurrency Trading Strategies 2025",
      creator: "CryptoDevHub",
      views: "156K",
      duration: "18:42",
      isPremium: true,
      price: "0.08"
    }
  ];

  const subscriptions = [
    { name: "BlockchainMusic", subscribers: "89K", avatar: "BM" },
    { name: "GamersUnited", subscribers: "234K", avatar: "GU" },
    { name: "TechEdu", subscribers: "45K", avatar: "TE" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-5xl font-bold text-primary">
              CD
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">CryptoDevHub</h1>
                <p className="text-muted-foreground">Building the future of decentralized applications</p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary" />
                  <span className="font-semibold">24</span>
                  <span className="text-muted-foreground">Videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold">42.5K</span>
                  <span className="text-muted-foreground">Subscribers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="font-semibold">1.2M</span>
                  <span className="text-muted-foreground">Total Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary" />
                  <span className="font-semibold">85K</span>
                  <span className="text-muted-foreground">Likes</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="hero" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Subscribe
                </Button>
                <Button variant="outline" className="gap-2">
                  <Coins className="w-4 h-4" />
                  Tip Creator
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* BCH Balance */}
            <Card className="p-4 bg-primary/10 border-primary/30 min-w-[200px]">
              <div className="text-sm text-muted-foreground mb-1">Your BCH Balance</div>
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <Coins className="w-6 h-6" />
                1.45 BCH
              </div>
              <div className="text-xs text-muted-foreground mt-1">≈ $72.50 USD</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="subscriptions">
              <Users className="w-4 h-4 mr-2" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="liked">
              <Heart className="w-4 h-4 mr-2" />
              Liked Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {userVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptions.map((channel) => (
                <Card key={channel.name} className="p-6 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                      {channel.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold">{channel.name}</h3>
                      <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Bell className="w-4 h-4 mr-2" />
                      Subscribed
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {userVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
