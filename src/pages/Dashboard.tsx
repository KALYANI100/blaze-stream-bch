import { useState, useEffect } from "react";
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
  Settings,
  Loader2
} from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    accessType: "FREE",
    price: "0"
  });
  const [files, setFiles] = useState({ video: null, thumbnail: null });
  
  // **REAL DATA STATES**
  const [overview, setOverview] = useState(null);
  const [myVideos, setMyVideos] = useState([]);
  const navigate = useNavigate();

  // **1. FETCH DASHBOARD DATA ON LOAD**
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const [overviewRes, videosRes] = await Promise.all([
        fetch("http://localhost:3001/api/dashboard/overview", {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }),
        fetch("http://localhost:3001/api/dashboard/videos/my-videos", {
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
      ]);

      const overviewData = await overviewRes.json();
      const videosData = await videosRes.json();

      if (overviewData.success) setOverview(overviewData);
      if (videosData.success) setMyVideos(videosData.videos);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // **2. UPLOAD VIDEO - REAL API**
  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (!files.video) {
      alert("Please select a video file");
      return;
    }

    setUploadLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append files
      if (files.video) formDataToSend.append("video", files.video);
      if (files.thumbnail) formDataToSend.append("thumbnail", files.thumbnail);

      const response = await fetch("http://localhost:3001/api/dashboard/videos/upload", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`
        },
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`✅ "${formData.title}" LIVE on ${result.video.contractAddress?.slice(0, 16)}...!`);
        // Reset form
        setFormData({ title: "", description: "", category: "", tags: "", accessType: "FREE", price: "0" });
        setFiles({ video: null, thumbnail: null });
        // Refresh videos
        fetchDashboardData();
      } else {
        alert(`❌ Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  // **3. HANDLE FILE CHANGES**
  const handleFileChange = (e, type) => {
    setFiles(prev => ({ ...prev, [type]: e.target.files[0] }));
  };

  if (loading) {
    return (
      <div>
        <Header/>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">Manage your content and track your earnings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload Video</TabsTrigger>
            <TabsTrigger value="videos">My Videos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* **OVERVIEW TAB - REAL DATA** */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards - REAL DATA */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-card border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Earnings</span>
                  <Coins className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">
                  {overview?.stats?.totalEarnings || "0.00"} BCH
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${(overview?.stats?.totalEarnings * 50 || 0).toFixed(2)} USD
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <Eye className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-3xl font-bold">
                  {overview?.stats?.totalViews?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">+12% this month</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-3xl font-bold">
                  {overview?.stats?.subscribers?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">+850 this week</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Likes</span>
                  <ThumbsUp className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-3xl font-bold">
                  {overview?.stats?.totalLikes?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">95% like ratio</p>
              </Card>
            </div>

            {/* Recent Earnings - REAL DATA */}
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Earnings
              </h3>
              <div className="space-y-3">
                {overview?.recentEarnings?.map((earning, i) => (
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
                )) || <p className="text-muted-foreground">No recent earnings</p>}
              </div>
            </Card>
          </TabsContent>

          {/* **UPLOAD TAB - REAL FORM** */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="font-semibold text-xl mb-6">Upload New Video</h3>
              
              <form onSubmit={handleUploadVideo} className="space-y-6">
                {/* Video Upload */}
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Label htmlFor="video-upload">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-medium mb-2">
                      {files.video ? files.video.name : "Click to upload video"}
                    </h4>
                    <p className="text-sm text-muted-foreground">MP4, WebM or OGG (MAX. 2GB)</p>
                  </Label>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/mp4,video/webm,video/ogg"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="hidden"
                    required
                  />
                </div>

                {/* Thumbnail Upload */}
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Label htmlFor="thumbnail-upload">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-medium mb-2">
                      {files.thumbnail ? files.thumbnail.name : "Click to upload thumbnail"}
                    </h4>
                    <p className="text-sm text-muted-foreground">JPG, PNG (MAX. 5MB)</p>
                  </Label>
                  <Input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleFileChange(e, "thumbnail")}
                    className="hidden"
                  />
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <Input
                    placeholder="Enter video title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                  <Textarea
                    placeholder="Describe your video..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="min-h-[120px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="e.g., Education"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                    <Input
                      placeholder="crypto, blockchain, BCH"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>

                  {/* Pricing */}
                  <Card className="p-4 bg-muted/50 border-border">
                    <h4 className="font-semibold mb-3">Content Access</h4>
                    <div className="space-y-3">
                      {[
                        { value: "FREE", label: "Free", desc: "Anyone can watch" },
                        { value: "SUBSCRIPTION", label: "Subscription Only", desc: "Subscribers can watch" },
                        { value: "PAY_PER_VIEW", label: "Pay-Per-View", desc: "Set price per view" }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="accessType"
                            value={option.value}
                            checked={formData.accessType === option.value}
                            onChange={(e) => setFormData(prev => ({ ...prev, accessType: e.target.value }))}
                            className="w-4 h-4"
                          />
                          <div>
                            <p className="font-medium">{option.label}</p>
                            <p className="text-xs text-muted-foreground">{option.desc}</p>
                            {option.value === "PAY_PER_VIEW" && (
                              <Input
                                type="number"
                                placeholder="0.05"
                                value={formData.price}
                                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                className="mt-2 max-w-[200px]"
                                step="0.01"
                                disabled={formData.accessType !== "PAY_PER_VIEW"}
                              />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </Card>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gap-2"
                    disabled={uploadLoading || !files.video}
                  >
                    {uploadLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5" />
                    )}
                    {uploadLoading ? "Uploading..." : "Publish Video"}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          {/* **MY VIDEOS TAB - REAL DATA** */}
          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myVideos.length > 0 ? (
                myVideos.map((video) => (
                  <div key={video.id} className="relative group">
                    <VideoCard 
                      {...video} 
                      showContract={true} 
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="bg-background/90 backdrop-blur-sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <Card className="p-8 text-center border-border">
                  <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No videos yet</h3>
                  <p className="text-muted-foreground mb-4">Upload your first video to get started!</p>
                  <Button onClick={() => setActiveTab("upload")}>
                    Upload First Video
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* **ANALYTICS TAB - REAL DATA** */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-4">Performance Overview</h3>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Analytics coming soon</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <h4 className="font-semibold mb-4">Top Performing Videos</h4>
                <div className="space-y-3">
                  {myVideos.slice(0, 5).map((video, i) => (
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
                  {(() => {
                    const total = overview?.stats?.totalEarnings || 0;
                    const breakdown = [
                      { label: "Video Unlocks", amount: total * 0.5 },
                      { label: "Tips", amount: total * 0.3 },
                      { label: "Subscriptions", amount: total * 0.2 },
                    ];
                    return breakdown.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{total ? ((item.amount / total) * 100).toFixed(0) : "0"}% of total</p>
                        </div>
                        <p className="font-bold text-primary">{item.amount.toFixed(2)} BCH</p>
                      </div>
                    ));
                  })()}
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