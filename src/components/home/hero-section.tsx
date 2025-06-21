"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { BounceButton } from "@/components/ui/bounce-button";

export default function HeroSection() {
  const { isSignedIn } = useUser(); // 👈 Clerk hook

  const words = [
    { text: "Fuel" },
    { text: "your" },
    { text: "Curiosity" },
    { text: "." },
    { text: "Read" },
    { text: "insights" },
    { text: "that" },
    {
      text: "matter.",
      className:
        "bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent",
    },
  ];

  return (
    <section className="relative bg-blue-50 dark:bg-gray-950 overflow-hidden pb-20">
      {/* Background Blobs */}
      <div className="absolute top-0 inset-x-0 h-64 flex items-start z-0">
        <div className="h-24 w-2/3 bg-gradient-to-br from-blue-500 opacity-20 blur-2xl dark:from-[#170cac] dark:opacity-40" />
        <div className="h-20 w-3/5 bg-gradient-to-r from-[#4232ce] opacity-30 blur-2xl dark:from-[#670ccf] dark:opacity-30" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[80vw] sm:w-[60vw] md:w-2/5 aspect-[2/0.5] bg-gradient-to-br from-blue-600 to-pink-400 rounded-full opacity-30 blur-2xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[36rem] px-4 text-center py-12 sm:py-20">
        <div className="p-4 sm:p-6 backdrop-blur-md">
          <TypewriterEffect words={words} />
        </div>

        <p className="text-neutral-600 dark:text-neutral-200 text-sm sm:text-base mt-4 max-w-md sm:max-w-lg">
          From deep dives in tech to stories that inspire, our blog delivers real-world insights and tutorials weekly
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          {isSignedIn ? (
            <BounceButton>
              <Link href="/dashboard">Let's get started</Link>
            </BounceButton>
          ) : (
            <BounceButton>
              <Link href="/sign-up">Sign up</Link>
            </BounceButton>
          )}
        </div>
      </div>
    </section>
  );
}
