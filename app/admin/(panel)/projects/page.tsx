import { SortableList } from "@/components/admin/SortableList";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminProjects() {
  const { projects } = await getSiteData();
  return (
    <>
      <PageTitle title="Projects" intro="Use the arrows to set the order shown on the website, then click Save changes. Hidden projects stay here as drafts." action={<AddButton href="/admin/projects/new" label="Add project" />} />
      <SortableList
        collection="projects"
        items={projects.map((p) => ({ id: p.id, href: `/admin/projects/${p.id}`, title: p.title, subtitle: `${p.where}${p.featured ? " · on the home page" : ""}`, image: p.image, hidden: p.hidden }))}
      />
    </>
  );
}
