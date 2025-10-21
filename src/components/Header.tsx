// // // // // import { useState, useEffect, useRef } from "react";
// // // // // import { Search, Wallet, User, Upload, Menu, X } from "lucide-react";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Link } from "react-router-dom";

// // // // // export const Header = () => {
// // // // //   const [wallets, setWallets] = useState<string[]>([]);
// // // // //   const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
// // // // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // // //   // Load wallets from localStorage
// // // // //   useEffect(() => {
// // // // //     const saved = localStorage.getItem("wallets");
// // // // //     if (saved) setWallets(JSON.parse(saved));
// // // // //   }, []);

// // // // //   // Close dropdown if clicked outside
// // // // //   useEffect(() => {
// // // // //     const handleClickOutside = (event: MouseEvent) => {
// // // // //       if (
// // // // //         dropdownRef.current &&
// // // // //         !dropdownRef.current.contains(event.target as Node)
// // // // //       ) {
// // // // //         setDropdownOpen(false);
// // // // //       }
// // // // //     };
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   const handleCreateWallet = () => {
// // // // //     const newWallet = "bch" + Math.random().toString(36).substring(2, 12);
// // // // //     const updatedWallets = [newWallet, ...wallets];
// // // // //     setWallets(updatedWallets);
// // // // //     setConnectedWallet(newWallet);
// // // // //     localStorage.setItem("wallets", JSON.stringify(updatedWallets));
// // // // //     // Removed setDropdownOpen(false) to keep dropdown open
// // // // //   };

// // // // //   const handleSelectWallet = (wallet: string) => {
// // // // //     setConnectedWallet(wallet);
// // // // //     setDropdownOpen(false);
// // // // //   };

// // // // //   // Simple avatar generator based on wallet address
// // // // //   const getAvatarColor = (wallet: string) => {
// // // // //     const colors = [
// // // // //       "bg-blue-500",
// // // // //       "bg-green-500",
// // // // //       "bg-purple-500",
// // // // //       "bg-red-500",
// // // // //       "bg-indigo-500",
// // // // //       "bg-pink-500",
// // // // //     ];
// // // // //     const index = wallet.length % colors.length;
// // // // //     return colors[index];
// // // // //   };

// // // // //   return (
// // // // //     <header className="sticky top-0 z-50 w-full border-b border-border glass">
// // // // //       <div className="container mx-auto px-4 py-3">
// // // // //         <div className="flex items-center justify-between gap-4">
// // // // //           {/* Logo */}
// // // // //           <Link
// // // // //             to="/"
// // // // //             className="flex items-center gap-2 hover:opacity-80 transition-opacity"
// // // // //           >
// // // // //             <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">
// // // // //               BT
// // // // //             </div>
// // // // //             <span className="text-xl font-bold hidden sm:inline">BlazeTube</span>
// // // // //           </Link>

// // // // //           {/* Navigation Links */}
// // // // //           <nav className="hidden lg:flex items-center gap-4 text-sm">
// // // // //             <Link to="/explore" className="hover:text-primary transition-colors">
// // // // //               Explore
// // // // //             </Link>
// // // // //             <Link to="/dashboard" className="hover:text-primary transition-colors">
// // // // //               Dashboard
// // // // //             </Link>
// // // // //             <Link to="/profile" className="hover:text-primary transition-colors">
// // // // //               Profile
// // // // //             </Link>
// // // // //           </nav>

// // // // //           {/* Search Bar */}
// // // // //           <div className="flex-1 max-w-2xl">
// // // // //             <div className="relative">
// // // // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
// // // // //               <Input
// // // // //                 type="search"
// // // // //                 placeholder="Search videos, creators, categories..."
// // // // //                 className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors"
// // // // //               />
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Actions */}
// // // // //           <div className="relative flex items-center gap-2">
// // // // //             <Link to="/dashboard">
// // // // //               <Button variant="ghost" size="icon" className="hidden md:flex">
// // // // //                 <Upload className="w-5 h-5" />
// // // // //               </Button>
// // // // //             </Link>

// // // // //             {/* Wallet Dropdown */}
// // // // //             <div className="relative" ref={dropdownRef}>
// // // // //               <Button
// // // // //                 variant="hero"
// // // // //                 size="sm"
// // // // //                 className="gap-2"
// // // // //                 onClick={() => setDropdownOpen(!dropdownOpen)}
// // // // //               >
// // // // //                 <Wallet className="w-4 h-4" />
// // // // //                 <span className="hidden sm:inline">
// // // // //                   {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
// // // // //                 </span>
// // // // //               </Button>

