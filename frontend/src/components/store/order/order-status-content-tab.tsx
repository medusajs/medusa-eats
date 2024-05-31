import { DotLottiePlayer } from "@dotlottie/react-player";
import { ProgressTabs } from "@medusajs/ui";

export function OrderStatusContentTab({ value }: { value: string }) {
  return (
    <div className="border-r border-gray-200 w-full">
      <ProgressTabs.Content
        value={value}
        className="flex flex-col items-center justify-center"
      >
        <DotLottiePlayer
          loop
          autoplay
          src="https://lottie.host/6fe27180-5b05-4263-a778-9c5e0f9b5c0c/GDCrX8NmbP.json"
        />
      </ProgressTabs.Content>
    </div>
  );
}
