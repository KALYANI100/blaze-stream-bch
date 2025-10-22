// // import { Header } from "@/components/Header";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { VideoCard } from "@/components/VideoCard";
// // import { 
// //   Play, 
// //   ThumbsUp, 
// //   ThumbsDown, 
// //   Share2, 
// //   Coins, 
// //   Lock, 
// //   DollarSign,
// //   Bell,
// //   Send,
// //   Heart
// // } from "lucide-react";
// // import { useState } from "react";

// // const Watch = () => {
// //   const [isUnlocked, setIsUnlocked] = useState(false);
// //   const [tipAmount, setTipAmount] = useState("");

// //   const relatedVideos = [
// //     {
// //       id: "2",
// //       thumbnail: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&q=80",
// //       title: "Music NFTs: The Future of Digital Rights",
// //       creator: "BlockchainMusic",
// //       views: "89K",
// //       duration: "12:45"
// //     },
// //     {
// //       id: "3",
// //       thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80",
// //       title: "Live Gaming Tournament - Finals",
// //       creator: "GamersUnited",
// //       views: "234K",
// //       duration: "2:15:00",
// //       isPremium: true,
// //       price: "0.10"
// //     },
// //     {
// //       id: "4",
// //       thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=500&q=80",
// //       title: "Understanding Blockchain Technology",
// //       creator: "TechEdu",
// //       views: "45K",
// //       duration: "8:20"
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Header />

// //       <div className="container mx-auto px-4 py-6">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Main Video Section */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Video Player */}
// //             <Card className="overflow-hidden border-border bg-card">
// //               <div className="relative aspect-video bg-muted">
// //                 {!isUnlocked ? (
// //                   // Locked Premium Content
// //                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background/95 via-background/90 to-primary/10 backdrop-blur-sm">
// //                     <Lock className="w-20 h-20 text-primary mb-6 animate-pulse" />
// //                     <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
// //                     <p className="text-muted-foreground mb-6 text-center max-w-md">
// //                       Unlock this video with BCH to support the creator and enjoy exclusive content
// //                     </p>
// //                     <div className="flex flex-col sm:flex-row gap-4">
// //                       <Button 
// //                         size="lg" 
// //                         variant="hero" 
// //                         className="gap-2"
// //                         onClick={() => setIsUnlocked(true)}
// //                       >
// //                         <Coins className="w-5 h-5" />
// //                         Unlock for 0.05 BCH
// //                       </Button>
// //                       <Button size="lg" variant="outline" className="gap-2">
// //                         <DollarSign className="w-5 h-5" />
// //                         ≈ $2.50 USD
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   // Unlocked Video Player
// //                   <div className="absolute inset-0 flex items-center justify-center bg-black">
// //                     <Play className="w-20 h-20 text-white cursor-pointer hover:text-primary transition-colors" />
// //                   </div>
// //                 )}
// //               </div>
// //             </Card>

// //             {/* Video Info */}
// //             <div className="space-y-4">
// //               <div>
// //                 <h1 className="text-2xl md:text-3xl font-bold mb-2">
// //                   Building Decentralized Apps with Bitcoin Cash
// //                 </h1>
// //                 <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
// //                   <span>125K views</span>
// //                   <span>•</span>
// //                   <span>2 days ago</span>
// //                   <Badge variant="secondary" className="gap-1">
// //                     <Coins className="w-3 h-3" />
// //                     Premium
// //                   </Badge>
// //                 </div>
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex flex-wrap gap-2">
// //                 <Button variant="outline" size="sm" className="gap-2">
// //                   <ThumbsUp className="w-4 h-4" />
// //                   2.5K
// //                 </Button>
// //                 <Button variant="outline" size="sm" className="gap-2">
// //                   <ThumbsDown className="w-4 h-4" />
// //                 </Button>
// //                 <Button variant="outline" size="sm" className="gap-2">
// //                   <Share2 className="w-4 h-4" />
// //                   Share
// //                 </Button>
// //                 <Button variant="outline" size="sm" className="gap-2">
// //                   <Heart className="w-4 h-4" />
// //                   Save
// //                 </Button>
// //               </div>

// //               {/* Creator Info */}
// //               <Card className="p-4 bg-muted/50 border-border">
// //                 <div className="flex items-start justify-between gap-4">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
// //                       <span className="text-xl font-bold text-primary">CD</span>
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold">CryptoDevHub</h3>
// //                       <p className="text-sm text-muted-foreground">42.5K subscribers</p>
// //                     </div>
// //                   </div>
// //                   <Button variant="default" className="gap-2">
// //                     <Bell className="w-4 h-4" />
// //                     Subscribe
// //                   </Button>
// //                 </div>
// //                 <p className="mt-4 text-sm text-muted-foreground">
// //                   Learn how to build powerful decentralized applications using Bitcoin Cash. 
// //                   This comprehensive tutorial covers smart contracts, payment integration, and more.
// //                 </p>
// //               </Card>

