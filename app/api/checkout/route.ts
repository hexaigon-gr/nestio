import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, shipping } = body;

  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    // Fallback: just log the order and return success
    console.log("Order received (no Stripe):", { items, shipping });
    return NextResponse.json({
      success: true,
      fallback: true,
      message: "Order received",
    });
  }

  // Stripe checkout - dynamic require to avoid needing stripe installed
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/en/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/en/checkout/cancel`,
      metadata: {
        shipping: JSON.stringify(shipping),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    // If stripe module is not installed, fall back
    console.log("Order received (Stripe unavailable):", { items, shipping });
    return NextResponse.json({
      success: true,
      fallback: true,
      message: "Order received (payment processing unavailable)",
    });
  }
}
