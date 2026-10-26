import { SortableList } from "@/components/admin/SortableList";
import { AddButton, PageTitle } from "@/components/admin/PageTitle";
import { getContentSnapshot } from "@/lib/data";

export default async function AdminProjects() {
  const { data: { projects }, revisions } = await getContentSnapshot();
  return (
    <>
      <PageTitle title="Projects" intro="Use the arrows to set the order shown on the website, then click Publish changes. Hidden projects stay here off the public website. Hidden content is still publicly accessible through Sanity." action={<AddButton href="/admin/projects/new" label="Add project" />} />
      <SortableList
        collection="projects"
        key={revisions.projects}
        revision={revisions.projects}
        items={projects.map((p) => ({ id: p.id, href: `/admin/projects/${p.id}`, title: p.title, subtitle: `${p.where}${p.featured ? " · on the home page" : ""}`, image: p.image, hidden: p.hidden }))}
      />
    </>
  );
}
