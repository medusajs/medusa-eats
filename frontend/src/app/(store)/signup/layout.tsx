import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Medusa Eats",
  description: "Order food from your favorite restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="justify-center mx-auto max-w-96">{children}</div>;
}
