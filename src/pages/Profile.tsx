// // import { Header } from "@/components/Header";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { VideoCard } from "@/components/VideoCard";
// // import { 
// //   Settings, 
// //   Bell, 
// //   Coins, 
// //   Video, 
// //   Heart,
// //   Eye,
// //   ThumbsUp,
// //   Users
// // } from "lucide-react";

// // const Profile = () => {
// //   const userVideos = [
// //     {
// //       id: "1",
// //       thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80",
// //       title: "Building Decentralized Apps with Bitcoin Cash",
// //       creator: "CryptoDevHub",
// //       views: "125K",
// //       duration: "15:30",
// //       isPremium: true,
// //       price: "0.05"
// //     },
// //     {
// //       id: "5",
// //       thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
// //       title: "Cryptocurrency Trading Strategies 2025",
// //       creator: "CryptoDevHub",
// //       views: "156K",
// //       duration: "18:42",
// //       isPremium: true,
// //       price: "0.08"
// //     }
// //   ];

// //   const subscriptions = [
// //     { name: "BlockchainMusic", subscribers: "89K", avatar: "BM" },
// //     { name: "GamersUnited", subscribers: "234K", avatar: "GU" },
// //     { name: "TechEdu", subscribers: "45K", avatar: "TE" },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header />

// //       {/* Profile Header */}
// //       <div className="border-b border-border bg-card">
// //         <div className="container mx-auto px-4 py-8">
// //           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
// //             {/* Avatar */}
// //             <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-5xl font-bold text-primary">
// //               CD
// //             </div>

// //             {/* Info */}
// //             <div className="flex-1 space-y-4">
// //               <div>
// //                 <h1 className="text-3xl font-bold mb-2">CryptoDevHub</h1>
// //                 <p className="text-muted-foreground">Building the future of decentralized applications</p>
// //               </div>

// //               {/* Stats */}
// //               <div className="flex flex-wrap gap-6 text-sm">
// //                 <div className="flex items-center gap-2">
// //                   <Video className="w-4 h-4 text-primary" />
// //                   <span className="font-semibold">24</span>
// //                   <span className="text-muted-foreground">Videos</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Users className="w-4 h-4 text-primary" />
// //                   <span className="font-semibold">42.5K</span>
// //                   <span className="text-muted-foreground">Subscribers</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Eye className="w-4 h-4 text-primary" />
// //                   <span className="font-semibold">1.2M</span>
// //                   <span className="text-muted-foreground">Total Views</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <ThumbsUp className="w-4 h-4 text-primary" />
// //                   <span className="font-semibold">85K</span>
// //                   <span className="text-muted-foreground">Likes</span>
// //                 </div>
// //               </div>

