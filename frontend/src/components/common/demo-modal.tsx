"use client";

import { Github, XMarkMini } from "@medusajs/icons";
import { Button, Container, Heading, IconButton, Text } from "@medusajs/ui";
import Link from "next/link";
import { useState } from "react";

export default function DemoModal() {
  const [modalClosed, setModalClosed] = useState(false);

  if (modalClosed) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 transition-all ease-in-out delay-150  ">
      <Container className="flex flex-col gap-2 w-fit">
        <div className="flex justify-between">
          <Heading level="h2">Medusa Eats Demo Mode</Heading>
          <IconButton
            onClick={() => setModalClosed(true)}
            size="xsmall"
            variant="transparent"
          >
            <XMarkMini />
          </IconButton>
        </div>
        <Text className="text-left">
          This is a demo of Medusa Eats, a food delivery platform template built
          with Medusa 2.0 and Next.js.
        </Text>
        <Text className="text-left">
          To go through the entire delivery process, complete the following
          steps:
        </Text>
        <ol className="list-decimal list-inside ml-2 txt-compact-medium">
          <li>
            Select a restaurant, add some food to your cart and complete the
            checkout form.
          </li>
          <li>In a new tab, log in as a restaurant and accept the order.</li>
          <li>
            In a different incognito tab, log in as a driver and claim the
            delivery.
          </li>
          <li>
            You can now go back and forth between the driver and restaurant tabs
            to complete the delivery.
          </li>
        </ol>
        <Link
          href="https://github.com/medusajs/medusa-eats"
          className="self-center m-2"
        >
          <Button variant="secondary">
            <Github />
            View project on GitHub
          </Button>
        </Link>
      </Container>
    </div>
  );
}
