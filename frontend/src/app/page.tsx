import { Heading } from "@medusajs/ui";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Heading level="h1" className="text-4xl font-bold">
        Welcome to Medusa Eats
      </Heading>
    </main>
  );
}
