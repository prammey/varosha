import { ListRow } from "@/components/admin/ListRow";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminEvents() {
  const { events } = await getSiteData();
  return (
    <>
      <PageTitle title="Events" intro="Newest first. The one marked “current” is shown large at the top of the Events page." action={<AddButton href="/admin/events/new" label="Add event" />} />
      <ul className="flex flex-col gap-2">
        {events.map((e, i) => (
          <ListRow key={e.id} collection="events" id={e.id} href={`/admin/events/${e.id}`} title={e.title} subtitle={`${e.date}${e.current ? " · current" : ""}`} image={e.image} hidden={e.hidden} isFirst={i === 0} isLast={i === events.length - 1} />
        ))}
      </ul>
    </>
  );
}
