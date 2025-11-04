import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryBar } from "@/components/CategoryBar";
import { VideoCard } from "@/components/VideoCard";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  // **1. FETCH REAL TRENDING VIDEOS**
  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const fetchTrendingVideos = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("http://localhost:3001/api/video/trending", {
        headers: { 
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // **2. TRANSFORM DATA - ADD MISSING likes**
        const videosWithLikes = data.videos.map((video) => ({
          ...video,
          likes: video.likes || Math.floor(Math.random() * 1000) + 100,
          views: typeof video.views === 'string' ? parseInt(video.views.replace('K', '000')) : video.views
        }));
        
        setTrendingVideos(videosWithLikes);
      } else {
        // **3. FALLBACK - TRANSFORM MOCK DATA**
        setTrendingVideos(mockVideos.map(video => ({
          ...video,
          likes: Math.floor(Math.random() * 1000) + 100,
          views: parseInt(video.views.replace('K', '000'))
        })));
      }
    } catch (error) {
      console.error("Trending fetch error:", error);
      // **4. USE MOCK DATA AS BACKUP**
      setTrendingVideos(mockVideos.map(video => ({
        ...video,
        likes: Math.floor(Math.random() * 1000) + 100,
        views: parseInt(video.views.replace('K', '000'))
      })));
    } finally {
      setLoading(false);
    }
  };

  // **5. NAVIGATE TO WATCH PAGE ON VIDEO CLICK**
  const handleVideoClick = (video) => {
    navigate(`/watch?id=${video.id}`);
  };

  // **6. MOCK DATA - BACKWARD COMPATIBLE**
  const mockVideos = [
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
    {
      id: "5",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80",
      title: "Cryptocurrency Trading Strategies 2025",
      creator: "TradeWise",
      views: "156K",
      duration: "18:42",
      isPremium: true,
      price: "0.08"
    },
    {
      id: "6",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
      title: "Electronic Music Production Masterclass",
      creator: "ProducerLife",
      views: "67K",
      duration: "22:15"
    },
    {
      id: "7",
      thumbnail: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&q=80",
      title: "Web3 Development Tutorial Series",
      creator: "CodeMasters",
      views: "92K",
      duration: "25:30",
      isPremium: true,
      price: "0.12"
    },
    {
      id: "8",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
      title: "Digital Art & NFT Creation Guide",
      creator: "ArtChain",
      views: "78K",
      duration: "16:55"
    }
  ];

  if (loading) {
    return (
      <div>
        <Header/>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading trending videos...</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryBar />
      
      {/* Trending Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
          <p className="text-muted-foreground">Most popular videos this week</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in" >
          {trendingVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              {...video}
               onClick={() => handleVideoClick(video)}
              // **8. DEFAULT PROPS FOR EXPLORE**
              showContract={false}
              showActions={false}
            />
          ))}
        </div>
      </section>

      {/* Footer - SAME AS BEFORE */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">
                  BT
                </div>
                <span className="text-xl font-bold">BlazeTube</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The decentralized video platform powered by Bitcoin Cash.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">How It Works</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Creator Tools</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Community</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">BCH Wallet Guide</li>
                <li className="hover:text-primary transition-colors cursor-pointer">API Docs</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Blog</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Copyright</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 BlazeTube. Built on Bitcoin Cash. Powered by decentralization.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;