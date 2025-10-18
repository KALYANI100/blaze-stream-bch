import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Coins, 
  Eye, 
  ThumbsUp, 
  TrendingUp,
  Video,
  DollarSign,
  Users,
  Settings
} from "lucide-react";
import { VideoCard } from "@/components/VideoCard";

const Dashboard = () => {
  const myVideos = [
    {
      id: "1",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80",
      title: "Building Decentralized Apps with Bitcoin Cash",
      creator: "You",
      views: "125K",
      duration: "15:30",
      isPremium: true,
      price: "0.05"
    },
    {
      id: "5",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
      title: "Cryptocurrency Trading Strategies 2025",
      creator: "You",
      views: "156K",
      duration: "18:42",
      isPremium: true,
      price: "0.08"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">Manage your content and track your earnings</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload Video</TabsTrigger>
            <TabsTrigger value="videos">My Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-card border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Earnings</span>
                  <Coins className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">2.45 BCH</div>
                <p className="text-xs text-muted-foreground mt-1">≈ $122.50 USD</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <Eye className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">281K</div>
                <p className="text-xs text-muted-foreground mt-1">+12% this month</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-3xl font-bold">42.5K</div>
                <p className="text-xs text-muted-foreground mt-1">+850 this week</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Likes</span>
                  <ThumbsUp className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-3xl font-bold">18.2K</div>
                <p className="text-xs text-muted-foreground mt-1">95% like ratio</p>
              </Card>
            </div>

            {/* Recent Earnings */}
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Earnings
              </h3>
              <div className="space-y-3">
                {[
                  { user: "User123", amount: "0.05", type: "Video Unlock", time: "2 mins ago" },
                  { user: "CryptoFan", amount: "0.10", type: "Tip", time: "15 mins ago" },
                  { user: "BCHLover", amount: "0.03", type: "Subscription", time: "1 hour ago" },
                  { user: "DevPro", amount: "0.05", type: "Video Unlock", time: "3 hours ago" },
                ].map((earning, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Coins className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{earning.user}</p>
                        <p className="text-xs text-muted-foreground">{earning.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">+{earning.amount} BCH</p>
                      <p className="text-xs text-muted-foreground">{earning.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Upload Video Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="font-semibold text-xl mb-6">Upload New Video</h3>
              
              <div className="space-y-6">
                {/* Video Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="font-medium mb-2">Click to upload or drag and drop</h4>
                  <p className="text-sm text-muted-foreground">MP4, WebM or OGG (MAX. 2GB)</p>
                </div>

                {/* Video Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter video title" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your video..." 
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" placeholder="e.g., Education" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input id="tags" placeholder="crypto, blockchain, BCH" className="mt-2" />
                    </div>
                  </div>

                  {/* Pricing Options */}
                  <Card className="p-4 bg-muted/50 border-border">
                    <h4 className="font-semibold mb-3">Content Access</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="access" defaultChecked className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Free</p>
                          <p className="text-xs text-muted-foreground">Anyone can watch</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="access" className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Subscription Only</p>
                          <p className="text-xs text-muted-foreground">Subscribers can watch</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="access" className="w-4 h-4" />
                        <div className="flex-1">
                          <p className="font-medium">Pay-Per-View</p>
                          <Input 
                            type="number" 
                            placeholder="0.05" 
                            className="mt-2 max-w-[200px]" 
                            step="0.01"
                          />
                        </div>
                      </label>
                    </div>
                  </Card>

                  <Button size="lg" variant="hero" className="w-full gap-2">
                    <Upload className="w-5 h-5" />
                    Publish Video
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* My Videos Tab */}
          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myVideos.map((video) => (
                <div key={video.id} className="relative group">
                  <VideoCard {...video} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="bg-background/90 backdrop-blur-sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-4">Performance Overview</h3>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Analytics chart placeholder</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <h4 className="font-semibold mb-4">Top Performing Videos</h4>
                <div className="space-y-3">
                  {myVideos.map((video, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="text-xl font-bold text-primary">#{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{video.title}</p>
                        <p className="text-sm text-muted-foreground">{video.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h4 className="font-semibold mb-4">Revenue Breakdown</h4>
                <div className="space-y-3">
                  {[
                    { label: "Video Unlocks", amount: "1.25", percentage: "51%" },
                    { label: "Tips", amount: "0.85", percentage: "35%" },
                    { label: "Subscriptions", amount: "0.35", percentage: "14%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.percentage} of total</p>
                      </div>
                      <p className="font-bold text-primary">{item.amount} BCH</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
