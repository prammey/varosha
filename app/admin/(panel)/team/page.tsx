import { SortableList } from "@/components/admin/SortableList";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getContentSnapshot } from "@/lib/data";

export default async function AdminTeam() {
  const { data: { people }, revisions } = await getContentSnapshot();
  return (
    <>
      <PageTitle title="Team" intro="The board, in the order shown on the website. Use the arrows, then click Publish changes." action={<AddButton href="/admin/team/new" label="Add member" />} />
      <SortableList
        collection="people"
        key={revisions.people}
        revision={revisions.people}
        items={people.map((p) => ({ id: p.id, href: `/admin/team/${p.id}`, title: p.name, subtitle: p.role, image: p.photo, hidden: p.hidden }))}
      />
    </>
  );
}