// //               {/* Tip Creator */}
// //               <Card className="p-4 border-primary/30 bg-primary/5">
// //                 <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                   <Coins className="w-5 h-5 text-primary" />
// //                   Tip the Creator with BCH
// //                 </h3>
// //                 <div className="flex gap-2">
// //                   <Input 
// //                     type="number" 
// //                     placeholder="0.01"
// //                     value={tipAmount}
// //                     onChange={(e) => setTipAmount(e.target.value)}
// //                     className="bg-background"
// //                   />
// //                   <Button variant="hero" className="gap-2">
// //                     <Coins className="w-4 h-4" />
// //                     Tip
// //                   </Button>
// //                 </div>
// //                 <div className="flex gap-2 mt-2">
// //                   <Button size="sm" variant="outline" onClick={() => setTipAmount("0.01")}>
// //                     0.01 BCH
// //                   </Button>
// //                   <Button size="sm" variant="outline" onClick={() => setTipAmount("0.05")}>
// //                     0.05 BCH
// //                   </Button>
// //                   <Button size="sm" variant="outline" onClick={() => setTipAmount("0.10")}>
// //                     0.10 BCH
// //                   </Button>
// //                 </div>
// //               </Card>

// //               {/* Comments */}
// //               <Card className="p-4 border-border bg-card">
// //                 <h3 className="font-semibold mb-4">328 Comments</h3>
                
// //                 {/* Add Comment */}
// //                 <div className="flex gap-2 mb-6">
// //                   <Textarea 
// //                     placeholder="Share your thoughts..." 
// //                     className="min-h-[80px] bg-muted/50"
// //                   />
// //                   <Button variant="hero">
// //                     <Send className="w-4 h-4" />
// //                   </Button>
// //                 </div>

// //                 {/* Sample Comments */}
// //                 <div className="space-y-4">
// //                   {[1, 2, 3].map((i) => (
// //                     <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0">
// //                       <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
// //                         <span className="font-bold">U{i}</span>
// //                       </div>
// //                       <div className="flex-1 space-y-1">
// //                         <div className="flex items-center gap-2">
// //                           <span className="font-semibold text-sm">User{i}</span>
// //                           <span className="text-xs text-muted-foreground">2 hours ago</span>
// //                         </div>
// //                         <p className="text-sm">Great tutorial! This really helped me understand BCH development.</p>
// //                         <div className="flex items-center gap-4 text-xs text-muted-foreground">
// //                           <button className="hover:text-primary flex items-center gap-1">
// //                             <ThumbsUp className="w-3 h-3" />
// //                             45
// //                           </button>
// //                           <button className="hover:text-primary">Reply</button>
// //                           <button className="hover:text-primary flex items-center gap-1">
// //                             <Coins className="w-3 h-3" />
// //                             Tip
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </Card>
// //             </div>
// //           </div>

// //           {/* Sidebar - Related Videos */}
// //           <div className="space-y-4">
// //             <h3 className="font-semibold text-lg">Related Videos</h3>
// //             {relatedVideos.map((video) => (
// //               <VideoCard key={video.id} {...video} />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Watch;

// import { Header } from "@/components/Header";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { VideoCard } from "@/components/VideoCard";
// import { 
//   Play, 
//   ThumbsUp, 
//   ThumbsDown, 
//   Share2, 
//   Coins, 
//   Lock, 
//   DollarSign,
//   Bell,
//   Send,
//   Heart
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// // **TYPES - FULLY TYPED**
// interface WalletData {
//   address: string;
//   privateKey: string;
//   publicKey: string;
//   privateKeyHex: string;
//   createdAt: string;
//   encrypted: boolean;
//   passwordHash: string;
// }

// interface Video {
//   id: string;
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnail: string;
//   views: number;
//   publishedAt: string;
//   price?: number;
//   usdPrice?: number;
//   isPremium: boolean;
//   userCanAccess: boolean;
//   likes: number;
//   creator: {
//     id: string;
//     username: string;
//     subscriberCount: number;
//     walletAddress: string;
//   };
//   comments: Comment[];
// }

// interface Comment {
//   id: string;
//   content: string;
//   author: {
//     username: string;
//   };
//   likes: number;
//   createdAt: string;
// }

// interface RelatedVideo {
//   id: string;
//   title: string;
//   thumbnail: string;
//   creator: string;
//   views: number;
//   duration: string;
//   isPremium?: boolean;
//   price?: string;
//   likes: number;
// }

