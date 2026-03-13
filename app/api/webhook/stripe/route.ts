import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const event = JSON.parse(body);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Payment completed:", {
          id: session.id,
          amount: session.amount_total,
          email: session.customer_details?.email,
          shipping: session.metadata?.shipping
            ? JSON.parse(session.metadata.shipping)
            : null,
        });
        break;
      }
      default:
        console.log("Unhandled webhook event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
