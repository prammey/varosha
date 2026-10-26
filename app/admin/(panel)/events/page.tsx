import { SortableList } from "@/components/admin/SortableList";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getContentSnapshot } from "@/lib/data";

export default async function AdminEvents() {
  const { data: { events }, revisions } = await getContentSnapshot();
  return (
    <>
      <PageTitle title="Events" intro="Newest first. The one marked “current” is shown large at the top of the Events page. Use the arrows, then click Publish changes." action={<AddButton href="/admin/events/new" label="Add event" />} />
      <SortableList
        collection="events"
        key={revisions.events}
        revision={revisions.events}
        items={events.map((e) => ({ id: e.id, href: `/admin/events/${e.id}`, title: e.title, subtitle: `${e.date}${e.current ? " · current" : ""}`, image: e.image, hidden: e.hidden }))}
      />
    </>
  );
}