// //               {/* Actions */}
// //               <div className="flex gap-2">
// //                 <Button variant="hero" className="gap-2">
// //                   <Bell className="w-4 h-4" />
// //                   Subscribe
// //                 </Button>
// //                 <Button variant="outline" className="gap-2">
// //                   <Coins className="w-4 h-4" />
// //                   Tip Creator
// //                 </Button>
// //                 <Button variant="outline" size="icon">
// //                   <Settings className="w-4 h-4" />
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* BCH Balance */}
// //             <Card className="p-4 bg-primary/10 border-primary/30 min-w-[200px]">
// //               <div className="text-sm text-muted-foreground mb-1">Your BCH Balance</div>
// //               <div className="text-2xl font-bold text-primary flex items-center gap-2">
// //                 <Coins className="w-6 h-6" />
// //                 1.45 BCH
// //               </div>
// //               <div className="text-xs text-muted-foreground mt-1">≈ $72.50 USD</div>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Content Tabs */}
// //       <div className="container mx-auto px-4 py-8">
// //         <Tabs defaultValue="videos" className="space-y-6">
// //           <TabsList className="bg-muted">
// //             <TabsTrigger value="videos">
// //               <Video className="w-4 h-4 mr-2" />
// //               Videos
// //             </TabsTrigger>
// //             <TabsTrigger value="subscriptions">
// //               <Users className="w-4 h-4 mr-2" />
// //               Subscriptions
// //             </TabsTrigger>
// //             <TabsTrigger value="liked">
// //               <Heart className="w-4 h-4 mr-2" />
// //               Liked Videos
// //             </TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="videos">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
// //               {userVideos.map((video) => (
// //                 <VideoCard key={video.id} {...video} />
// //               ))}
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="subscriptions">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {subscriptions.map((channel) => (
// //                 <Card key={channel.name} className="p-6 border-border hover:border-primary/50 transition-colors">
// //                   <div className="flex items-center gap-4 mb-4">
// //                     <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
// //                       {channel.avatar}
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold">{channel.name}</h3>
// //                       <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <Button variant="outline" size="sm" className="flex-1">
// //                       <Bell className="w-4 h-4 mr-2" />
// //                       Subscribed
// //                     </Button>
// //                   </div>
// //                 </Card>
// //               ))}
// //             </div>
// //           </TabsContent>

// //           <TabsContent value="liked">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
// //               {userVideos.map((video) => (
// //                 <VideoCard key={video.id} {...video} />
// //               ))}
// //             </div>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import { Header } from "@/components/Header";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { VideoCard } from "@/components/VideoCard";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Settings, 
//   Bell, 
//   Coins, 
//   Video, 
//   Heart,
//   Eye,
//   ThumbsUp,
//   Users,
//   Play,
//   Copy
// } from "lucide-react";

// const Profile = () => {
//   const userVideos = [
//     {
//       id: "1",
//       thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80",
//       title: "Building Decentralized Apps with Bitcoin Cash",
//       creator: "CryptoDevHub",
//       views: 125000,
//       likes: 8500,
//       duration: "15:30",
//       isPremium: true,
//       price: "0.05",
//       contractAddress: "bch1qxy2kgdygjrs8x8z2z3k4j5l6m7n8p9q0r1s2t3",
//       earnings: 2.845,
//       showContract: true,
//       showActions: true,
//     },
//     {
//       id: "5",
//       thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
//       title: "Cryptocurrency Trading Strategies 2025",
//       creator: "CryptoDevHub",
//       views: 156000,
//       likes: 12400,
//       duration: "18:42",
//       isPremium: true,
//       price: "0.08",
//       contractAddress: "bch1qabc123def456ghi789jkl012mno345pqr678stu",
//       earnings: 5.320,
//       showContract: true,
//       showActions: true,
//     }
//   ];

//   const likedVideos = [
//     // Reuse or add different videos
//     ...userVideos.map(v => ({ ...v, id: `liked-${v.id}` }))
//   ];

//   const subscriptions = [
//     { name: "BlockchainMusic", subscribers: "89K", avatar: "BM" },
//     { name: "GamersUnited", subscribers: "234K", avatar: "GU" },
//     { name: "TechEdu", subscribers: "45K", avatar: "TE" },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* Profile Header */}
//       <div className="border-b border-border bg-card">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             {/* Avatar */}
//             <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-5xl font-bold text-primary">
//               CD
//             </div>

//             {/* Info */}
//             <div className="flex-1 space-y-4">
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">CryptoDevHub</h1>
//                 <p className="text-muted-foreground">Building the future of decentralized applications</p>
//               </div>

//               {/* Stats */}
//               <div className="flex flex-wrap gap-6 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Video className="w-4 h-4 text-primary" />
//                   <span className="font-semibold">24</span>
//                   <span className="text-muted-foreground">Videos</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="w-4 h-4 text-primary" />
//                   <span className="font-semibold">42.5K</span>
//                   <span className="text-muted-foreground">Subscribers</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Eye className="w-4 h-4 text-primary" />
//                   <span className="font-semibold">1.2M</span>
//                   <span className="text-muted-foreground">Total Views</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <ThumbsUp className="w-4 h-4 text-primary" />
//                   <span className="font-semibold">85K</span>
//                   <span className="text-muted-foreground">Likes</span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-2">
//                 <Button variant="hero" className="gap-2">
//                   <Bell className="w-4 h-4" />
//                   Subscribe
//                 </Button>
//                 <Button variant="outline" className="gap-2">
//                   <Coins className="w-4 h-4" />
//                   Tip Creator
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <Settings className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* BCH Balance */}
//             <Card className="p-4 bg-primary/10 border-primary/30 min-w-[200px]">
//               <div className="text-sm text-muted-foreground mb-1">Your BCH Balance</div>
//               <div className="text-2xl font-bold text-primary flex items-center gap-2">
//                 <Coins className="w-6 h-6" />
//                 1.45 BCH
//               </div>
//               <div className="text-xs text-muted-foreground mt-1">≈ $72.50 USD</div>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Content Tabs */}
//       <div className="container mx-auto px-4 py-8">
//         <Tabs defaultValue="videos" className="space-y-6">
//           <TabsList className="bg-muted">
//             <TabsTrigger value="videos">
//               <Video className="w-4 h-4 mr-2" />
//               Videos
//             </TabsTrigger>
//             <TabsTrigger value="subscriptions">
//               <Users className="w-4 h-4 mr-2" />
//               Subscriptions
//             </TabsTrigger>
//             <TabsTrigger value="liked">
//               <Heart className="w-4 h-4 mr-2" />
//               Liked Videos
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="videos">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
//               {userVideos.map((video) => (
//                 <VideoCard key={video.id} {...video} />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="subscriptions">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {subscriptions.map((channel) => (
//                 <Card key={channel.name} className="p-6 border-border hover:border-primary/50 transition-colors">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
//                       {channel.avatar}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold">{channel.name}</h3>
//                       <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" className="flex-1">
//                       <Bell className="w-4 h-4 mr-2" />
//                       Subscribed
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="liked">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
//               {likedVideos.map((video) => (
//                 <VideoCard key={video.id} {...video} showContract={false} showActions={false} />
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// app/profile/page.tsx  (or components/Profile.tsx)
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/VideoCard";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, Bell, Coins, Video, Heart, Eye, ThumbsUp, Users, Play, Copy 
} from "lucide-react";

type Video = {
  id: string;
  title: string;
  thumbnailUrl?: string;
  viewCount: number;
  likeCount: number;
  duration?: number;
  isPremium: boolean;
  price?: number;
  contractAddress?: string;
  totalEarnings: number;
};

type Subscription = {
  id: string;
  tier: string;
  expiresAt: string;
  creator: { username: string; avatar?: string };
};

type ProfileData = {
  user: {
    username: string;
    avatar?: string;
    bio?: string;
    walletAddress: string;
    subscriberCount: number;
    totalEarnings: number;
    totalViews: number;
  };
  videos: Video[];
  subscriptions: Subscription[];
  likedVideos: Video[];
  stats: { videoCount: number; totalLikes: number };
};

export default function Profile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
     const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) {
      setError("Please log in");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((json) => {
        if (json.success) setData(json.data);
        else throw new Error(json.error);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <Header/>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-red-500">{error || "No profile data"}</div>
      </div>
    );
  }

  const { user, videos, subscriptions, likedVideos, stats } = data;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-5xl font-bold text-primary">
              {user.username.slice(0, 2).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                <p className="text-muted-foreground">{user.bio || "No bio yet"}</p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{stats.videoCount}</span>
                  <span className="text-muted-foreground">Videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{user.subscriberCount.toLocaleString()}</span>
                  <span className="text-muted-foreground">Subscribers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{user.totalViews}</span>
                  <span className="text-muted-foreground">Total Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{stats.totalLikes.toLocaleString()}</span>
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

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  thumbnail={video.thumbnailUrl || "/placeholder.jpg"}
                  title={video.title}
                  creator={user.username}
                  views={video.viewCount}
                  likes={video.likeCount}
                  duration={video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, "0")}` : "0:00"}
                  isPremium={video.isPremium}
                  price={video.price?.toString()}
                  contractAddress={video.contractAddress}
                  earnings={video.totalEarnings}
                  showContract={true}
                  showActions={true}
                />
              ))}
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="p-6 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                      {sub.creator.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{sub.creator.username}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sub.tier} • Expires {new Date(sub.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Subscribed
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Liked Videos Tab */}
          <TabsContent value="liked">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  thumbnail={video.thumbnailUrl || "/placeholder.jpg"}
                  title={video.title}
                  creator={user.username}
                  views={video.viewCount}
                  likes={video.likeCount}
                  duration={video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, "0")}` : "0:00"}
                  showContract={false}
                  showActions={false}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}