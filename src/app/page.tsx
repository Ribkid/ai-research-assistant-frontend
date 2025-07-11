'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BlurFade } from '@/components/ui/blur-fade';
import { WordRotate } from '@/components/ui/word-rotate';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { SparklesText } from '@/components/ui/sparkles-text';

export default function Home() {
  const { status } = useSession();

  const features = [
    "Systematic Research",
    "Advanced Analysis", 
    "Source Verification",
    "Intelligence Reports"
  ];

  return (
    <div className="text-gray-800 font-sans">
      <ScrollProgress className="z-50" />
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
        )}
      />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <BlurFade delay={0.1}>
            <h1 className="text-2xl font-bold text-gray-900">AI Research Assistant</h1>
          </BlurFade>
          <nav className="hidden md:flex items-center space-x-6">
            <BlurFade delay={0.2}>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
            </BlurFade>
            <BlurFade delay={0.3}>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
            </BlurFade>
            {status === 'authenticated' ? (
              <>
                <BlurFade delay={0.4}>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
                </BlurFade>
                <BlurFade delay={0.5}>
                  <button onClick={() => signOut()} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    Sign Out
                  </button>
                </BlurFade>
              </>
            ) : (
              <>
                <BlurFade delay={0.4}>
                  <Link href="/login" className="text-gray-600 hover:text-gray-900 transition">Login</Link>
                </BlurFade>
                <BlurFade delay={0.5}>
                  <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    Get Started
                  </Link>
                </BlurFade>
              </>
            )}
          </nav>
          <button className="md:hidden text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <BlurFade delay={0.6}>
            <SparklesText className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Your Personal AI Research Powerhouse
            </SparklesText>
          </BlurFade>
          <BlurFade delay={0.8}>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Leverage advanced AI to automate research, analyze sources, and generate comprehensive reports with unparalleled speed and accuracy.
            </p>
          </BlurFade>
          <BlurFade delay={1.0}>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/signup">
                <RainbowButton size="lg">
                  Start Your Free Trial
                </RainbowButton>
              </Link>
              <Link href="/demo">
                <ShimmerButton>
                  View Demo
                </ShimmerButton>
              </Link>
            </div>
          </BlurFade>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <BlurFade delay={0.2}>
              <h3 className="text-4xl font-bold text-center text-gray-900">
                Why Choose 
                <WordRotate 
                  words={features}
                  className="text-4xl font-bold text-blue-600 mx-2"
                />
              </h3>
            </BlurFade>
            <BlurFade delay={0.4}>
              <p className="text-center text-gray-600 mt-2 mb-12">Unlock features that redefine research efficiency.</p>
            </BlurFade>
            <div className="grid md:grid-cols-3 gap-8">
              <BlurFade delay={0.6}>
                <div className="p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900">Systematic Research</h4>
                  <p className="mt-2 text-gray-600">Follows a 5-phase process: Planning, Research, Analysis, Verification, and Reporting for robust results.</p>
                </div>
              </BlurFade>
              <BlurFade delay={0.8}>
                <div className="p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900">Advanced Source Analysis</h4>
                  <p className="mt-2 text-gray-600">Automatically scores sources for credibility and verifies information to ensure data integrity.</p>
                </div>
              </BlurFade>
              <BlurFade delay={1.0}>
                <div className="p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900">Commercial Tiers</h4>
                  <p className="mt-2 text-gray-600">Flexible plans from a free tier for individuals to enterprise-grade solutions for businesses.</p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-6">
            <BlurFade delay={0.2}>
              <h3 className="text-4xl font-bold text-center text-gray-900">Flexible Pricing for Every Need</h3>
            </BlurFade>
            <BlurFade delay={0.4}>
              <p className="text-center text-gray-600 mt-2 mb-12">Choose the plan that&apos;s right for you.</p>
            </BlurFade>
            <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <BlurFade delay={0.6}>
                <div className="border rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow">
                  <h4 className="text-2xl font-bold text-gray-900">Free</h4>
                  <p className="text-4xl font-bold my-4">$0<span className="text-lg font-normal text-gray-500">/mo</span></p>
                  <ul className="space-y-2 text-gray-600">
                    <li>3 reports/month</li>
                    <li>10 sources per report</li>
                    <li>2,000 words per report</li>
                  </ul>
                  <button className="mt-auto w-full bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300 transition">Get Started</button>
                </div>
              </BlurFade>
              {/* Professional Tier */}
              <BlurFade delay={0.8}>
                <div className="border-2 border-blue-600 rounded-lg p-8 flex flex-col shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm rounded-bl-lg">
                    Most Popular
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Professional</h4>
                  <p className="text-4xl font-bold my-4">$49<span className="text-lg font-normal text-gray-500">/mo</span></p>
                  <ul className="space-y-2 text-gray-600">
                    <li>50 reports/month</li>
                    <li>100 sources per report</li>
                    <li>10,000 words per report</li>
                    <li>Executive Summaries</li>
                  </ul>
                  <RainbowButton className="mt-auto w-full">Choose Plan</RainbowButton>
                </div>
              </BlurFade>
              {/* Enterprise Tier */}
              <BlurFade delay={1.0}>
                <div className="border rounded-lg p-8 flex flex-col hover:shadow-lg transition-shadow">
                  <h4 className="text-2xl font-bold text-gray-900">Enterprise</h4>
                  <p className="text-4xl font-bold my-4">Contact Us</p>
                  <ul className="space-y-2 text-gray-600">
                    <li>Unlimited reports</li>
                    <li>Competitive Intelligence</li>
                    <li>Risk Assessment</li>
                    <li>Dedicated Support</li>
                  </ul>
                  <button className="mt-auto w-full bg-gray-200 text-gray-800 py-2 rounded-full hover:bg-gray-300 transition">Contact Sales</button>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-8 text-center text-gray-600">
          <BlurFade delay={0.2}>
            <p>&copy; 2025 AI Research Assistant. All rights reserved.</p>
          </BlurFade>
        </div>
      </footer>
    </div>
  );
}