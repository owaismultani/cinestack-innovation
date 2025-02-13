"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsFocused] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg border-b border-white/10 dark:border-black/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Movies", "TV Shows", "Watchlist"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="#" // {`/${item.toLowerCase().replace(" ", "-")}`}
                className="relative text-sm font-medium transition-all before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r from-blue-500 to-purple-500 before:transition-all before:duration-300 hover:before:w-full hover:text-primary"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <motion.form
            onSubmit={handleSearch}
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.05 }}
            className="relative w-full max-w-md transition-all duration-300"
          >
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors" />
            <Input
              placeholder="Search movies, TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`pl-10 w-full rounded-full shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-400`}
            />
          </motion.form>
        </div>

        {/* User & Mobile Navigation */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                    <User className="h-5 w-5 text-primary" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsSignedIn(false)}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                onClick={() => setIsSignedIn(true)}
                className="transition-transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg"
              >
                Sign In
              </Button>
            </motion.div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {["Movies", "TV Shows", "Watchlist"].map((item) => (
                  <Link
                    key={item}
                    href="#" // {`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              {/* Mobile Search */}
              <div className="mt-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-2 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search movies, TV shows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full rounded-lg"
                    />
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
