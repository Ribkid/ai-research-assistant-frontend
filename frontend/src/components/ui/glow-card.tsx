"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ 
  children, 
  className = "",
  glowColor = "rgba(168, 85, 247, 0.3)"
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "relative p-8 rounded-2xl bg-purple-900/10 backdrop-blur-sm border border-purple-800/20 overflow-hidden group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-50 transition-opacity duration-500">
        <div className="h-full w-full rounded-2xl bg-background" />
      </div>
    </motion.div>
  );
}