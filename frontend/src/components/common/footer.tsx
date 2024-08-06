import { Text } from "@medusajs/ui";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-16 bg-ui-fg-base text-ui-fg-on-inverted">
      <Text className="flex gap-1 text-sm text-ui-fg">
        © {new Date().getFullYear()}
        <Link
          href="https://medusajs.com/"
          className="flex gap-1 items-center hover:text-ui-bg-base-hover"
        >
          <Image
            src="/medusa-logo.svg"
            alt="Medusa"
            className="h-4"
            height={15}
            width={15}
          />
          Medusa
        </Link>
        |
        <Link
          href="https://github.com/medusajs/medusa-eats"
          className="flex gap-1 items-center hover:text-ui-bg-base-hover"
        >
          GitHub repository
        </Link>
      </Text>
    </footer>
  );
}
