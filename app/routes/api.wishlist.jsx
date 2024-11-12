import { json } from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils";
export async function loader(params) {
  return json({ ok: true, message: "Hello from the API" });
}

export async function action({ request }) {
  const { method } = request;
  let data = await request.formData();
  const { customerId, productId, shop } = { data };
  if (!customerId || !productId || !shop) {
    return json({
      message: "Missing data. Required data: customerId, productId, shop",
      method,
    });
  }
  switch (method) {
    case "POST":
      const wishlist = await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });
      const response = json({
        message: "Product added to wishlist",
        method: "POST",
        wishlist,
      });
      return cors(request, response);

    default:
      break;
  }
}
