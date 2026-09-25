import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/about", "/projects", "/scholarship", "/team", "/support", "/events", "/newsletters", "/contact", "/terms", "/privacy", "/accessibility"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, lastModified: new Date() }));
}
