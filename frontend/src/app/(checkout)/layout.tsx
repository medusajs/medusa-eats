import { ProfileBadge } from "@frontend/components/common/profile-badge";
import { retrieveUser } from "@frontend/lib/data";
import { FlyingBox } from "@medusajs/icons";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Medusa Eats",
  description: "Order food from your favorite restaurants",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await retrieveUser();

  return (
    <>
      <nav className="flex px-12 py-4 h-16 bg-ui-fg-base text-ui-fg-on-inverted justify-between items-center sticky top-0 z-40">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl font-semibold hover:text-ui-bg-base-hover"
        >
          <FlyingBox /> Medusa Eats
        </Link>
        <div className="flex gap-2 items-center">
          <ProfileBadge user={user} />
        </div>
      </nav>
      <main className="flex flex-col gap-4 p-10 transition-all duration-150 ease-in-out">
        {children}
      </main>
    </>
  );
}
