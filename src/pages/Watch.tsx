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
//   Share2, 
//   Coins, 
//   Lock, 
//   DollarSign,
//   Bell,
//   Send,
//   Heart
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// // **TYPES**
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

// const Watch = () => {
//   let { id: videoId } = useParams<{ id: string }>();
//   const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

//   const [video, setVideo] = useState<Video | null>(null);
//   const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [tipAmount, setTipAmount] = useState("");
//   const [newComment, setNewComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [loadingPayment, setLoadingPayment] = useState(false);

//   // **HASH FUNCTION**
//   const simpleHash = async (input: string) => {
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
// if (videoId.startsWith('id=')) videoId = videoId.slice(3);
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:3001/api/videos/watch/${videoId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
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

//   useEffect(() => {
//     if (videoId && token) fetchVideo();
//   }, [videoId, token]);

//   // ------------------- inside Watch component -------------------

//   const recordView = async () => {
//   if (!videoId) return;
//   if (videoId.startsWith('id=')) videoId = videoId.slice(3);

//   try {
//     const ip = ""; // optional: get IP if needed
//     const userAgent = navigator.userAgent;

//     const res = await fetch(`http://localhost:3001/api/videos/${videoId}/view`, {
//       method: "POST",
//       headers: {
//         Authorization: token ? `Bearer ${token}` : "",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userAgent,
//         ipAddress: ip
//       }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       // update frontend view count
//       setVideo((prev) => prev ? { ...prev, views: prev.views + 1 } : prev);
//     }
//   } catch (err) {
//     console.error("Error recording view:", err);
//   }
// };

// useEffect(() => {
//   if (videoId) {
//     recordView();
//   }
// }, [videoId]);

// // HANDLE UNLOCK VIDEO
// const handleUnlock = async () => {
//   if (!videoId || !token) return;
//   if (videoId.startsWith('id=')) videoId = videoId.slice(3);
//   setLoadingPayment(true);
//   try {
//     const res = await fetch(`http://localhost:3001/api/videos/${videoId}/purchase`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await res.json();
//     if (data.success) {
//       alert("✅ Video unlocked successfully!");
//       setVideo((prev) => prev ? { ...prev, userCanAccess: true } : prev);
//     } else {
//       alert("❌ " + data.error);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("❌ Unlock failed");
//   } finally {
//     setLoadingPayment(false);
//   }
// };

// // HANDLE TIP CREATOR
// const handleTip = async () => {
//   if (!videoId || !token || !tipAmount) return;
//   if (videoId.startsWith('id=')) videoId = videoId.slice(3);
//   setLoadingPayment(true);
//   try {
//     const res = await fetch(`http://localhost:3001/api/videos/${videoId}/tip`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount: parseFloat(tipAmount) }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       alert(`💰 Tip sent: ${tipAmount} BCH`);
//       setTipAmount("");
//     } else {
//       alert("❌ " + data.error);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("❌ Tip failed");
//   } finally {
//     setLoadingPayment(false);
//   }
// };

// // HANDLE ADD COMMENT
// const handleAddComment = async () => {
//   if (!videoId || !token || !newComment) return;
//   if (videoId.startsWith('id=')) videoId = videoId.slice(3);
//   try {
//     const res = await fetch(`http://localhost:3001/api/videos/${videoId}/comment`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ content: newComment }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       setComments((prev) => [...prev, data.comment]);
//       setNewComment("");
//     } else {
//       alert("❌ " + data.error);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("❌ Comment failed");
//   }
// };

// // HANDLE LIKE VIDEO
// const handleLike = async () => {
//   if (!videoId || !token) return;
//   console.log(videoId);
//   if (videoId.startsWith('id=')) videoId = videoId.slice(3);
//   try {
//     const res = await fetch(`http://localhost:3001/api/videos/${videoId}/like`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await res.json();
//     if (data.success) {
//       setVideo((prev) => prev ? { ...prev, likes: prev.likes + 1 } : prev);
//     } else {
//       alert("❌ " + data.error);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("❌ Like failed");
//   }
// };


//   if (loading) return<div>
//     <Header />
//     <div className="flex flex-col items-center gap-4 mt-250">
//       {/* Spinner */}
//       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mt-250"></div>
//       <p className="text-muted-foreground">Loading video...</p>
//     </div>
//   </div>;
//   if (!video) return <div className="min-h-screen flex items-center justify-center">Video not found</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* MAIN VIDEO */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card className="overflow-hidden">
//               <div className="relative aspect-video bg-muted">
//                 {!video.userCanAccess && video.isPremium ? (
//                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background/95 to-primary/10">
//                     <Lock className="w-20 h-20 text-primary mb-6" />
//                     <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
//                     <p className="text-muted-foreground mb-6 text-center">Unlock with BCH</p>
//                     <Button onClick={handleUnlock} disabled={loadingPayment} className="gap-2">
//                       <Coins className="w-5 h-5" />
//                       Unlock for {video.price || 0} BCH
//                     </Button>
//                   </div>
//                 ) : (
//                   <video src={video.videoUrl} controls className="w-full h-full" />
//                 )}
//               </div>
//             </Card>

//             {/* VIDEO INFO */}
//             <div className="space-y-4">
//               <h1 className="text-2xl font-bold">{video.title}</h1>
//               <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                 <span>{video.views} views</span>
//                 <span>•</span>
//                 <span>{video.publishedAt}</span>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" onClick={handleLike}>
//                   <ThumbsUp className="w-4 h-4 mr-1" />
//                   {video.likes}
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Share2 className="w-4 h-4 mr-1" /> Share
//                 </Button>
//               </div>

//               {/* CREATOR */}
//               <Card className="p-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                   
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">{video.creator.username}</h3>
//                     <p className="text-sm text-muted-foreground">{video.creator.subscriberCount} subscribers</p>
//                   </div>
//                 </div>
//                 <p className="mt-4 text-sm text-muted-foreground">{video.description}</p>
//               </Card>

//               {/* TIP */}
//               <Card className="p-4">
//                 <h3 className="font-semibold mb-3">Tip Creator</h3>
//                 <div className="flex gap-2">
//                   <Input 
//                     type="number" 
//                     placeholder="0.01"
//                     value={tipAmount}
//                     onChange={(e) => setTipAmount(e.target.value)}
//                   />
//                   <Button onClick={handleTip} disabled={!tipAmount}>
//                     <Coins className="w-4 h-4 mr-1" />
//                     Tip
//                   </Button>
//                 </div>
//               </Card>

//               {/* COMMENTS */}
//               <Card className="p-4">
//                 <h3 className="font-semibold mb-4">{comments.length} Comments</h3>
//                 <div className="flex gap-2 mb-4">
//                   <Textarea 
//                     placeholder="Add comment..."
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                   />
//                   <Button onClick={handleAddComment} disabled={!newComment.trim()}>
//                     <Send className="w-4 h-4" />
//                   </Button>
//                 </div>
//                 <div className="space-y-4">
//                   {comments.map((comment) => (
//                     <div key={comment.id} className="flex gap-3">
//                       <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
//                         <span className="font-bold text-sm">
//                           {comment.author.username[0].toUpperCase()}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="font-semibold">{comment.author.username}</p>
//                         <p>{comment.content}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             </div>
//           </div>

//           {/* SIDEBAR */}
//           <div className="space-y-4">
//             <h3 className="font-semibold">Related Videos</h3>
//             {relatedVideos.map((v) => (
//               <VideoCard 
//                 key={v.id} 
//                 id={v.id}
//                 title={v.title}
//                 thumbnail={v.thumbnail}
//                 creator={v.creator}
//                 views={v.views}
//                 duration={v.duration}
//                 isPremium={v.isPremium}
//                 price={v.price}
//                 likes={v.likes}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Watch;


import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VideoCard } from "@/components/VideoCard";
import { 
  ThumbsUp, 
  Share2, 
  Coins, 
  Lock, 
  Send
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// === FULLY TYPED BCH RPC CLIENT ===
class BCHRPC {
  private url = "http://localhost:3001/api/bchrpc";
  private auth = "Basic " + btoa("bchuser:bchpass");

  async call<T>(method: string, params: unknown[] = []): Promise<T> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth,
      },
      body: JSON.stringify({
        jsonrpc: "1.0",
        id: "blaze",
        method,
        params,
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message || "RPC Error");
    return data.result as T;
  }
}

