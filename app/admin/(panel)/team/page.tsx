import { ListRow } from "@/components/admin/ListRow";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminTeam() {
  const { people } = await getSiteData();
  return (
    <>
      <PageTitle title="Team" intro="The board, in the order shown on the website." action={<AddButton href="/admin/team/new" label="Add member" />} />
      <ul className="flex flex-col gap-2">
        {people.map((p, i) => (
          <ListRow key={p.id} collection="people" id={p.id} href={`/admin/team/${p.id}`} title={p.name} subtitle={p.role} image={p.photo} hidden={p.hidden} isFirst={i === 0} isLast={i === people.length - 1} />
        ))}
      </ul>
    </>
  );
}
