import { toNextJsHandler } from "better-auth/next-js";

import { createAuth } from "@/lib/auth";

export async function GET(request: Request) {
  const { GET } = toNextJsHandler(createAuth());
  return GET(request);
}

export async function POST(request: Request) {
  const { POST } = toNextJsHandler(createAuth());
  return POST(request);
}

