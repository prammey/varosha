import type { NextRequest } from "next/server";
import { startPreview } from "@/lib/preview-theme";

export function GET(request: NextRequest) {
  return startPreview(request, "alt");
}
