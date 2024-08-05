"use client";

import { DeliveryDTO } from "@frontend/lib/types";
import { lottieMap } from "@frontend/lib/util/constants";
import { getNumericStatus } from "@frontend/lib/util/get-numeric-status";
import {
  CheckCircleSolid,
  CircleDottedLine,
  CircleQuarterSolid,
} from "@medusajs/icons";
import { Container, Heading, clx } from "@medusajs/ui";
import LottiePlayer from "./lottie-player";
import { useEffect } from "react";

export default function OrderStatus({ delivery }: { delivery: DeliveryDTO }) {
  const delivery_status = getNumericStatus(delivery.delivery_status);

  useEffect(() => {
    // scroll to the active status if it's not in view on mobile devices
    if (window.innerWidth < 768) {
      const activeStatus = document.querySelector(".bg-ui-tag-blue-bg");
      activeStatus?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [delivery_status]);

  return (
    <Container className="flex flex-col gap-6 p-6 overflow-hidden">
      <div className="flex justify-between gap-2 flex-wrap">
        <Heading>Live order status</Heading>
      </div>
      <div className="overflow-x-auto w-full p-1 scrollbar-hide h-full">
        <Container className="flex whitespace-pre-wrap w-fit md:w-full h-full p-0">
          <div
            className={clx(
              "border-r rounded-l-lg border-ui-tag-neutral-border w-1/5 p-4 justify-center items-center flex txt-small",
              {
                "bg-ui-tag-blue-bg": delivery_status === 0,
                "bg-ui-tag-green-bg": delivery_status > 0,
              }
            )}
          >
            {delivery_status === 0 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-blue-text ">
                <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
                Order received
              </span>
            ) : (
              <span className="flex flex-col md:flex-row gap-1 text-center md:text-left items-center text-ui-tag-green-text">
                <CheckCircleSolid className="text-ui-tag-green-icon" />
                Confirmed
              </span>
            )}
          </div>
          <div
            className={clx(
              "border-r border-ui-tag-neutral-border w-1/5 p-4 justify-center items-center flex txt-small",
              {
                "bg-ui-bg-subtle": delivery_status < 1,
                "bg-ui-tag-blue-bg border border-ui-tag-blue-border":
                  delivery_status === 1,
                "bg-ui-tag-green-bg": delivery_status > 1,
              }
            )}
          >
            {delivery_status < 1 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-fg-muted">
                <CircleDottedLine className="text-ui-tag-neutral" />
                Finding driver
              </span>
            ) : delivery_status === 1 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-blue-text">
                <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
                Finding driver
              </span>
            ) : (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-green-text">
                <CheckCircleSolid className="text-ui-tag-green-icon" />
                Driver found
              </span>
            )}
          </div>
          <div
            className={clx(
              "border-r border-ui-tag-neutral-border h-full w-1/5 p-4 justify-center items-center flex txt-small",
              {
                "bg-ui-bg-subtle": delivery_status < 2,
                "bg-ui-tag-blue-bg border border-ui-tag-blue-border":
                  delivery_status >= 2 && delivery_status <= 3,
                "bg-ui-tag-green-bg": delivery_status > 3,
              }
            )}
          >
            {delivery_status < 2 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-fg-muted">
                <CircleDottedLine className="text-ui-tag-neutral" />
                Preparing order
              </span>
            ) : delivery_status >= 2 && delivery_status <= 3 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-blue-text">
                <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
                Preparing order
              </span>
            ) : (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-green-text">
                <CheckCircleSolid className="text-ui-tag-green-icon" />
                Order prepared
              </span>
            )}
          </div>
          <div
            className={clx(
              "border-r border-ui-tag-neutral-border h-full w-1/5 p-4 justify-center items-center flex txt-small",
              {
                "bg-ui-bg-subtle": delivery_status < 4,
                "bg-ui-tag-blue-bg border border-ui-tag-blue-border":
                  delivery_status === 4,
                "bg-ui-tag-green-bg": delivery_status > 4,
              }
            )}
          >
            {delivery_status < 4 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-fg-muted">
                <CircleDottedLine className="text-ui-tag-neutral" />
                Order ready
              </span>
            ) : delivery_status === 4 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-blue-text">
                <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
                Awaiting pickup
              </span>
            ) : (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-green-text">
                <CheckCircleSolid className="text-ui-tag-green-icon" />
                Picked up
              </span>
            )}
          </div>
          <div
            className={clx(
              "rounded-r-lg w-1/5 p-4 justify-center items-center flex txt-small",
              {
                "bg-ui-bg-subtle": delivery_status < 5,
                "bg-ui-tag-blue-bg border border-ui-tag-blue-border":
                  delivery_status === 5,
                "bg-ui-tag-green-bg": delivery_status > 5,
              }
            )}
          >
            {delivery_status < 5 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-fg-muted">
                <CircleDottedLine className="text-ui-tag-neutral" />
                In transit
              </span>
            ) : delivery_status === 5 ? (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-blue-text">
                <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
                In transit
              </span>
            ) : (
              <span className="flex flex-col md:flex-row gap-1 items-center text-center md:text-left text-ui-tag-green-text">
                <CheckCircleSolid className="text-ui-tag-green-icon" />
                Delivered
              </span>
            )}
          </div>
        </Container>
      </div>
      <LottiePlayer src={lottieMap[delivery_status]} />
    </Container>
  );
}
