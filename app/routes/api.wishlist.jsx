import { json } from "@remix-run/node";

export async function loader(params) {
  return json({ ok: true, message: "Hello from the API" });
}

export async function action({ request }) {
  const { method } = request;
  switch (method) {
    case "POST":
      return json({ message: "Success", method: "POST" });

    case "PATCH":
      return json({ message: "Success", method: "PATCH" });

    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