// // // // //               {dropdownOpen && (
// // // // //                 <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
// // // // //                   <div className="flex justify-between items-center">
// // // // //                     <p className="text-sm font-semibold text-gray-800">Select Wallet</p>
// // // // //                     <Button
// // // // //                       variant="ghost"
// // // // //                       size="icon"
// // // // //                       onClick={() => setDropdownOpen(false)}
// // // // //                       className="h-6 w-6"
// // // // //                     >
// // // // //                       <X className="w-4 h-4 text-gray-600" />
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                   {wallets.length > 0 && (
// // // // //                     <>
// // // // //                       {wallets.map((w, idx) => (
// // // // //                         <Button
// // // // //                           key={idx}
// // // // //                           variant={connectedWallet === w ? "default" : "outline"}
// // // // //                           onClick={() => handleSelectWallet(w)}
// // // // //                           className={`flex items-center gap-3 text-sm py-2 ${
// // // // //                             connectedWallet === w
// // // // //                               ? "bg-primary text-white hover:bg-primary/90"
// // // // //                               : "hover:bg-gray-100"
// // // // //                           }`}
// // // // //                         >
// // // // //                           <div
// // // // //                             className={`w-8 h-8 rounded-full ${getAvatarColor(
// // // // //                               w
// // // // //                             )} flex items-center justify-center text-white font-semibold text-xs`}
// // // // //                           >
// // // // //                             {w.slice(2, 4).toUpperCase()}
// // // // //                           </div>
// // // // //                           <span className="truncate">{w.slice(0, 10)}...{w.slice(-6)}</span>
// // // // //                         </Button>
// // // // //                       ))}
// // // // //                       <hr className="my-2 border-gray-200" />
// // // // //                       <p className="text-sm font-semibold text-gray-800">Or create new wallet</p>
// // // // //                     </>
// // // // //                   )}

// // // // //                   <Button
// // // // //                     variant="secondary"
// // // // //                     size="sm"
// // // // //                     onClick={handleCreateWallet}
// // // // //                       className="bg-green-500 hover:bg-green-600 text-white"
// // // // //                   >
// // // // //                     {wallets.length > 0 ? "Create New Wallet" : "Create Wallet"}
// // // // //                   </Button>

// // // // //                   {connectedWallet && (
// // // // //                     <p className="mt-2 text-xs text-green-600 truncate">
// // // // //                       Connected: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
// // // // //                     </p>
// // // // //                   )}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             <Link to="/profile">
// // // // //               <Button variant="outline" size="icon" className="hidden md:flex">
// // // // //                 <User className="w-5 h-5" />
// // // // //               </Button>
// // // // //             </Link>

// // // // //             <Button variant="ghost" size="icon" className="md:hidden">
// // // // //               <Menu className="w-5 h-5" />
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // };

// // // import { useState, useEffect, useRef } from "react";
// // // import { Search, Wallet, User, Upload, Menu, X, Key, FileKey, FolderOpen } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Link } from "react-router-dom";

// // // interface WalletData {
// // //   address: string;
// // //   privateKey: string;
// // //   publicKey: string;
// // //   createdAt: string;
// // //   encrypted?: boolean;
// // //   passwordHash?: string;
// // // }

// // // interface FileSystemAccess {
// // //   showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
// // //   showOpenFilePicker?: (options?) => Promise<FileSystemFileHandle[]>;
// // // }

// // // declare global {
// // //   interface Window {
// // //     showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
// // //     showOpenFilePicker?: (options) => Promise<FileSystemFileHandle[]>;
// // //   }
// // // }

// // // export const Header = () => {
// // //   const [wallets, setWallets] = useState<WalletData[]>([]);
// // //   const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
// // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // //   const [passwordModalOpen, setPasswordModalOpen] = useState(false);
// // //   const [importPassword, setImportPassword] = useState("");
// // //   const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
// // //   const [walletDirectory, setWalletDirectory] = useState<FileSystemDirectoryHandle | null>(null);
// // //   const [isInitializing, setIsInitializing] = useState(false);
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   // Load wallets from localStorage on initial load
// // //   useEffect(() => {
// // //     loadWalletsFromLocalStorage();
// // //   }, []);

// // //   const loadWalletsFromLocalStorage = () => {
// // //     try {
// // //       const saved = localStorage.getItem("fileWallets");
// // //       if (saved) {
// // //         const walletData: WalletData[] = JSON.parse(saved);
// // //         setWallets(walletData);
// // //         if (walletData.length > 0 && !connectedWallet) {
// // //           setConnectedWallet(walletData[0].address);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading wallets from localStorage:", error);
// // //     }
// // //   };

// // //   // Close dropdown if clicked outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (
// // //         dropdownRef.current &&
// // //         !dropdownRef.current.contains(event.target as Node)
// // //       ) {
// // //         setDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const selectWalletDirectory = async () => {
// // //     try {
// // //       if (!window.showDirectoryPicker) {
// // //         alert("File System Access API not supported in your browser. Using browser storage instead.");
// // //         return;
// // //       }

// // //       setIsInitializing(true);
// // //       const directory = await window.showDirectoryPicker();
// // //       setWalletDirectory(directory);
      
// // //       // Verify we have permission to write to the directory by creating a test file
// // //       try {
// // //         const testFileHandle = await directory.getFileHandle("permission-test.txt", { create: true });
// // //         // Clean up test file
// // //         await directory.removeEntry("permission-test.txt");
// // //       } catch (error) {
// // //         console.error("No write permission:", error);
// // //         alert("Please grant write permission to this directory to save wallet files.");
// // //         return;
// // //       }
      
// // //       // Load any existing wallet files
// // //       await loadWalletsFromDirectory(directory);
      
// // //     } catch (error) {
// // //       console.error("Error selecting directory:", error);
// // //       if (error instanceof Error && error.name === 'AbortError') {
// // //         // User cancelled the directory picker
// // //         return;
// // //       }
// // //       alert("Error accessing directory. Please try again.");
// // //     } finally {
// // //       setIsInitializing(false);
// // //     }
// // //   };

// // //   const loadWalletsFromDirectory = async (directory: FileSystemDirectoryHandle) => {
// // //     try {
// // //       const wallets: WalletData[] = [];
// // //       const knownWallets = JSON.parse(localStorage.getItem("fileWallets") || "[]");
      
// // //       // Try to load each known wallet from the directory
// // //       for (const wallet of knownWallets) {
// // //         try {
// // //           const fileName = `${wallet.address}.wallet.json`;
// // //           const fileHandle = await directory.getFileHandle(fileName);
// // //           const file = await fileHandle.getFile();
// // //           const content = await file.text();
// // //           const walletData: WalletData = JSON.parse(content);
// // //           wallets.push(walletData);
// // //         } catch (error) {
// // //           console.warn(`Wallet file not found: ${wallet.address}.wallet.json`);
// // //           // Keep the wallet in memory even if file is missing
// // //           wallets.push(wallet);
// // //         }
// // //       }
      
// // //       setWallets(wallets);
// // //       if (wallets.length > 0 && !connectedWallet) {
// // //         setConnectedWallet(wallets[0].address);
// // //       }
      
// // //       // Update localStorage with the successfully loaded wallets
// // //       localStorage.setItem("fileWallets", JSON.stringify(wallets));
// // //     } catch (error) {
// // //       console.error("Error loading wallets from directory:", error);
// // //     }
// // //   };

// // //   const handleCreateWallet = async () => {
// // //     if (!walletDirectory && window.showDirectoryPicker) {
// // //       await selectWalletDirectory();
// // //       if (!walletDirectory) return;
// // //     }

// // //     const newAddress = "bch" + Math.random().toString(36).substring(2, 12);
// // //     const newWallet: WalletData = {
// // //       address: newAddress,
// // //       privateKey: "pk_" + Math.random().toString(36).substring(2, 44),
// // //       publicKey: "pub_" + Math.random().toString(36).substring(2, 44),
// // //       createdAt: new Date().toISOString()
// // //     };

// // //     setSelectedWallet(newWallet);
// // //     setPasswordModalOpen(true);
// // //   };

// // //   const saveWalletWithPassword = async (password: string) => {
// // //     if (!selectedWallet) return;

// // //     try {
// // //       // Simple password hash (in production, use proper hashing like bcrypt)
// // //       const passwordHash = await simpleHash(password);
      
// // //       const encryptedWallet: WalletData = {
// // //         ...selectedWallet,
// // //         encrypted: true,
// // //         passwordHash,
// // //       };

// // //       let fileSaved = false;

// // //       // Save to file system if directory is available
// // //       if (walletDirectory) {
// // //         try {
// // //           const fileName = `${selectedWallet.address}.wallet.json`;
// // //           const fileHandle = await walletDirectory.getFileHandle(fileName, { create: true });
// // //           const writable = await fileHandle.createWritable();
// // //           await writable.write(JSON.stringify(encryptedWallet, null, 2));
// // //           await writable.close();
// // //           fileSaved = true;
// // //           console.log(`Wallet saved to file: ${fileName}`);
// // //         } catch (fileError) {
// // //           console.error("Error saving wallet to file:", fileError);
// // //         }
// // //       }

// // //       // Update state and localStorage
// // //       const updatedWallets = [encryptedWallet, ...wallets];
// // //       setWallets(updatedWallets);
// // //       setConnectedWallet(selectedWallet.address);
// // //       localStorage.setItem("fileWallets", JSON.stringify(updatedWallets));
      
// // //       if (fileSaved) {
// // //         // Sync all wallets to files
// // //         await syncAllWalletsToFiles(updatedWallets);
// // //       }
      
// // //       // Close modals
// // //       setPasswordModalOpen(false);
// // //       setSelectedWallet(null);
// // //       setImportPassword("");

// // //     } catch (error) {
// // //       console.error("Error saving wallet:", error);
// // //       alert("Error saving wallet. Please try again.");
// // //     }
// // //   };

// // //   const syncAllWalletsToFiles = async (walletsToSync: WalletData[]) => {
// // //     if (!walletDirectory) return;

// // //     try {
// // //       for (const wallet of walletsToSync) {
// // //         try {
// // //           const fileName = `${wallet.address}.wallet.json`;
// // //           const fileHandle = await walletDirectory.getFileHandle(fileName, { create: true });
// // //           const writable = await fileHandle.createWritable();
// // //           await writable.write(JSON.stringify(wallet, null, 2));
// // //           await writable.close();
// // //         } catch (error) {
// // //           console.error(`Error syncing wallet ${wallet.address}:`, error);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error syncing wallets to files:", error);
// // //     }
// // //   };

// // //   const handleSelectWallet = (wallet: WalletData) => {
// // //     setSelectedWallet(wallet);
// // //     setPasswordModalOpen(true);
// // //   };

// // //   const unlockWallet = async () => {
// // //     if (!selectedWallet) return;

// // //     try {
// // //       const passwordHash = await simpleHash(importPassword);
      
// // //       // Check in-memory wallets first
// // //       const storedWallet = wallets.find(w => w.address === selectedWallet.address);
      
// // //       if (storedWallet && storedWallet.passwordHash === passwordHash) {
// // //         setConnectedWallet(selectedWallet.address);
// // //         setDropdownOpen(false);
// // //         setPasswordModalOpen(false);
// // //         setSelectedWallet(null);
// // //         setImportPassword("");
// // //         return;
// // //       }

// // //       // Try to load from file
// // //       if (walletDirectory) {
// // //         try {
// // //           const fileName = `${selectedWallet.address}.wallet.json`;
// // //           const fileHandle = await walletDirectory.getFileHandle(fileName);
// // //           const file = await fileHandle.getFile();
// // //           const content = await file.text();
// // //           const fileWallet: WalletData = JSON.parse(content);
          
// // //           if (fileWallet.passwordHash === passwordHash) {
// // //             setConnectedWallet(selectedWallet.address);
// // //             setDropdownOpen(false);
// // //             setPasswordModalOpen(false);
// // //             setSelectedWallet(null);
// // //             setImportPassword("");
// // //             return;
// // //           }
// // //         } catch (fileError) {
// // //           console.error("Error reading wallet file:", fileError);
// // //         }
// // //       }
      
// // //       alert("Invalid password");
// // //     } catch (error) {
// // //       console.error("Error unlocking wallet:", error);
// // //       alert("Invalid password or corrupted wallet file");
// // //     }
// // //   };

// // //   // Simple hash function (replace with proper hashing in production)
// // //   const simpleHash = async (input: string): Promise<string> => {
// // //     const encoder = new TextEncoder();
// // //     const data = encoder.encode(input);
// // //     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
// // //     const hashArray = Array.from(new Uint8Array(hashBuffer));
// // //     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
// // //   };

// // //   // Simple avatar generator based on wallet address
// // //   const getAvatarColor = (wallet: string) => {
// // //     const colors = [
// // //       "bg-blue-500",
// // //       "bg-green-500",
// // //       "bg-purple-500",
// // //       "bg-red-500",
// // //       "bg-indigo-500",
// // //       "bg-pink-500",
// // //     ];
// // //     const index = wallet.length % colors.length;
// // //     return colors[index];
// // //   };

// // //   const handleKeyPress = (e: React.KeyboardEvent) => {
// // //     if (e.key === 'Enter') {
// // //       if (selectedWallet && wallets.find(w => w.address === selectedWallet.address)) {
// // //         unlockWallet();
// // //       } else {
// // //         saveWalletWithPassword(importPassword);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <header className="sticky top-0 z-50 w-full border-b border-border glass">
// // //       <div className="container mx-auto px-4 py-3">
// // //         <div className="flex items-center justify-between gap-4">
// // //           {/* Logo */}
// // //           <Link
// // //             to="/"
// // //             className="flex items-center gap-2 hover:opacity-80 transition-opacity"
// // //           >
// // //             <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">
// // //               BT
// // //             </div>
// // //             <span className="text-xl font-bold hidden sm:inline">BlazeTube</span>
// // //           </Link>

// // //           {/* Navigation Links */}
// // //           <nav className="hidden lg:flex items-center gap-4 text-sm">
// // //             <Link to="/explore" className="hover:text-primary transition-colors">
// // //               Explore
// // //             </Link>
// // //             <Link to="/dashboard" className="hover:text-primary transition-colors">
// // //               Dashboard
// // //             </Link>
// // //             <Link to="/profile" className="hover:text-primary transition-colors">
// // //               Profile
// // //             </Link>
// // //           </nav>

// // //           {/* Search Bar */}
// // //           <div className="flex-1 max-w-2xl">
// // //             <div className="relative">
// // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
// // //               <Input
// // //                 type="search"
// // //                 placeholder="Search videos, creators, categories..."
// // //                 className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Actions */}
// // //           <div className="relative flex items-center gap-2">
// // //             <Link to="/dashboard">
// // //               <Button variant="ghost" size="icon" className="hidden md:flex">
// // //                 <Upload className="w-5 h-5" />
// // //               </Button>
// // //             </Link>

// // //             {/* Wallet Dropdown */}
// // //             <div className="relative" ref={dropdownRef}>
// // //               <Button
// // //                 variant="hero"
// // //                 size="sm"
// // //                 className="gap-2"
// // //                 onClick={() => setDropdownOpen(!dropdownOpen)}
// // //                 disabled={isInitializing}
// // //               >
// // //                 <Wallet className="w-4 h-4" />
// // //                 <span className="hidden sm:inline">
// // //                   {isInitializing ? "Loading..." : connectedWallet ? "Wallet Connected" : "Connect Wallet"}
// // //                 </span>
// // //               </Button>

// // //               {dropdownOpen && (
// // //                 <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
// // //                   <div className="flex justify-between items-center">
// // //                     <p className="text-sm font-semibold text-gray-800">Your Wallets</p>
// // //                     <Button
// // //                       variant="ghost"
// // //                       size="icon"
// // //                       onClick={() => setDropdownOpen(false)}
// // //                       className="h-6 w-6"
// // //                     >
// // //                       <X className="w-4 h-4 text-gray-600" />
// // //                     </Button>
// // //                   </div>

// // //                   {!walletDirectory && window.showDirectoryPicker && (
// // //                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
// // //                       <p className="text-sm text-blue-800 mb-2">
// // //                         Choose where to store your wallet files securely
// // //                       </p>
// // //                       <Button
// // //                         variant="outline"
// // //                         size="sm"
// // //                         onClick={selectWalletDirectory}
// // //                         className="w-full gap-2"
// // //                       >
// // //                         <FolderOpen className="w-4 h-4" />
// // //                         Select Documents Folder
// // //                       </Button>
// // //                       <p className="text-xs text-blue-600 mt-2">
// // //                         Or continue with browser storage (less secure)
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {walletDirectory && (
// // //                     <div className="bg-green-50 border border-green-200 rounded-lg p-2">
// // //                       <p className="text-xs text-green-700 flex items-center gap-1">
// // //                         <FolderOpen className="w-3 h-3" />
// // //                         Files saved to your selected folder
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {wallets.length > 0 && (
// // //                     <>
// // //                       <div className="max-h-60 overflow-y-auto">
// // //                         {wallets.map((wallet, idx) => (
// // //                           <Button
// // //                             key={idx}
// // //                             variant={connectedWallet === wallet.address ? "default" : "outline"}
// // //                             onClick={() => handleSelectWallet(wallet)}
// // //                             className={`flex items-center gap-3 text-sm py-2 w-full mb-2 ${
// // //                               connectedWallet === wallet.address
// // //                                 ? "bg-primary text-white hover:bg-primary/90"
// // //                                 : "hover:bg-gray-100"
// // //                             }`}
// // //                           >
// // //                             <div
// // //                               className={`w-8 h-8 rounded-full ${getAvatarColor(
// // //                                 wallet.address
// // //                               )} flex items-center justify-center text-white font-semibold text-xs`}
// // //                             >
// // //                               {wallet.address.slice(2, 4).toUpperCase()}
// // //                             </div>
// // //                             <div className="flex-1 text-left">
// // //                               <div className="font-medium truncate">
// // //                                 {wallet.address.slice(0, 10)}...{wallet.address.slice(-6)}
// // //                               </div>
// // //                               <div className="text-xs text-gray-500">
// // //                                 Created: {new Date(wallet.createdAt).toLocaleDateString()}
// // //                               </div>
// // //                             </div>
// // //                             <Key className="w-4 h-4" />
// // //                           </Button>
// // //                         ))}
// // //                       </div>
// // //                       <hr className="my-2 border-gray-200" />
// // //                     </>
// // //                   )}

// // //                   <Button
// // //                     variant="secondary"
// // //                     size="sm"
// // //                     onClick={handleCreateWallet}
// // //                     className="bg-green-500 hover:bg-green-600 text-white gap-2"
// // //                     disabled={isInitializing}
// // //                   >
// // //                     <FileKey className="w-4 h-4" />
// // //                     {wallets.length > 0 ? "Create New Wallet" : "Create First Wallet"}
// // //                   </Button>

// // //                   {connectedWallet && (
// // //                     <p className="mt-2 text-xs text-green-600 truncate">
// // //                       Connected: {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Password Modal */}
// // //             {passwordModalOpen && (
// // //               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //                 <div className="bg-white rounded-xl p-6 w-96">
// // //                   <h3 className="text-lg font-semibold mb-4">
// // //                     {selectedWallet && wallets.find(w => w.address === selectedWallet.address) 
// // //                       ? "Unlock Wallet" 
// // //                       : "Secure Your Wallet"}
// // //                   </h3>
                  
// // //                   <div className="space-y-4">
// // //                     <div>
// // //                       <label className="text-sm font-medium text-gray-700 mb-2 block">
// // //                         Password
// // //                       </label>
// // //                       <Input
// // //                         type="password"
// // //                         value={importPassword}
// // //                         onChange={(e) => setImportPassword(e.target.value)}
// // //                         onKeyPress={handleKeyPress}
// // //                         placeholder="Enter your wallet password"
// // //                         className="w-full"
// // //                         autoFocus
// // //                       />
// // //                     </div>

// // //                     {selectedWallet && (
// // //                       <div className="bg-gray-50 rounded-lg p-3">
// // //                         <p className="text-sm text-gray-600">
// // //                           Wallet: {selectedWallet.address.slice(0, 10)}...{selectedWallet.address.slice(-6)}
// // //                         </p>
// // //                         {walletDirectory && (
// // //                           <p className="text-xs text-gray-500 mt-1">
// // //                             Stored in: {selectedWallet.address}.wallet.json
// // //                           </p>
// // //                         )}
// // //                       </div>
// // //                     )}

// // //                     <div className="flex gap-3 justify-end">
// // //                       <Button
// // //                         variant="outline"
// // //                         onClick={() => {
// // //                           setPasswordModalOpen(false);
// // //                           setSelectedWallet(null);
// // //                           setImportPassword("");
// // //                         }}
// // //                       >
// // //                         Cancel
// // //                       </Button>
// // //                       <Button
// // //                         onClick={selectedWallet && wallets.find(w => w.address === selectedWallet.address) 
// // //                           ? unlockWallet 
// // //                           : () => saveWalletWithPassword(importPassword)
// // //                         }
// // //                         disabled={!importPassword.trim()}
// // //                         className="bg-primary text-white"
// // //                       >
// // //                         {selectedWallet && wallets.find(w => w.address === selectedWallet.address) 
// // //                           ? "Unlock" 
// // //                           : "Create & Save"}
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             <Link to="/profile">
// // //               <Button variant="outline" size="icon" className="hidden md:flex">
// // //                 <User className="w-5 h-5" />
// // //               </Button>
// // //             </Link>

// // //             <Button variant="ghost" size="icon" className="md:hidden">
// // //               <Menu className="w-5 h-5" />
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // };
// // import { useState, useEffect, useRef } from "react";
// // import { Search, Wallet, User, Upload, Menu, X, Key, FileKey, FolderOpen } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Link } from "react-router-dom";

// // interface FileSystemAccess {
// //   showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
// //   showOpenFilePicker?: (options?) => Promise<FileSystemFileHandle[]>;
// // }

// // declare global {
// //   interface Window {
// //     showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
// //     showOpenFilePicker?: (options) => Promise<FileSystemFileHandle[]>;
// //   }
// // }

// // interface WalletData {
// //   address: string;
// //   privateKey: string;
// //   publicKey: string;
// //   createdAt: string;
// //   encrypted?: boolean;
// //   passwordHash?: string;
// // }

// // export const Header = () => {
// //   const [wallets, setWallets] = useState<WalletData[]>([]);
// //   const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [passwordModalOpen, setPasswordModalOpen] = useState(false);
// //   const [importPassword, setImportPassword] = useState("");
// //   const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
// //   const [walletDirectory, setWalletDirectory] = useState<FileSystemDirectoryHandle | null>(null);
// //   const [isInitializing, setIsInitializing] = useState(false);
// //   const [isGenerating, setIsGenerating] = useState(false);

// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     loadWalletsFromLocalStorage();
// //   }, []);

// //   const loadWalletsFromLocalStorage = () => {
// //     try {
// //       const saved = localStorage.getItem("bchWallets");
// //       if (saved) {
// //         const walletData: WalletData[] = JSON.parse(saved);
// //         setWallets(walletData);
// //         if (walletData.length > 0 && !connectedWallet) {
// //           setConnectedWallet(walletData[0].address);
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error loading wallets from localStorage:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //         setDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const selectWalletDirectory = async () => {
// //     if (!window.showDirectoryPicker) {
// //       alert("File System Access API not supported in your browser. Using browser storage instead.");
// //       return;
// //     }
// //     try {
// //       setIsInitializing(true);
// //       const directory = await window.showDirectoryPicker();
// //       setWalletDirectory(directory);
// //       await loadWalletsFromDirectory(directory);
// //     } catch (error) {
// //       console.error("Error selecting directory:", error);
// //     } finally {
// //       setIsInitializing(false);
// //     }
// //   };

// //   const loadWalletsFromDirectory = async (directory: FileSystemDirectoryHandle) => {
// //     try {
// //       const savedWallets: WalletData[] = JSON.parse(localStorage.getItem("bchWallets") || "[]");
// //       setWallets(savedWallets);
// //       if (savedWallets.length > 0 && !connectedWallet) {
// //         setConnectedWallet(savedWallets[0].address);
// //       }
// //     } catch (error) {
// //       console.error("Error loading wallets from directory:", error);
// //     }
// //   };

// //   const generateBCHWalletFromBackend = async (): Promise<WalletData | null> => {
// //     try {
// //       setIsGenerating(true);
// //       const response = await fetch("http://localhost:3001/api/generate/generate-wallet", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //       });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const data = await response.json();
// //       if (data.success) {
// //         return {
// //           address: data.address,
// //           privateKey: data.privateKey,
// //           publicKey: data.publicKey,
// //           createdAt: new Date().toISOString(),
// //         };
// //       } else {
// //         throw new Error(data.error || "Failed to generate wallet");
// //       }
// //     } catch (error) {
// //       console.error("Error generating BCH wallet:", error);
// //       return null;
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   const handleCreateWallet = async () => {
// //     if (!walletDirectory && window.showDirectoryPicker) {
// //       await selectWalletDirectory();
// //       if (!walletDirectory) return;
// //     }
// //     const newWallet = await generateBCHWalletFromBackend();
// //     if (newWallet) {
// //       setSelectedWallet(newWallet);
// //       setPasswordModalOpen(true);
// //     }
// //   };

// //   const saveWalletWithPassword = async (password: string) => {
// //     if (!selectedWallet) return;
// //     try {
// //       const passwordHash = await simpleHash(password);
// //       const encryptedWallet: WalletData = { ...selectedWallet, encrypted: true, passwordHash };
// //       const updatedWallets = [encryptedWallet, ...wallets];
// //       setWallets(updatedWallets);
// //       setConnectedWallet(selectedWallet.address);
// //       localStorage.setItem("bchWallets", JSON.stringify(updatedWallets));
// //       setPasswordModalOpen(false);
// //       setSelectedWallet(null);
// //       setImportPassword("");
// //       alert("BCH wallet created successfully!");
// //     } catch (error) {
// //       console.error("Error saving wallet:", error);
// //     }
// //   };

// //   const simpleHash = async (input: string): Promise<string> => {
// //     const encoder = new TextEncoder();
// //     const data = encoder.encode(input);
// //     const hashBuffer = await crypto.subtle.digest("SHA-256", data);
// //     return Array.from(new Uint8Array(hashBuffer))
// //       .map((b) => b.toString(16).padStart(2, "0"))
// //       .join("");
// //   };

// //   const getAvatarColor = (wallet?: string | null) => {
// //     const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-indigo-500", "bg-pink-500"];
// //     const index = wallet?.length ? wallet.length % colors.length : 0;
// //     return colors[index];
// //   };

// //   const formatWallet = (wallet: string | null) => (wallet ? `${wallet.slice(0, 8)}...${wallet.slice(-8)}` : "None");

// //   const handleKeyPress = (e: React.KeyboardEvent) => {
// //     if (e.key === "Enter") {
// //       if (selectedWallet && wallets.find((w) => w.address === selectedWallet.address)) {
// //         unlockWallet();
// //       } else {
// //         saveWalletWithPassword(importPassword);
// //       }
// //     }
// //   };

// //   const handleSelectWallet = (wallet: WalletData) => {
// //     setSelectedWallet(wallet);
// //     setPasswordModalOpen(true);
// //   };

// //   const unlockWallet = async () => {
// //     if (!selectedWallet) return;
// //     const passwordHash = await simpleHash(importPassword);
// //     const storedWallet = wallets.find((w) => w.address === selectedWallet.address);
// //     if (storedWallet?.passwordHash === passwordHash) {
// //       setConnectedWallet(selectedWallet.address);
// //       setDropdownOpen(false);
// //       setPasswordModalOpen(false);
// //       setSelectedWallet(null);
// //       setImportPassword("");
// //       return;
// //     }
// //     alert("Invalid password");
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 w-full border-b border-border glass">
// //       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
// //         <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
// //           <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">BT</div>
// //           <span className="text-xl font-bold hidden sm:inline">BlazeTube</span>
// //         </Link>

// //         <div className="flex-1 max-w-2xl relative">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
// //           <Input type="search" placeholder="Search videos, creators, categories..." className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors" />
// //         </div>

// //         <div className="relative flex items-center gap-2">
// //           <Button variant="hero" size="sm" className="gap-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
// //             <Wallet className="w-4 h-4" />
// //             <span className="hidden sm:inline">{connectedWallet ? "Wallet Connected" : "Connect Wallet"}</span>
// //           </Button>

// //           {dropdownOpen && (
// //             <div ref={dropdownRef} className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50">
// //               <div className="flex justify-between items-center">
// //                 <p className="text-sm font-semibold text-gray-800">Your BCH Wallets</p>
// //                 <Button variant="ghost" size="icon" onClick={() => setDropdownOpen(false)} className="h-6 w-6">
// //                   <X className="w-4 h-4 text-gray-600" />
// //                 </Button>
// //               </div>

// //               {wallets.length > 0 ? (
// //                 <div className="max-h-60 overflow-y-auto">
// //                   {wallets.map((wallet, idx) => (
// //                     <Button
// //                       key={idx}
// //                       variant={connectedWallet === wallet.address ? "default" : "outline"}
// //                       onClick={() => handleSelectWallet(wallet)}
// //                       className={`flex items-center gap-3 text-sm py-2 w-full mb-2 ${
// //                         connectedWallet === wallet.address ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-gray-100"
// //                       }`}
// //                     >
// //                       <div className={`w-8 h-8 rounded-full ${getAvatarColor(wallet.address)} flex items-center justify-center text-white font-semibold text-xs`}>
// //                         {wallet.address?.slice(0, 2)?.toUpperCase() ?? "??"}
// //                       </div>
// //                       <div className="flex-1 text-left">
// //                         <div className="font-medium truncate text-xs">{wallet.address ?? "Unknown"}</div>
// //                         <div className="text-xs text-gray-500">Created: {wallet.createdAt ? new Date(wallet.createdAt).toLocaleDateString() : "Unknown"}</div>
// //                       </div>
// //                       <Key className="w-4 h-4" />
// //                     </Button>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <p className="text-sm text-gray-500">No wallets found</p>
// //               )}

// //               <Button variant="secondary" size="sm" onClick={handleCreateWallet} className="bg-green-500 hover:bg-green-600 text-white gap-2">
// //                 <FileKey className="w-4 h-4" />
// //                 {wallets.length > 0 ? "Create New BCH Wallet" : "Create First BCH Wallet"}
// //               </Button>

// //               {connectedWallet && (
// //                 <p className="mt-2 text-xs text-green-600 truncate">Connected: {formatWallet(connectedWallet)}</p>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };


// import { useState, useEffect, useRef } from "react";
// import { Search, Wallet, User, Upload, Menu, X, Key, FileKey, FolderOpen } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";

// interface BackendWalletResponse {
//   success: boolean;
//   wallet: {
//     address: string;
//     pubKey: string;
//     wif: string;
//     privKeyHex: string;
//   };
// }

// interface WalletData {
//   address: string;
//   publicKey: string;
//   privateKey: string; // WIF format
//   privateKeyHex: string;
//   createdAt: string;
//   encrypted?: boolean;
//   passwordHash?: string;
// }

// interface FileSystemAccess {
//   showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
//   showOpenFilePicker?: (options?) => Promise<FileSystemFileHandle[]>;
// }

// declare global {
//   interface Window {
//     showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
//     showOpenFilePicker?: (options) => Promise<FileSystemFileHandle[]>;
//   }
// }

// export const Header = () => {
//   const [wallets, setWallets] = useState<WalletData[]>([]);
//   const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [passwordModalOpen, setPasswordModalOpen] = useState(false);
//   const [importPassword, setImportPassword] = useState("");
//   const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
//   const [walletDirectory, setWalletDirectory] = useState<FileSystemDirectoryHandle | null>(null);
//   const [isInitializing, setIsInitializing] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     loadWalletsFromLocalStorage();
//   }, []);

//   const loadWalletsFromLocalStorage = () => {
//     try {
//       const saved = localStorage.getItem("bchWallets");
//       if (saved) {
//         const walletData: WalletData[] = JSON.parse(saved);
//         setWallets(walletData);
//         if (walletData.length > 0 && !connectedWallet) {
//           setConnectedWallet(walletData[0].address);
//         }
//       }
//     } catch (error) {
//       console.error("Error loading wallets from localStorage:", error);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const selectWalletDirectory = async () => {
//     if (!window.showDirectoryPicker) {
//       alert("File System Access API not supported. Using browser storage.");
//       return;
//     }
//     try {
//       setIsInitializing(true);
//       const directory = await window.showDirectoryPicker();
//       setWalletDirectory(directory);
//       await loadWalletsFromDirectory(directory);
//     } catch (error) {
//       console.error("Error selecting directory:", error);
//     } finally {
//       setIsInitializing(false);
//     }
//   };

//   const loadWalletsFromDirectory = async (directory: FileSystemDirectoryHandle) => {
//     try {
//       const savedWallets: WalletData[] = JSON.parse(localStorage.getItem("bchWallets") || "[]");
//       setWallets(savedWallets);
//       if (savedWallets.length > 0 && !connectedWallet) {
//         setConnectedWallet(savedWallets[0].address);
//       }
//     } catch (error) {
//       console.error("Error loading wallets from directory:", error);
//     }
//   };

//   // **MODIFIED: Handle your exact backend response format**
//   const generateBCHWalletFromBackend = async (): Promise<WalletData | null> => {
//     try {
//       setIsGenerating(true);
//       const response = await fetch("http://localhost:3001/api/generate/generate-wallet", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
      
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
//       const data: BackendWalletResponse = await response.json();
      
//       if (data.success && data.wallet) {
//         return {
//           address: data.wallet.address,
//           publicKey: data.wallet.pubKey,
//           privateKey: data.wallet.wif, // WIF format
//           privateKeyHex: data.wallet.privKeyHex,
//           createdAt: new Date().toISOString(),
//         };
//       } else {
//         throw new Error( "Failed to generate wallet");
//       }
//     } catch (error) {
//       console.error("Error generating BCH wallet:", error);
//       alert(`Failed to generate wallet: ${error}`);
//       return null;
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleCreateWallet = async () => {
//     if (!walletDirectory && window.showDirectoryPicker) {
//       await selectWalletDirectory();
//       if (!walletDirectory) return;
//     }
    
//     const newWallet = await generateBCHWalletFromBackend();
//     if (newWallet) {
//       setSelectedWallet(newWallet);
//       setPasswordModalOpen(true);
//     }
//   };

//   const saveWalletWithPassword = async (password: string) => {
//     if (!selectedWallet) return;
    
//     try {
//       const passwordHash = await simpleHash(password);
//       const encryptedWallet: WalletData = { 
//         ...selectedWallet, 
//         encrypted: true, 
//         passwordHash 
//       };
      
//       const updatedWallets = [encryptedWallet, ...wallets];
//       setWallets(updatedWallets);
//       setConnectedWallet(selectedWallet.address);
//       localStorage.setItem("bchWallets", JSON.stringify(updatedWallets));
      
//       // Save to file system if directory selected
//       if (walletDirectory) {
//         await saveWalletToFile(encryptedWallet);
//       }
      
//       setPasswordModalOpen(false);
//       setSelectedWallet(null);
//       setImportPassword("");
//       alert("✅ BCH wallet created and secured successfully!");
//     } catch (error) {
//       console.error("Error saving wallet:", error);
//       alert("❌ Error saving wallet. Please try again.");
//     }
//   };

//   // Save individual wallet to file
//   const saveWalletToFile = async (wallet: WalletData) => {
//     if (!walletDirectory) return;
//     try {
//       const fileName = `${wallet.address}.bch.wallet.json`;
//       const fileHandle = await walletDirectory.getFileHandle(fileName, { create: true });
//       const writable = await fileHandle.createWritable();
//       await writable.write(JSON.stringify(wallet, null, 2));
//       await writable.close();
//       console.log(`✅ Wallet saved: ${fileName}`);
//     } catch (error) {
//       console.error("Error saving wallet file:", error);
//     }
//   };

//   const simpleHash = async (input: string): Promise<string> => {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(input);
//     const hashBuffer = await crypto.subtle.digest("SHA-256", data);
//     return Array.from(new Uint8Array(hashBuffer))
//       .map((b) => b.toString(16).padStart(2, "0"))
//       .join("");
//   };

//   const getAvatarColor = (wallet?: string | null) => {
//     const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-indigo-500", "bg-pink-500"];
//     const index = wallet?.length ? wallet.length % colors.length : 0;
//     return colors[index];
//   };

//   const formatWallet = (wallet: string | null) => 
//     wallet ? `${wallet.slice(0, 8)}...${wallet.slice(-8)}` : "None";

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       if (selectedWallet && wallets.find((w) => w.address === selectedWallet.address)) {
//         unlockWallet();
//       } else {
//         saveWalletWithPassword(importPassword);
//       }
//     }
//   };

//   const handleSelectWallet = (wallet: WalletData) => {
//     setSelectedWallet(wallet);
//     setPasswordModalOpen(true);
//   };

//   const unlockWallet = async () => {
//     if (!selectedWallet) return;
//     const passwordHash = await simpleHash(importPassword);
//     const storedWallet = wallets.find((w) => w.address === selectedWallet.address);
//     if (storedWallet?.passwordHash === passwordHash) {
//       setConnectedWallet(selectedWallet.address);
//       setDropdownOpen(false);
//       setPasswordModalOpen(false);
//       setSelectedWallet(null);
//       setImportPassword("");
//       alert("✅ Wallet unlocked successfully!");
//       return;
//     }
//     alert("❌ Invalid password");
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border glass">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between gap-4">
//           {/* **RESTORED: Logo ** */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//           >
//             <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">
//               BT
//             </div>
//             <span className="text-xl font-bold hidden sm:inline">BlazeTube</span>
//           </Link>

//           {/* **RESTORED: Navigation Links ** */}
//           <nav className="hidden lg:flex items-center gap-4 text-sm">
//             <Link to="/explore" className="hover:text-primary transition-colors">
//               Explore
//             </Link>
//             <Link to="/dashboard" className="hover:text-primary transition-colors">
//               Dashboard
//             </Link>
//             <Link to="/profile" className="hover:text-primary transition-colors">
//               Profile
//             </Link>
//           </nav>

//           {/* **RESTORED: Search Bar ** */}
//           <div className="flex-1 max-w-2xl">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//               <Input
//                 type="search"
//                 placeholder="Search videos, creators, categories..."
//                 className="pl-10 bg-muted/50 border-border focus:border-primary transition-colors"
//               />
//             </div>
//           </div>

//           {/* **RESTORED: Actions Section ** */}
//           <div className="relative flex items-center gap-2">
//             {/* Upload Button */}
//             <Link to="/dashboard">
//               <Button variant="ghost" size="icon" className="hidden md:flex">
//                 <Upload className="w-5 h-5" />
//               </Button>
//             </Link>

//             {/* **Wallet Dropdown - MODIFIED FOR YOUR BACKEND** */}
//             <div className="relative" ref={dropdownRef}>
//               <Button
//                 variant="hero"
//                 size="sm"
//                 className="gap-2"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 disabled={isGenerating || isInitializing}
//               >
//                 <Wallet className="w-4 h-4" />
//                 <span className="hidden sm:inline">
//                   {isGenerating 
//                     ? "Generating..." 
//                     : connectedWallet 
//                       ? "Wallet Connected" 
//                       : "Connect Wallet"
//                   }
//                 </span>
//               </Button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 flex flex-col gap-3 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-semibold text-gray-800">Your BCH Wallets</p>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setDropdownOpen(false)}
//                       className="h-6 w-6"
//                     >
//                       <X className="w-4 h-4 text-gray-600" />
//                     </Button>
//                   </div>

//                   {/* Directory Selection */}
//                   {!walletDirectory && window.showDirectoryPicker && (
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                       <p className="text-sm text-blue-800 mb-2">Choose folder to store wallet files</p>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={selectWalletDirectory}
//                         className="w-full gap-2"
//                         disabled={isInitializing}
//                       >
//                         <FolderOpen className="w-4 h-4" />
//                         Select Wallet Folder
//                       </Button>
//                     </div>
//                   )}

//                   {walletDirectory && (
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-2">
//                       <p className="text-xs text-green-700 flex items-center gap-1">
//                         <FolderOpen className="w-3 h-3" />
//                         Files saved to selected folder
//                       </p>
//                     </div>
//                   )}

//                   {/* Wallet List */}
//                   {wallets.length > 0 ? (
//                     <div className="max-h-60 overflow-y-auto">
//                       {wallets.map((wallet, idx) => (
//                         <Button
//                           key={idx}
//                           variant={connectedWallet === wallet.address ? "default" : "outline"}
//                           onClick={() => handleSelectWallet(wallet)}
//                           className={`flex items-center gap-3 text-sm py-2 w-full mb-2 ${
//                             connectedWallet === wallet.address
//                               ? "bg-primary text-white hover:bg-primary/90"
//                               : "hover:bg-gray-100"
//                           }`}
//                         >
//                           <div
//                             className={`w-8 h-8 rounded-full ${getAvatarColor(
//                               wallet.address
//                             )} flex items-center justify-center text-white font-semibold text-xs`}
//                           >
//                             {wallet.address.slice(4, 6).toUpperCase()}
//                           </div>
//                           <div className="flex-1 text-left">
//                             <div className="font-medium truncate text-xs">
//                               {formatWallet(wallet.address)}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               Created: {new Date(wallet.createdAt).toLocaleDateString()}
//                             </div>
//                           </div>
//                           <Key className="w-4 h-4" />
//                         </Button>
//                       ))}
//                       <hr className="my-2 border-gray-200" />
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-500 italic">No wallets yet. Create your first!</p>
//                   )}

//                   {/* Create New Wallet Button */}
//                   <Button
//                     variant="secondary"
//                     size="sm"
//                     onClick={handleCreateWallet}
//                     className="bg-green-500 hover:bg-green-600 text-white gap-2"
//                     disabled={isGenerating}
//                   >
//                     <FileKey className="w-4 h-4" />
//                     {wallets.length > 0 ? "Create New BCH Wallet" : "Create First BCH Wallet"}
//                   </Button>

//                   {/* Connected Wallet Info */}
//                   {connectedWallet && (
//                     <p className="mt-2 text-xs text-green-600 truncate">
//                       Connected: {formatWallet(connectedWallet)}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* **RESTORED: User Profile Button ** */}
//             <Link to="/profile">
//               <Button variant="outline" size="icon" className="hidden md:flex">
//                 <User className="w-5 h-5" />
//               </Button>
//             </Link>

//             {/* **RESTORED: Mobile Menu Button ** */}
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Menu className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* **RESTORED: Password Modal ** */}
//       {passwordModalOpen && selectedWallet && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-32">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mt-4">
//             <h3 className="text-lg font-semibold mb-4">
//               {wallets.find((w) => w.address === selectedWallet.address)
//                 ? "🔓 Unlock Wallet"
//                 : "🔐 Secure Your Wallet"}
//             </h3>
            
//             <div className="space-y-4">
//               <Input
//                 type="password"
//                 value={importPassword}
//                 onChange={(e) => setImportPassword(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder={
//                   wallets.find((w) => w.address === selectedWallet.address)
//                     ? "Enter wallet password"
//                     : "Create strong password"
//                 }
//                 className="w-full"
//                 autoFocus
//               />

//               {selectedWallet && (
//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="text-sm text-gray-600 mb-1">
//                     Address: {formatWallet(selectedWallet.address)}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {walletDirectory ? `Saved: ${selectedWallet.address}.bch.wallet.json` : "Browser storage"}
//                   </p>
//                 </div>
//               )}

//               <div className="flex gap-3 justify-end">
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setPasswordModalOpen(false);
//                     setSelectedWallet(null);
//                     setImportPassword("");
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={
//                     wallets.find((w) => w.address === selectedWallet.address)
//                       ? unlockWallet
//                       : () => saveWalletWithPassword(importPassword)
//                   }
//                   disabled={!importPassword.trim()}
//                   className="bg-primary text-white"
//                 >
//                   {wallets.find((w) => w.address === selectedWallet.address) ? "Unlock" : "Create & Save"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

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