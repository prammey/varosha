import Link from "next/link";
import Image from "next/image";
import { moveItem, toggleHidden } from "@/app/admin/actions";
import type { Collection } from "@/lib/data/types";
import { cn } from "@/lib/cn";

type Props = {
  collection: Collection;
  id: string;
  href: string;
  title: string;
  subtitle?: string;
  image?: string | null;
  hidden?: boolean;
  isFirst: boolean;
  isLast: boolean;
  /** newsletters have no hidden state */
  canHide?: boolean;
};

/** One item in an admin list: thumbnail, title, and reorder / hide controls. */
export function ListRow({ collection, id, href, title, subtitle, image, hidden, isFirst, isLast, canHide = true }: Props) {
  return (
    <li className={cn("flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(42,30,34,.05)]", hidden && "opacity-60")}>
      {image !== undefined && (
        <span className="relative block h-12 w-16 flex-none overflow-hidden rounded-md bg-cream-2">
          {image && <Image src={image} alt="" fill sizes="64px" className="object-cover" />}
        </span>
      )}
      <Link href={href} className="flex min-w-0 flex-1 flex-col no-underline">
        <span className="truncate font-bold text-ink">{title}{hidden && <span className="ml-2 rounded-full bg-cream-2 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-mute">Hidden</span>}</span>
        {subtitle && <span className="truncate text-[0.85rem] text-mute">{subtitle}</span>}
      </Link>
      <div className="flex items-center gap-1">
        {canHide && (
          <form action={toggleHidden.bind(null, collection as Exclude<Collection, "newsletters">, id)}>
            <button type="submit" title={hidden ? "Show on the website" : "Hide from the website"} className="rounded-md px-2 py-1 text-[0.8rem] font-semibold text-mute hover:bg-cream-2 hover:text-ink">
              {hidden ? "Show" : "Hide"}
            </button>
          </form>
        )}
        <form action={moveItem.bind(null, collection, id, "up")}>
          <button type="submit" disabled={isFirst} aria-label="Move up" className="rounded-md px-2 py-1 text-mute hover:bg-cream-2 hover:text-ink disabled:opacity-30">↑</button>
        </form>
        <form action={moveItem.bind(null, collection, id, "down")}>
          <button type="submit" disabled={isLast} aria-label="Move down" className="rounded-md px-2 py-1 text-mute hover:bg-cream-2 hover:text-ink disabled:opacity-30">↓</button>
        </form>
      </div>
    </li>
  );
}
