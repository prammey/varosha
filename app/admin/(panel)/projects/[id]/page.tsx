import { notFound } from "next/navigation";
import { deleteItem, saveProject } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Checkbox, Row, SelectField, TextArea, TextField } from "@/components/admin/Field";
import { FileField } from "@/components/admin/FileField";
import { PageTitle } from "@/components/admin/PageTitle";
import { getSiteData, projectCategories } from "@/lib/data";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const project = isNew ? null : (await getSiteData()).projects.find((p) => p.id === id);
  if (!isNew && !project) notFound();

  return (
    <>
      <PageTitle title={isNew ? "Add a project" : project!.title} back={{ href: "/admin/projects", label: "All projects" }} />
      <AdminForm action={saveProject} submitLabel={isNew ? "Add project" : "Save"}>
        <input type="hidden" name="id" value={project?.id ?? ""} />
        <TextField label="Title" name="title" required defaultValue={project?.title} placeholder="Beautician Training" />
        <Row>
          <TextField label="Where" name="where" defaultValue={project?.where} placeholder="Bolpur and two centers in Kolkata" hint="Town, neighborhood, partner." />
          <SelectField label="Type" name="category" defaultValue={project?.category ?? "skills"} options={projectCategories.filter((c) => c.id !== "all").map((c) => ({ value: c.id, label: c.label }))} />
        </Row>
        <TextField label="One-line number" name="stat" defaultValue={project?.stat} placeholder="52 young women" hint="Shown in small capitals on the card. Keep it to a few words." />
        <FileField label="Photo" name="imageFile" accept="image/*" current={project?.image} hint="JPG or PNG, landscape works best." />
        <TextField label="Photo description" name="imageAlt" defaultValue={project?.imageAlt} hint="A short sentence describing the photo, for screen readers and search engines." />
        <TextArea label="The story" name="story" required defaultValue={project?.paragraphs.join("\n\n")} rows={10} hint="Leave a blank line between paragraphs." />
        <div className="flex flex-col gap-3">
          <Checkbox label="Feature on the home page" name="featured" defaultChecked={project?.featured} hint="The first three featured projects appear on the home page." />
          <Checkbox label="Hide from the website" name="hidden" defaultChecked={project?.hidden} hint="Keeps the project here as a draft." />
        </div>
      </AdminForm>
      {!isNew && (
        <div className="mt-6 px-2">
          <DeleteButton action={deleteItem.bind(null, "projects", project!.id)} what="project" />
        </div>
      )}
    </>
  );
}
