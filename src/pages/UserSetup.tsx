import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Plus, FolderOpen, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSetup = () => {
  const [step, setStep] = useState(1);
  const [socialLinks, setSocialLinks] = useState([{ id: 1, url: "" }]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [walletDirectory, setWalletDirectory] = useState<FileSystemDirectoryHandle | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    avatar: "",
    socialLinks: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // **STEP 1: COMPLETE PROFILE FORM**
  if (step === 1) {
    const handleNext = () => {
      if (!formData.username || !formData.email) {
        alert("Please fill username and email");
        return;
      }
      setStep(2);
    };

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto p-8 border-border">
            <h1 className="text-3xl font-bold mb-6 text-center">Step 1/2: Set Up Your Profile</h1>
            <p className="text-muted-foreground mb-8 text-center">
              Provide your details before creating your Bitcoin Cash wallet
            </p>

            <form className="space-y-6">
              {/* Username */}
              <div>
                <Label htmlFor="username">Username *</Label>
                <Input 
                  id="username" 
                  placeholder="Choose a unique username" 
                  className="mt-2" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your@email.com" 
                  className="mt-2" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself..." 
                  className="mt-2 min-h-[100px]" 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              {/* AVATAR UPLOAD */}
              <div>
                <Label>Avatar</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mt-2 hover:border-primary transition-colors cursor-pointer">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setAvatarFile(file);
                        const reader = new FileReader();
                        reader.onload = () => {
                          const result = reader.result;
                          if (typeof result === "string") {
                            setAvatarPreview(result);
                            setFormData({ ...formData, avatar: result });
                          } else {
                            console.warn("Unexpected avatar result type:", result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload" className="cursor-pointer block">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        className="w-full max-w-[120px] mx-auto rounded-lg object-cover" 
                      />
                    ) : (
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    )}
                    <h4 className="font-medium mb-2">
                      {avatarPreview ? "Change Avatar" : "Upload your avatar"}
                    </h4>
                    <p className="text-sm text-muted-foreground">JPG, PNG (Max 2MB)</p>
                  </label>
                </div>
              </div>

              {/* SOCIAL LINKS */}
              <div>
                <Label className="flex items-center justify-between mb-4">
                  <span>Social Links</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => 
                      setSocialLinks([...socialLinks, { id: socialLinks.length + 1, url: "" }])
                    }
                  >
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </Label>
                
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Input
                        placeholder="https://twitter.com/yourprofile"
                        value={link.url}
                        onChange={(e) => {
                          const updated = socialLinks.map(l => 
                            l.id === link.id ? { ...l, url: e.target.value } : l
                          );
                          setSocialLinks(updated);
                          setFormData({
                            ...formData, 
                            socialLinks: updated.map(l => l.url).filter(Boolean)
                          });
                        }}
                        className="flex-1"
                      />
                      {socialLinks.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSocialLinks(socialLinks.filter(l => l.id !== link.id))}
                          className="h-8 w-8 p-0"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleNext}>
                Next: Choose Wallet Folder <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // **STEP 2: WALLET FOLDER SELECTION**
  const selectWalletDirectory = async () => {
    if (!window.showDirectoryPicker) {
      alert("File System Access API not supported. Using browser storage.");
      handleComplete();
      return;
    }
    
    try {
      const directory = await window.showDirectoryPicker();
      setWalletDirectory(directory);
      localStorage.setItem("walletDirectoryHandle", "selected");
      handleComplete();
    } catch (error) {
      console.error("Error selecting directory:", error);
    }
  };

  // **FILE SAVING FUNCTION - EXACT SAME AS HEADER**
  const saveWalletToFile = async (wallet, directory: FileSystemDirectoryHandle) => {
    try {
      const fileName = `${wallet.address}.bch.wallet.json`;
      const fileHandle = await directory.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(wallet, null, 2));
      await writable.close();
      console.log(`✅ Wallet saved: ${fileName}`);
    } catch (error) {
      console.error("Error saving wallet file:", error);
    }
  };

  // **HASH FUNCTION - EXACT SAME AS HEADER**
  const simpleHash = async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

const handleComplete = async () => {
  if (isSaving) return;
  
  setIsSaving(true);
  try {
    // 1. GENERATE WALLET
    const walletResponse = await fetch("http://localhost:3001/api/generate/generate-wallet", {
      method: "POST"
    });
    
    if (!walletResponse.ok) throw new Error("Failed to generate wallet");
    
    const walletData = await walletResponse.json();
    const rawWallet = {
      address: walletData.wallet.address,
      publicKey: walletData.wallet.pubKey,
      privateKey: walletData.wallet.wif,
      privateKeyHex: walletData.wallet.privKeyHex,
      createdAt: new Date().toISOString(),
    };

    // 2. GET PASSWORD
    const password = prompt("🔐 Create a strong password for your wallet:");
    if (!password) throw new Error("Password required");

    // 3. ENCRYPT WALLET
    const passwordHash = await simpleHash(password);
    const encryptedWallet = { 
      ...rawWallet, 
      encrypted: true, 
      passwordHash 
    };

    // 4. CREATE FormData
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('walletAddress', encryptedWallet.address);
    formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));

    // 5. ADD AVATAR FILE ← FIXED
    if (avatarFile) {
      formDataToSend.append('avatar', avatarFile);
    }

    // 6. SAVE TO BACKEND
    const profileResponse = await fetch("http://localhost:3001/api/user/setup", {
      method: "POST",
      body: formDataToSend
    });

    if (!profileResponse.ok) throw new Error("Failed to save profile");

    const profileData = await profileResponse.json();
    
    // 7. SAVE WALLET
    const existingWallets = JSON.parse(localStorage.getItem("bchWallets") || "[]");
    const updatedWallets = [encryptedWallet, ...existingWallets];
    localStorage.setItem("bchWallets", JSON.stringify(updatedWallets));
    localStorage.setItem("connectedWallet", encryptedWallet.address);

    // 8. SAVE TO FILE
    if (walletDirectory && window.showDirectoryPicker) {
      await saveWalletToFile(encryptedWallet, walletDirectory);
    }

    // 9. SAVE TOKEN
    localStorage.setItem("authToken", profileData.token);

    alert("✅ Profile & Wallet created successfully!");
    navigate("/dashboard");

  } catch (error) {
    console.error("Setup error:", error);
    alert(`❌ Error: ${error.message}`);
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 border-border">
          <h1 className="text-3xl font-bold mb-6 text-center">Step 2/2: Choose Wallet Folder</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Select a secure folder to store your wallet files permanently
          </p>

          <div className="text-center space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-12">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Choose Wallet Storage Folder</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your wallet will be saved as <code>.bch.wallet.json</code>
              </p>
              <Button 
                size="lg" 
                className="w-full gap-2" 
                onClick={selectWalletDirectory}
                disabled={isSaving}
              >
                <FolderOpen className="w-5 h-5" />
                {isSaving ? "Creating..." : "Select Folder"}
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleComplete}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? "Creating..." : "Skip - Use Browser Storage Only"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserSetup;