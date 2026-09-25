import { ListRow } from "@/components/admin/ListRow";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminProjects() {
  const { projects } = await getSiteData();
  return (
    <>
      <PageTitle title="Projects" intro="Use the arrows to set the order shown on the website. Hidden projects stay here as drafts." action={<AddButton href="/admin/projects/new" label="Add project" />} />
      <ul className="flex flex-col gap-2">
        {projects.map((p, i) => (
          <ListRow key={p.id} collection="projects" id={p.id} href={`/admin/projects/${p.id}`} title={p.title} subtitle={`${p.where}${p.featured ? " · on the home page" : ""}`} image={p.image} hidden={p.hidden} isFirst={i === 0} isLast={i === projects.length - 1} />
        ))}
      </ul>
    </>
  );
}