// // **WATCH COMPONENT**
// const Watch = () => {
//   const [video, setVideo] = useState<Video | null>(null);
//   const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [tipAmount, setTipAmount] = useState("");
//   const [newComment, setNewComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [loadingPayment, setLoadingPayment] = useState(false);

//   // **ROUTER**
//   const searchParams = useSearchParams();
//   const videoId = searchParams.get("id");
//   const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

//   // **HASH FUNCTION**
//   const simpleHash = async (input: string): Promise<string> => {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(input);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", data);
//     return Array.from(new Uint8Array(hashBuffer))
//       .map((b) => b.toString(16).padStart(2, "0"))
//       .join("");
//   };

//   // **FETCH VIDEO**
//   const fetchVideo = async () => {
//     if (!videoId || !token) return;

//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:3001/api/videos/watch/${videoId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data: { success: boolean; video: Video; relatedVideos?: RelatedVideo[] } = await response.json();

//       if (data.success) {
//         setVideo(data.video);
//         setRelatedVideos(
//           (data.relatedVideos || []).map((v) => ({
//             ...v,
//             views: Number(v.views) || 0,
//             likes: Number(v.likes) || 0,
//           }))
//         );
//         setComments(data.video.comments || []);
//       }
//     } catch (error) {
//       console.error("Fetch video error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **WALLET UTILS**
//   const WalletUtils = {
//     getWalletDirectory: async (): Promise<FileSystemDirectoryHandle> => {
//       if (localStorage.getItem("walletDirectoryHandle") !== "selected") {
//         throw new Error("Wallet directory not selected. Please complete user setup.");
//       }
//       return await window.showDirectoryPicker();
//     },

//     findWalletFile: async (
//   directoryHandle: FileSystemDirectoryHandle,
//   address: string
// ): Promise<WalletData> => {
//   // Assume wallet filename is <address>.bch.wallet.json
//   const fileName = `${address}.bch.wallet.json`;

//   try {
//     const fileHandle = await directoryHandle.getFileHandle(fileName);
//     const file = await fileHandle.getFile();
//     const content = await file.text();
//     const walletData: WalletData = JSON.parse(content);

//     console.log("✅ Wallet file found:", fileHandle.name);
//     return walletData;
//   } catch {
//     throw new Error(`Wallet file not found for address: ${address}`);
//   }
// },


//     verifyPassword: async (walletData: WalletData, password: string): Promise<boolean> => {
//       const computedHash = await simpleHash(password);
//       return computedHash === walletData.passwordHash;
//     },

//     send: async (toAddress: string, amount: number, connectedAddress: string): Promise<string> => {
//       const directoryHandle = await WalletUtils.getWalletDirectory();
//       const walletData = await WalletUtils.findWalletFile(directoryHandle, connectedAddress);

//       const password = prompt("🔐 Enter your wallet password:");
//       if (!password) throw new Error("Payment cancelled");

//       const isValid = await WalletUtils.verifyPassword(walletData, password);
//       if (!isValid) throw new Error("❌ Incorrect password");

//       const privateKeyWIF = walletData.privateKey;
//       console.log("🔓 Private key ready:", privateKeyWIF.slice(0, 10) + "...");

//       const txHash = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       console.log("✅ Transaction created:", txHash);
//       return txHash;
//     },
//   };

//   // **EFFECT**
//   useEffect(() => {
//     if (videoId && token) {
//       fetchVideo();
//     }
//   }, [videoId, token]);

//   // HANDLE UNLOCK, TIP, LIKE, COMMENT remain unchanged...

//   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   if (!videoId) return <div className="min-h-screen flex items-center justify-center">Video not found</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       {/* ...rest of your JSX */}
//     </div>
//   );
// };

// export default Watch;

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VideoCard } from "@/components/VideoCard";
import { 
  Play, 
  ThumbsUp, 
  Share2, 
  Coins, 
  Lock, 
  DollarSign,
  Bell,
  Send,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// **TYPES**
interface WalletData {
  address: string;
  privateKey: string;
  publicKey: string;
  privateKeyHex: string;
  createdAt: string;
  encrypted: boolean;
  passwordHash: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  views: number;
  publishedAt: string;
  price?: number;
  usdPrice?: number;
  isPremium: boolean;
  userCanAccess: boolean;
  likes: number;
  creator: {
    id: string;
    username: string;
    subscriberCount: number;
    walletAddress: string;
  };
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
  };
  likes: number;
  createdAt: string;
}

interface RelatedVideo {
  id: string;
  title: string;
  thumbnail: string;
  creator: string;
  views: number;
  duration: string;
  isPremium?: boolean;
  price?: string;
  likes: number;
}

