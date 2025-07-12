'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BlurFade } from '@/components/ui/blur-fade';
import { WordRotate } from '@/components/ui/word-rotate';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { SparklesText } from '@/components/ui/sparkles-text';
import { Particles } from '@/components/ui/particles';
import { GlowCard } from '@/components/ui/glow-card';

export default function Home() {
  const { status } = useSession();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const features = [
    "Systematic Research",
    "Advanced Analysis", 
    "Source Verification",
    "Intelligence Reports"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <ScrollProgress className="z-50" />
      
      {/* Animated background elements */}
      <Particles count={30} className="z-0" />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 gradient-animated opacity-30 z-0" />
      
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-20',
        )}
      />

      {/* Header with glass morphism */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <BlurFade delay={0.1}>
            <h1 className="text-2xl font-bold glow-text">AI Research Assistant</h1>
          </BlurFade>
          <nav className="hidden md:flex items-center space-x-6">
            <BlurFade delay={0.2}>
              <a href="#features" className="text-purple-300 hover:text-purple-100 transition">Features</a>
            </BlurFade>
            <BlurFade delay={0.3}>
              <a href="#pricing" className="text-purple-300 hover:text-purple-100 transition">Pricing</a>
            </BlurFade>
            {status === 'authenticated' ? (
              <>
                <BlurFade delay={0.4}>
                  <Link href="/dashboard" className="text-purple-300 hover:text-purple-100 transition">Dashboard</Link>
                </BlurFade>
                <BlurFade delay={0.5}>
                  <button 
                    onClick={() => signOut()} 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition neon-button"
                  >
                    Sign Out
                  </button>
                </BlurFade>
              </>
            ) : (
              <>
                <BlurFade delay={0.4}>
                  <Link href="/login" className="text-purple-300 hover:text-purple-100 transition">Login</Link>
                </BlurFade>
                <BlurFade delay={0.5}>
                  <Link 
                    href="/signup" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full transition neon-button"
                  >
                    Get Started
                  </Link>
                </BlurFade>
              </>
            )}
          </nav>
          <button className="md:hidden text-purple-300 hover:text-purple-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main className="pt-24 relative z-10">
        {/* Hero Section with parallax */}
        <motion.section 
          ref={heroRef}
          className="container mx-auto px-6 py-20 text-center relative"
          style={{ y, opacity }}
        >
          <BlurFade delay={0.6}>
            <SparklesText 
              className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
              colors={{ first: "#a855f7", second: "#ec4899" }}
            >
              Your Personal AI Research Powerhouse
            </SparklesText>
          </BlurFade>
          <BlurFade delay={0.8}>
            <p className="mt-6 text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
              Leverage advanced AI to automate research, analyze sources, and generate comprehensive reports with unparalleled speed and accuracy.
            </p>
          </BlurFade>
          <BlurFade delay={1.0}>
            <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
              <Link href="/signup">
                <RainbowButton size="lg" className="w-full md:w-auto">
                  Start Your Free Trial
                </RainbowButton>
              </Link>
              <Link href="/demo">
                <ShimmerButton 
                  className="w-full md:w-auto"
                  shimmerColor="#a855f7"
                  background="rgba(88, 28, 135, 0.2)"
                >
                  View Demo
                </ShimmerButton>
              </Link>
            </div>
          </BlurFade>
          
          {/* Floating gradient orbs */}
          <motion.div
            className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.section>

        {/* Features Section with stagger animations */}
        <section id="features" className="py-20 relative">
          <div className="container mx-auto px-6">
            <BlurFade delay={0.2}>
              <h3 className="text-4xl md:text-5xl font-bold text-center glow-text">
                Why Choose 
                <WordRotate 
                  words={features}
                  className="text-4xl md:text-5xl font-bold text-purple-400 mx-2"
                />
              </h3>
            </BlurFade>
            <BlurFade delay={0.4}>
              <p className="text-center text-purple-300 mt-4 mb-12 text-lg">Unlock features that redefine research efficiency.</p>
            </BlurFade>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {[
                {
                  title: "Systematic Research",
                  description: "Follows a 5-phase process: Planning, Research, Analysis, Verification, and Reporting for robust results.",
                  icon: "🔬"
                },
                {
                  title: "Advanced Source Analysis",
                  description: "Automatically scores sources for credibility and verifies information to ensure data integrity.",
                  icon: "🔍"
                },
                {
                  title: "Commercial Tiers",
                  description: "Flexible plans from a free tier for individuals to enterprise-grade solutions for businesses.",
                  icon: "💼"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <GlowCard className="h-full">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-bold text-purple-100 mb-3">{feature.title}</h4>
                    <p className="text-purple-300">{feature.description}</p>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section with hover effects */}
        <section id="pricing" className="py-20 relative">
          <div className="container mx-auto px-6">
            <BlurFade delay={0.2}>
              <h3 className="text-4xl md:text-5xl font-bold text-center text-purple-100 glow-text">Flexible Pricing for Every Need</h3>
            </BlurFade>
            <BlurFade delay={0.4}>
              <p className="text-center text-purple-300 mt-4 mb-12 text-lg">Choose the plan that&apos;s right for you.</p>
            </BlurFade>
            
            <motion.div 
              className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {/* Free Tier */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                <GlowCard className="h-full flex flex-col">
                  <h4 className="text-2xl font-bold text-purple-100">Free</h4>
                  <p className="text-4xl font-bold my-4 text-purple-200">$0<span className="text-lg font-normal text-purple-400">/mo</span></p>
                  <ul className="space-y-2 text-purple-300 flex-grow">
                    <li>✓ 3 reports/month</li>
                    <li>✓ 10 sources per report</li>
                    <li>✓ 2,000 words per report</li>
                  </ul>
                  <button className="mt-6 w-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-100 py-3 rounded-full transition">
                    Get Started
                  </button>
                </GlowCard>
              </motion.div>

              {/* Professional Tier */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                <GlowCard 
                  className="h-full flex flex-col border-purple-600 relative overflow-hidden"
                  glowColor="rgba(168, 85, 247, 0.5)"
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-sm rounded-bl-lg">
                    Most Popular
                  </div>
                  <h4 className="text-2xl font-bold text-purple-100">Professional</h4>
                  <p className="text-4xl font-bold my-4 text-purple-200">$49<span className="text-lg font-normal text-purple-400">/mo</span></p>
                  <ul className="space-y-2 text-purple-300 flex-grow">
                    <li>✓ 50 reports/month</li>
                    <li>✓ 100 sources per report</li>
                    <li>✓ 10,000 words per report</li>
                    <li>✓ Executive Summaries</li>
                  </ul>
                  <RainbowButton className="mt-6 w-full">Choose Plan</RainbowButton>
                </GlowCard>
              </motion.div>

              {/* Enterprise Tier */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                <GlowCard className="h-full flex flex-col">
                  <h4 className="text-2xl font-bold text-purple-100">Enterprise</h4>
                  <p className="text-4xl font-bold my-4 text-purple-200">Contact Us</p>
                  <ul className="space-y-2 text-purple-300 flex-grow">
                    <li>✓ Unlimited reports</li>
                    <li>✓ Competitive Intelligence</li>
                    <li>✓ Risk Assessment</li>
                    <li>✓ Dedicated Support</li>
                  </ul>
                  <button className="mt-6 w-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-100 py-3 rounded-full transition">
                    Contact Sales
                  </button>
                </GlowCard>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer with gradient border */}
      <footer className="relative z-10 border-t border-purple-800/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
        <div className="container mx-auto px-6 py-8 text-center">
          <BlurFade delay={0.2}>
            <p className="text-purple-400">&copy; 2025 AI Research Assistant. All rights reserved.</p>
          </BlurFade>
        </div>
      </footer>
    </div>
  );
}