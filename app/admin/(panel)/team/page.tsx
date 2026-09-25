import { SortableList } from "@/components/admin/SortableList";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminTeam() {
  const { people } = await getSiteData();
  return (
    <>
      <PageTitle title="Team" intro="The board, in the order shown on the website. Use the arrows, then click Save changes." action={<AddButton href="/admin/team/new" label="Add member" />} />
      <SortableList
        collection="people"
        items={people.map((p) => ({ id: p.id, href: `/admin/team/${p.id}`, title: p.name, subtitle: p.role, image: p.photo, hidden: p.hidden }))}
      />
    </>
  );
}
