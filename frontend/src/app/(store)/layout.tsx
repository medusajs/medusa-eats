import { ProfileBadge } from "@frontend/components/common/profile-badge";
import NavCart from "@frontend/components/store/cart/nav-cart";
import { retrieveUser } from "@frontend/lib/data";
import { FlyingBox, ShoppingBag } from "@medusajs/icons";
import { IconButton } from "@medusajs/ui";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Suspense } from "react";

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
          <Suspense
            fallback={
              <IconButton variant="transparent">
                <ShoppingBag />
              </IconButton>
            }
          >
            <NavCart />
          </Suspense>
          <ProfileBadge user={user} />
        </div>
      </nav>
      <main className="min-h-screen flex flex-col gap-20 p-10 transition-all duration-150 ease-in-out">
        {children}
      </main>
    </>
  );
}
