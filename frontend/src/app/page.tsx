import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Medusa Eats</h1>
      <Image
        src="/medusa.png"
        alt="Medusa Eats logo"
        width={200}
        height={200}
      />
    </main>
  );
}