const rpc = new BCHRPC();

// === TYPES ===
interface UTXO {
  txid: string;
  vout: number;
  amount: number;
}

interface SignedTxResult {
  hex: string;
  complete: boolean;
}

interface WalletData {
  address: string;
  privateKey: string;
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
  isPremium: boolean;
  userCanAccess: boolean;
  likes: number;
  contractAddress: string;
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
  author: { username: string };
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
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

 // Load wallet
useEffect(() => {
  // Method 1: Get from localStorage "connectedWallet"
  const storedConnectedWallet = localStorage.getItem("connectedWallet");
  
  if (storedConnectedWallet) {
    // Use the specifically connected wallet
    setConnectedWallet(storedConnectedWallet);
  } else {
    // Fallback: Get all wallets and use first one
    const wallets = JSON.parse(localStorage.getItem("bchWallets") || "[]") as WalletData[];
    if (wallets.length > 0) {
      setConnectedWallet(wallets[0].address);
      // Also store it for future
      localStorage.setItem("connectedWallet", wallets[0].address);
    }
  }
}, []);

  // Fetch video
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
        setRelatedVideos(data.relatedVideos || []);
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

  // Record view
  useEffect(() => {
    if (!videoId || !token) return;
    const id = videoId.startsWith('id=') ? videoId.slice(3) : videoId;

    fetch(`http://localhost:3001/api/videos/${id}/view`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json())
      .then(data => {
        if (data.success && video) {
          setVideo(prev => prev ? { ...prev, views: prev.views + 1 } : prev);
        }
      });
  }, [videoId, token]);


const handleUnlock = async () => {
  if (!video || !videoId || !token || !connectedWallet) {
    alert("Missing data - check wallet connection");
    return;
  }
    console.log("1. video object:", video);
  console.log("2. contractAddress from video:", video.contractAddress);
  console.log("3. creator wallet:", video.creator.walletAddress);
  console.log("4. Are they different?", video.contractAddress !== video.creator.walletAddress);

  const id = videoId.startsWith('id=') ? videoId.slice(3) : videoId;
  setLoadingPayment(true);

  try {
    // Load wallet from localStorage
    const wallets = JSON.parse(localStorage.getItem("bchWallets") || "[]") as WalletData[];
    const wallet = wallets.find(w => w.address === connectedWallet);
    console.log("Connected Wallet",wallet);
    if (!wallet) throw new Error("Wallet not found");

    // === STEP 1: Get UTXOs for viewer wallet ===
    interface RawUtxo {
      txid: string;
      vout: number;
      address: string;
      amount: number;
      confirmations: number;
      spendable: boolean;
      solvable: boolean;
    }
    // Define proper interfaces
interface ScriptPubKey {
  asm: string;
  hex: string;
  type: string;
  address?: string;
}
interface TransactionOutput {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
}
    interface TransactionDetails {
  txid: string;
  hash: string;
  version: number;
  size: number;
  locktime: number;
  vin: unknown[];
  vout: TransactionOutput[];
  hex: string;
  blockhash?: string;
  confirmations?: number;
  time?: number;
  blocktime?: number;
}
    const allUtxos = await rpc.call<RawUtxo[]>("listunspent", [0, 9999999]);
    const myUtxos = allUtxos.filter(u => u.address === wallet.address && u.spendable);

    if (myUtxos.length === 0) {
      alert("No spendable BCH in your wallet - fund it first!");
      return;
    }

    // Select enough inputs
    let totalSats = 0;
    const inputs: { txid: string; vout: number }[] = [];
    for (const u of myUtxos) {
      inputs.push({ txid: u.txid, vout: u.vout });
      totalSats += Math.round(u.amount * 1e8);
      if (totalSats >= (video.price || 0) * 1e8 + 5000) break;
    }

    // Build payment TX: viewer → contract
    const outputs: Record<string, number> = {};
    outputs[video.contractAddress] = video.price || 0;
console.log(outputs);
    const changeSats = totalSats - (video.price || 0) * 1e8 - 2000;
    if (changeSats > 546) {
      outputs[wallet.address] = changeSats / 1e8;
    }

    const rawTx = await rpc.call<string>("createrawtransaction", [inputs, outputs]);
    const signed = await rpc.call<{ hex: string; complete: boolean }>("signrawtransactionwithwallet", [rawTx]);
    if (!signed.complete) throw new Error("Signing failed");

    const paymentTxid = await rpc.call<string>("sendrawtransaction", [signed.hex]);
    alert(`Payment sent! TXID: ${paymentTxid.slice(0, 16)}...`);
    const txDetails = await rpc.call<TransactionDetails>("getrawtransaction", [paymentTxid, true]); // Use 'any' type
console.log("Transaction details:", txDetails);

    // === STEP 2: Notify backend ===
    const res = await fetch(`http://localhost:3001/api/videos/${id}/purchase`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txHash: paymentTxid }),
    });

    const data = await res.json();
    if (data.success) {
      alert("VIDEO UNLOCKED!");
      setVideo(prev => prev ? { ...prev, userCanAccess: true } : prev);
    } else {
      alert("Backend error: " + (data.error || "unknown"));
    }

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Unlock failed:", err);
    alert("Payment failed: " + msg);
  } finally {
    setLoadingPayment(false);
  }
};

  // Tip, Comment, Like (unchanged)
  const handleTip = async () => {
    if (!videoId || !token || !tipAmount) return;
    const id = videoId.startsWith('id=') ? videoId.slice(3) : videoId;
    setLoadingPayment(true);
    try {
      const res = await fetch(`http://localhost:3001/api/videos/${id}/tip`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(tipAmount) }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Tip sent: ${tipAmount} BCH`);
        setTipAmount("");
      } else alert("Tip failed: " + data.error);
    } catch {
      alert("Tip failed");
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleAddComment = async () => {
    if (!videoId || !token || !newComment.trim()) return;
    const id = videoId.startsWith('id=') ? videoId.slice(3) : videoId;
    try {
      const res = await fetch(`http://localhost:3001/api/videos/${id}/comment`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => [...prev, data.comment]);
        setNewComment("");
      }
    } catch {
      alert("Comment failed");
    }
  };

  const handleLike = async () => {
    if (!videoId || !token) return;
    const id = videoId.startsWith('id=') ? videoId.slice(3) : videoId;
    try {
      const res = await fetch(`http://localhost:3001/api/videos/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setVideo(prev => prev ? { ...prev, likes: prev.likes + 1 } : prev);
      }
    } catch {
      alert("Like failed");
    }
  };

  if (loading) return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-4 mt-250">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        <p className="text-muted-foreground">Loading video...</p>
      </div>
    </div>
  );

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
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"></div>
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
                  <Input type="number" placeholder="0.01" value={tipAmount} onChange={e => setTipAmount(e.target.value)} />
                  <Button onClick={handleTip} disabled={!tipAmount}>
                    <Coins className="w-4 h-4 mr-1" /> Tip
                  </Button>
                </div>
              </Card>

              {/* COMMENTS */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">{comments.length} Comments</h3>
                <div className="flex gap-2 mb-4">
                  <Textarea placeholder="Add comment..." value={newComment} onChange={e => setNewComment(e.target.value)} />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="font-bold text-sm">{comment.author.username[0].toUpperCase()}</span>
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
            {relatedVideos.map(v => (
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