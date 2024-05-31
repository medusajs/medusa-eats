"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

export default function LottiePlayer({ src }: { src: string }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <DotLottiePlayer loop autoplay src={src} className="h-48 w-48" />
    </div>
  );
}
