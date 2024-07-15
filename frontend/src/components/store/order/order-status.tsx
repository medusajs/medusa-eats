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

export default async function OrderStatus({
  delivery,
}: {
  delivery: DeliveryDTO;
}) {
  const delivery_status = getNumericStatus(delivery.delivery_status);

  return (
    <Container className="flex flex-col gap-6 p-6">
      <div className="flex justify-between gap-2 flex-wrap">
        <Heading>Live order status</Heading>
      </div>
      <Container className="flex whitespace-pre-wrap h-20 p-0 overflow-hidden">
        <div
          className={clx(
            "border-r border-ui-tag-neutral-border h-full w-1/5 p-4 justify-center items-center flex txt-small",
            {
              "bg-ui-tag-blue-bg": delivery_status === 0,
              "bg-ui-tag-green-bg": delivery_status > 0,
            }
          )}
        >
          {delivery_status === 0 ? (
            <span className="flex gap-1 items-center text-ui-tag-blue-text">
              <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
              Order received
            </span>
          ) : (
            <span className="flex gap-1 items-center text-ui-tag-green-text">
              <CheckCircleSolid className="text-ui-tag-green-icon" />
              Confirmed
            </span>
          )}
        </div>
        <div
          className={clx(
            "border-r border-ui-tag-neutral-border h-full w-1/5 p-4 justify-center items-center flex txt-small",
            {
              "bg-ui-bg-subtle": delivery_status < 1,
              "bg-ui-tag-blue-bg border border-ui-tag-blue-border":
                delivery_status === 1,
              "bg-ui-tag-green-bg": delivery_status > 1,
            }
          )}
        >
          {delivery_status < 1 ? (
            <span className="flex gap-1 items-center text-ui-fg-muted">
              <CircleDottedLine className="text-ui-tag-neutral" />
              Finding driver
            </span>
          ) : delivery_status === 1 ? (
            <span className="flex gap-1 items-center text-ui-tag-blue-text">
              <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
              Finding driver
            </span>
          ) : (
            <span className="flex gap-1 items-center text-ui-tag-green-text">
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
            <span className="flex gap-1 items-center text-ui-fg-muted">
              <CircleDottedLine className="text-ui-tag-neutral" />
              Preparing order
            </span>
          ) : delivery_status >= 2 && delivery_status <= 3 ? (
            <span className="flex gap-1 items-center text-ui-tag-blue-text">
              <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
              Preparing order
            </span>
          ) : (
            <span className="flex gap-1 items-center text-ui-tag-green-text">
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
            <span className="flex gap-1 items-center text-ui-fg-muted">
              <CircleDottedLine className="text-ui-tag-neutral" />
              Ready for pickup
            </span>
          ) : delivery_status === 4 ? (
            <span className="flex gap-1 items-center text-ui-tag-blue-text">
              <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
              Waiting for pickup
            </span>
          ) : (
            <span className="flex gap-1 items-center text-ui-tag-green-text">
              <CheckCircleSolid className="text-ui-tag-green-icon" />
              Picked up
            </span>
          )}
        </div>
        <div
          className={clx(
            "h-full w-1/5 p-4 justify-center items-center flex txt-small",
            {
              "bg-ui-bg-subtle": delivery_status < 5,
              "bg-ui-tag-blue-bg border border-ui-tag-blue-border":
                delivery_status === 5,
              "bg-ui-tag-green-bg": delivery_status > 5,
            }
          )}
        >
          {delivery_status < 5 ? (
            <span className="flex gap-1 items-center text-ui-fg-muted">
              <CircleDottedLine className="text-ui-tag-neutral" />
              In transit
            </span>
          ) : delivery_status === 5 ? (
            <span className="flex gap-1 items-center text-ui-tag-blue-text">
              <CircleQuarterSolid className="text-ui-tag-neutral animate-spin" />
              In transit
            </span>
          ) : (
            <span className="flex gap-1 items-center text-ui-tag-green-text">
              <CheckCircleSolid className="text-ui-tag-green-icon" />
              Delivered
            </span>
          )}
        </div>
      </Container>
      <LottiePlayer src={lottieMap[delivery_status]} />
    </Container>
  );
}
