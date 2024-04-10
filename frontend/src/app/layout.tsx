import { FlyingBox } from "@medusajs/icons";
import { Avatar, Text } from "@medusajs/ui";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medusa Eats",
  description: "Order food from your favorite restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <nav className="flex px-12 py-4 h-16 bg-ui-fg-base text-ui-fg-on-inverted justify-between items-center sticky top-0 z-40">
          <a
            href="/"
            className="flex gap-2 items-center text-xl font-semibold hover:text-ui-bg-base-hover"
          >
            <FlyingBox /> Medusa Eats
          </a>
          <div className="flex gap-2 items-center">
            <Text className="text-sm">Victor</Text>

            <Avatar
              src="https://robohash.org/medusa-eats"
              fallback="V"
              className="bg-ui-bg-base cursor-pointer"
            />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
