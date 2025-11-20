
import { useState, useEffect, useRef } from "react";
import { Search, Wallet, User, Upload, Menu, X, Key, FileKey, FolderOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

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
  const [pendingWallet, setPendingWallet] = useState<WalletData | null>(null); // ← NEW
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [importPassword, setImportPassword] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    const savedWallets = localStorage.getItem("bchWallets");
    const savedConnected = localStorage.getItem("connectedWallet"); // ← NEW

    if (savedWallets) {
      const parsed: WalletData[] = JSON.parse(savedWallets);
      setWallets(parsed);
    }

    if (savedConnected) {
      setConnectedWallet(savedConnected);
    } else if (savedWallets) {
      const parsed: WalletData[] = JSON.parse(savedWallets);
      if (parsed.length > 0) {
        const first = parsed[0].address;
        setConnectedWallet(first);
        localStorage.setItem("connectedWallet", first); // ← Auto-connect first
      }
    }
  }, []);

  // Save connected wallet to localStorage whenever it changes
  useEffect(() => {
    if (connectedWallet) {
      localStorage.setItem("connectedWallet", connectedWallet);
    } else {
      localStorage.removeItem("connectedWallet");
    }
  }, [connectedWallet]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToSetup = () => {
    setDropdownOpen(false);
    navigate("/setup");
  };

  const simpleHash = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const getAvatarColor = (addr: string) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-indigo-500", "bg-pink-500"];
    return colors[(addr?.length || 0) % colors.length];
  };

  const formatWallet = (addr: string | null) =>
    addr ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : "None";

  const handleSelectWallet = (wallet: WalletData) => {
    setSelectedWallet(wallet);
    setPendingWallet(wallet); // ← Instant visual feedback
    setPasswordModalOpen(true);
    setImportPassword("");
  };

  const closeModal = () => {
    setPasswordModalOpen(false);
    setSelectedWallet(null);
    setPendingWallet(null);
    setImportPassword("");
  };

  const unlockWallet = async () => {
    if (!selectedWallet || !importPassword.trim()) return;

    try {
      const passwordHash = await simpleHash(importPassword);
      const storedWallet = wallets.find(w => w.address === selectedWallet.address);

      if (storedWallet?.passwordHash !== passwordHash) {
        alert("Wrong password");
        return;
      }

      // Backend auth
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
        localStorage.setItem("authToken", authData.token);
        localStorage.setItem("user", JSON.stringify(authData.user));

        // SUCCESS: Update connected wallet
        setConnectedWallet(selectedWallet.address);
        setPendingWallet(null);
        closeModal();
        setDropdownOpen(false);

        navigate("/dashboard");
        alert(`Welcome back, ${authData.user.username || "User"}!`);
      } else if (authData.needsSetup) {
        closeModal();
        navigate("/setup");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  const isExistingWallet = selectedWallet && wallets.some(w => w.address === selectedWallet.address);

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

            {/* Wallet Dropdown */}
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
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-800">Your BCH Wallets</p>
                    <Button variant="ghost" size="icon" onClick={() => setDropdownOpen(false)} className="h-6 w-6">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {localStorage.getItem("walletDirectoryHandle") ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-700 flex items-center gap-1">
                      <FolderOpen className="w-3 h-3" /> Wallet folder linked
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-700">
                      No folder selected
                    </div>
                  )}

                  {wallets.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {wallets.map((wallet) => {
                        const isConnected = connectedWallet === wallet.address;
                        const isPending = pendingWallet?.address === wallet.address;

                        return (
                          <Button
                            key={wallet.address}
                            variant={isConnected ? "default" : isPending ? "secondary" : "outline"}
                            onClick={() => handleSelectWallet(wallet)}
                            className={`w-full justify-start gap-3 text-left ${
                              isConnected
                                ? "bg-primary hover:bg-primary/90"
                                : isPending
                                ? "ring-2 ring-blue-400 bg-blue-50"
                                : ""
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(wallet.address)} flex items-center justify-center text-white text-xs font-bold`}>
                              {wallet.address.slice(4, 6).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{formatWallet(wallet.address)}</div>
                              <div className="text-xs opacity-70">
                                {isConnected ? "Connected" : isPending ? "Unlocking..." : "Click to connect"}
                              </div>
                            </div>
                            {isConnected && <Check className="w-4 h-4" />}
                          </Button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic py-4 text-center">No wallets yet</p>
                  )}

                  <Button
                    variant="secondary"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={navigateToSetup}
                  >
                    <FileKey className="w-4 h-4" />
                    Create New BCH Wallet
                  </Button>

                  {connectedWallet && !pendingWallet && (
                    <p className="text-xs text-green-600 font-medium text-center">
                      Connected: {formatWallet(connectedWallet)}
                    </p>
                  )}
                  {pendingWallet && !connectedWallet && (
                    <p className="text-xs text-blue-600 font-medium text-center">
                      Selected: {formatWallet(pendingWallet.address)}
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

      {/* Password Modal */}
      {passwordModalOpen && selectedWallet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {isExistingWallet ? "Unlock Wallet" : "Secure New Wallet"}
            </h3>

            <div className="space-y-4">
              <Input
                type="password"
                value={importPassword}
                onChange={(e) => setImportPassword(e.target.value)}
                placeholder={isExistingWallet ? "Enter password" : "Create a strong password"}
                className="w-full"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && unlockWallet()}
              />

              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p className="font-medium">{formatWallet(selectedWallet.address)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {isExistingWallet ? "Enter password to connect" : "This wallet will be encrypted"}
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={unlockWallet}
                  disabled={!importPassword.trim()}
                  className="bg-primary text-white"
                >
                  {isExistingWallet ? "Unlock & Connect" : "Save & Connect"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};