const Watch = () => {
  let { id: videoId } = useParams<{ id: string }>();
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tipAmount, setTipAmount] = useState("");
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  // **HASH FUNCTION**
  const simpleHash = async (input: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // **FETCH VIDEO**
  const fetchVideo = async () => {
    if (!videoId || !token) return;
if (videoId.startsWith('id=')) videoId = videoId.slice(3);
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/videos/watch/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setVideo(data.video);
        setRelatedVideos(
          (data.relatedVideos || []).map((v) => ({
            ...v,
            views: Number(v.views) || 0,
            likes: Number(v.likes) || 0,
          }))
        );
        setComments(data.video.comments || []);
      }
    } catch (error) {
      console.error("Fetch video error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId && token) fetchVideo();
  }, [videoId, token]);

  // ------------------- inside Watch component -------------------

// HANDLE UNLOCK VIDEO
const handleUnlock = async () => {
  if (!videoId || !token) return;
  if (videoId.startsWith('id=')) videoId = videoId.slice(3);
  setLoadingPayment(true);
  try {
    const res = await fetch(`http://localhost:3001/api/videos/${videoId}/purchase`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      alert("✅ Video unlocked successfully!");
      setVideo((prev) => prev ? { ...prev, userCanAccess: true } : prev);
    } else {
      alert("❌ " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Unlock failed");
  } finally {
    setLoadingPayment(false);
  }
};

// HANDLE TIP CREATOR
const handleTip = async () => {
  if (!videoId || !token || !tipAmount) return;
  if (videoId.startsWith('id=')) videoId = videoId.slice(3);
  setLoadingPayment(true);
  try {
    const res = await fetch(`http://localhost:3001/api/videos/${videoId}/tip`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseFloat(tipAmount) }),
    });
    const data = await res.json();
    if (data.success) {
      alert(`💰 Tip sent: ${tipAmount} BCH`);
      setTipAmount("");
    } else {
      alert("❌ " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Tip failed");
  } finally {
    setLoadingPayment(false);
  }
};

// HANDLE ADD COMMENT
const handleAddComment = async () => {
  if (!videoId || !token || !newComment) return;
  if (videoId.startsWith('id=')) videoId = videoId.slice(3);
  try {
    const res = await fetch(`http://localhost:3001/api/videos/${videoId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newComment }),
    });
    const data = await res.json();
    if (data.success) {
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
    } else {
      alert("❌ " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Comment failed");
  }
};

// HANDLE LIKE VIDEO
const handleLike = async () => {
  if (!videoId || !token) return;
  console.log(videoId);
  if (videoId.startsWith('id=')) videoId = videoId.slice(3);
  try {
    const res = await fetch(`http://localhost:3001/api/videos/${videoId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setVideo((prev) => prev ? { ...prev, likes: prev.likes + 1 } : prev);
    } else {
      alert("❌ " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Like failed");
  }
};


  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!video) return <div className="min-h-screen flex items-center justify-center">Video not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN VIDEO */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                {!video.userCanAccess && video.isPremium ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background/95 to-primary/10">
                    <Lock className="w-20 h-20 text-primary mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-6 text-center">Unlock with BCH</p>
                    <Button onClick={handleUnlock} disabled={loadingPayment} className="gap-2">
                      <Coins className="w-5 h-5" />
                      Unlock for {video.price || 0} BCH
                    </Button>
                  </div>
                ) : (
                  <video src={video.videoUrl} controls className="w-full h-full" />
                )}
              </div>
            </Card>

            {/* VIDEO INFO */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.publishedAt}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleLike}>
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {video.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" /> Share
                </Button>
              </div>

              {/* CREATOR */}
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {video.creator.username.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{video.creator.username}</h3>
                    <p className="text-sm text-muted-foreground">{video.creator.subscriberCount} subscribers</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{video.description}</p>
              </Card>

              {/* TIP */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Tip Creator</h3>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    placeholder="0.01"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                  />
                  <Button onClick={handleTip} disabled={!tipAmount}>
                    <Coins className="w-4 h-4 mr-1" />
                    Tip
                  </Button>
                </div>
              </Card>

              {/* COMMENTS */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">{comments.length} Comments</h3>
                <div className="flex gap-2 mb-4">
                  <Textarea 
                    placeholder="Add comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="font-bold text-sm">
                          {comment.author.username[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{comment.author.username}</p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">
            <h3 className="font-semibold">Related Videos</h3>
            {relatedVideos.map((v) => (
              <VideoCard 
                key={v.id} 
                id={v.id}
                title={v.title}
                thumbnail={v.thumbnail}
                creator={v.creator}
                views={v.views}
                duration={v.duration}
                isPremium={v.isPremium}
                price={v.price}
                likes={v.likes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
