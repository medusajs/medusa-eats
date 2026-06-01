import {NextRequest} from "next/server";
import {EventSource} from "eventsource";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9000";

export async function GET(req: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  const restaurantId = req.nextUrl.searchParams.get("restaurant_id");
  const driverId = req.nextUrl.searchParams.get("driver_id");
  const deliveryId = req.nextUrl.searchParams.get("delivery_id");

  const params = new URLSearchParams();
  if (restaurantId) {
    params.append("restaurant_id", restaurantId);
    writer.write(
      encoder.encode(
        `data: ${JSON.stringify({
          message: "Subscribing to restaurant " + restaurantId
        })}\n\n`
      )
    );
  }
  if (driverId) {
    params.append("driver_id", driverId);
    writer.write(
      encoder.encode(
        `data: ${JSON.stringify({
          message: "Subscribing to driver " + driverId
        })}\n\n`
      )
    );
  }
  if (deliveryId) {
    params.append("delivery_id", deliveryId);
    writer.write(
      encoder.encode(
        `data: ${JSON.stringify({
          message: "Subscribing to delivery " + deliveryId
        })}\n\n`
      )
    );
  }

  const url = `${BACKEND_URL}/store/deliveries/subscribe?${params.toString()}`;

  const source = new EventSource(url, {
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!
        }
      })
  });

  source.onmessage = (event) => {
    writer.write(encoder.encode(`data: ${event.data}\n\n`));
  };

  source.onerror = (err) => {
    writer.write(
      encoder.encode(`event: error\ndata: ${JSON.stringify(err)}\n\n`)
    );
    source.close();
    writer.close();
  };

  req.signal.addEventListener("abort", () => {
    source.close();
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform"
    }
  });
}
