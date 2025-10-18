import { Search, Wallet, User, Upload, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-xl">
              BT
            </div>
            <span className="text-xl font-bold hidden sm:inline">BlazeTube</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 text-sm">
            <Link to="/explore" className="hover:text-primary transition-colors">
              Explore
            </Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/profile" className="hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>

          {/* Search Bar */}
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

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Upload className="w-5 h-5" />
              </Button>
            </Link>
            
            <Button variant="hero" size="sm" className="gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
            </Button>

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
    </header>
  );
};
