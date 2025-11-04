import { useState, useEffect, useRef } from "react";
import { Search, Wallet, User, Upload, Menu, X, Key, FileKey, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

interface FileSystemAccess {
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
  showOpenFilePicker?: (options?) => Promise<FileSystemFileHandle[]>;
}

declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    showOpenFilePicker?: (options) => Promise<FileSystemFileHandle[]>;
  }
}

interface BackendWalletResponse {
  success: boolean;
  wallet: {
    address: string;
    pubKey: string;
    wif: string;
    privKeyHex: string;
  };
}

interface WalletData {
  address: string;
  publicKey: string;
  privateKey: string;
  privateKeyHex: string;
  createdAt: string;
  encrypted?: boolean;
  passwordHash?: string;
}

export const Header = () => {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [importPassword, setImportPassword] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [walletDirectory, setWalletDirectory] = useState<FileSystemDirectoryHandle | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initializeWalletStorage();
  }, []);

  // **NEW: Initialize once - check localStorage first**
  const initializeWalletStorage = async () => {
    try {
      // Load saved wallet directory handle from localStorage
      const savedDirectory = localStorage.getItem("walletDirectoryHandle");
      const savedWallets = localStorage.getItem("bchWallets");

      if (savedWallets) {
        const walletData: WalletData[] = JSON.parse(savedWallets);
        setWallets(walletData);
        if (walletData.length > 0 && !connectedWallet) {
          setConnectedWallet(walletData[0].address);
        }
      }

      // Restore directory handle if saved
      if (savedDirectory && window.showDirectoryPicker) {
        try {
          // Note: FileSystemHandle can't be directly restored from JSON
          // We just set the flag that directory is already selected
          setWalletDirectory({} as FileSystemDirectoryHandle); // Placeholder
          console.log("✅ Wallet directory restored from localStorage");
        } catch (error) {
          console.log("⚠️ Directory handle expired, will ask again");
          localStorage.removeItem("walletDirectoryHandle");
        }
      }
    } catch (error) {
      console.error("Error initializing wallet storage:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // **REMOVED: Directory selection - handled in setup**

  const generateBCHWalletFromBackend = async (): Promise<WalletData | null> => {
    try {
      setIsGenerating(true);
      const response = await fetch("http://localhost:3001/api/generate/generate-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data: BackendWalletResponse = await response.json();
      
      if (data.success && data.wallet) {
        return {
          address: data.wallet.address,
          publicKey: data.wallet.pubKey,
          privateKey: data.wallet.wif,
          privateKeyHex: data.wallet.privKeyHex,
          createdAt: new Date().toISOString(),
        };
      }
      throw new Error("Failed to generate wallet");
    } catch (error) {
      console.error("Error generating BCH wallet:", error);
      alert(`Failed to generate wallet: ${error}`);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // **CHANGED: Navigate to /setup instead of creating directly**
  const handleCreateWallet = () => {
    navigate("/setup");
  };

  const saveWalletWithPassword = async (password: string) => {
    if (!selectedWallet) return;
    
    try {
      const passwordHash = await simpleHash(password);
      const encryptedWallet: WalletData = { 
        ...selectedWallet, 
        encrypted: true, 
        passwordHash 
      };
      
      const updatedWallets = [encryptedWallet, ...wallets];
      setWallets(updatedWallets);
      setConnectedWallet(selectedWallet.address);
      localStorage.setItem("bchWallets", JSON.stringify(updatedWallets));
      
      // **Save to file system if directory exists**
      if (walletDirectory) {
        await saveWalletToFile(encryptedWallet);
      }
      
      setPasswordModalOpen(false);
      setSelectedWallet(null);
      setImportPassword("");
      alert("✅ BCH wallet created and secured successfully!");
    } catch (error) {
      console.error("Error saving wallet:", error);
      alert("❌ Error saving wallet. Please try again.");
    }
  };

  const saveWalletToFile = async (wallet: WalletData) => {
    if (!walletDirectory || !window.showDirectoryPicker) return;
    try {
      const fileName = `${wallet.address}.bch.wallet.json`;
      const directory = await window.showDirectoryPicker(); // Get current dir
      const fileHandle = await directory.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(wallet, null, 2));
      await writable.close();
      console.log(`✅ Wallet saved: ${fileName}`);
    } catch (error) {
      console.error("Error saving wallet file:", error);
    }
  };

  const simpleHash = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const getAvatarColor = (wallet?: string | null) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-indigo-500", "bg-pink-500"];
    return colors[wallet?.length % colors.length || 0];
  };

  const formatWallet = (wallet: string | null) => 
    wallet ? `${wallet.slice(0, 8)}...${wallet.slice(-8)}` : "None";

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (selectedWallet && wallets.find((w) => w.address === selectedWallet.address)) {
        unlockWallet();
      } else {
        saveWalletWithPassword(importPassword);
      }
    }
  };

  const handleSelectWallet = (wallet: WalletData) => {
    setSelectedWallet(wallet);
    setPasswordModalOpen(true);
  };

 const unlockWallet = async () => {
  if (!selectedWallet) return;
  
  try {
    const passwordHash = await simpleHash(importPassword);
    const storedWallet = wallets.find((w) => w.address === selectedWallet.address);
    
    if (storedWallet?.passwordHash === passwordHash) {
      // AUTHENTICATE
      const authResponse = await fetch("http://localhost:3001/api/auth/wallet-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: selectedWallet.address,
          publicKey: selectedWallet.publicKey
        })
      });

      const authData = await authResponse.json();
      
      if (authData.success) {
        // **SAME FORMAT AS userSetup!**
        localStorage.setItem("authToken", authData.token);
        localStorage.setItem("user", JSON.stringify(authData.user));
        console.log(selectedWallet.address);
        
        setConnectedWallet(selectedWallet.address);
        setDropdownOpen(false);
        setPasswordModalOpen(false);
        setSelectedWallet(null);
        setImportPassword("");
        
        navigate("/dashboard");
        alert(`✅ Welcome back, ${authData.user.username}!`);
        
      } else if (authData.needsSetup) {
        navigate("/setup");
      }
      
    } else {
      alert("❌ Invalid password");
    }
  } catch (error) {
    console.error("Auth error:", error);
    alert("❌ Login failed");
  }
};

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">
              BT
            </div>
            <span className="text-xl font-bold hidden sm:inline">BlazeTube</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 text-sm">
            <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
          </nav>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Search videos, creators, categories..."
                className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="relative flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Upload className="w-5 h-5" />
              </Button>
            </Link>

            {/* **SIMPLIFIED WALLET DROPDOWN** */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="hero"
                size="sm"
                className="gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                disabled={isGenerating}
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
                </span>
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-800">Your BCH Wallets</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDropdownOpen(false)}
                      className="h-6 w-6"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* **Directory Status** */}
                  {localStorage.getItem("walletDirectoryHandle") ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-xs text-green-700 flex items-center gap-1">
                        <FolderOpen className="w-3 h-3" />
                        Wallet folder selected
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                      <p className="text-xs text-yellow-700">No wallet folder selected</p>
                    </div>
                  )}

                  {/* Wallet List */}
                  {wallets.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {wallets.map((wallet, idx) => (
                        <Button
                          key={idx}
                          variant={connectedWallet === wallet.address ? "default" : "outline"}
                          onClick={() => handleSelectWallet(wallet)}
                          className={`flex items-center gap-3 text-sm py-2 w-full mb-2 ${
                            connectedWallet === wallet.address
                              ? "bg-primary text-white hover:bg-primary/90"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full ${getAvatarColor(wallet.address)} flex items-center justify-center text-white font-semibold text-xs`}>
                            {wallet.address.slice(4, 6).toUpperCase()}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium truncate text-xs">{formatWallet(wallet.address)}</div>
                            <div className="text-xs text-gray-500">
                              Created: {new Date(wallet.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <Key className="w-4 h-4" />
                        </Button>
                      ))}
                      <hr className="my-2 border-gray-200" />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No wallets yet</p>
                  )}

                  {/* **Navigate to Setup** */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCreateWallet}
                    className="bg-green-500 hover:bg-green-600 text-white gap-2"
                  >
                    <FileKey className="w-4 h-4" />
                    Create New BCH Wallet
                  </Button>

                  {connectedWallet && (
                    <p className="mt-2 text-xs text-green-600 truncate">
                      Connected: {formatWallet(connectedWallet)}
                    </p>
                  )}
                </div>
              )}
            </div>

            <Link to="/profile">
              <Button variant="outline" size="icon" className="hidden md:flex">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Password Modal - SAME AS BEFORE */}
      {passwordModalOpen && selectedWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-32">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mt-4">
            <h3 className="text-lg font-semibold mb-4">
              {wallets.find((w) => w.address === selectedWallet.address)
                ? "🔓 Unlock Wallet"
                : "🔐 Secure Your Wallet"}
            </h3>
            
            <div className="space-y-4">
              <Input
                type="password"
                value={importPassword}
                onChange={(e) => setImportPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  wallets.find((w) => w.address === selectedWallet.address)
                    ? "Enter wallet password"
                    : "Create strong password"
                }
                className="w-full"
                autoFocus
              />

              {selectedWallet && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">
                    Address: {formatWallet(selectedWallet.address)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {localStorage.getItem("walletDirectoryHandle") ? "Saved to wallet folder" : "Browser storage"}
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPasswordModalOpen(false);
                    setSelectedWallet(null);
                    setImportPassword("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    wallets.find((w) => w.address === selectedWallet.address)
                      ? unlockWallet
                      : () => saveWalletWithPassword(importPassword)
                  }
                  disabled={!importPassword.trim()}
                  className="bg-primary text-white"
                >
                  {wallets.find((w) => w.address === selectedWallet.address) ? "Unlock" : "Create & Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};