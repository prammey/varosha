import { notFound } from "next/navigation";
import { deleteItem, savePerson } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Checkbox, Row, TextArea, TextField } from "@/components/admin/Field";
import { FileField } from "@/components/admin/FileField";
import { PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function EditPerson({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const person = isNew ? null : (await getSiteData()).people.find((p) => p.id === id);
  if (!isNew && !person) notFound();

  return (
    <>
      <PageTitle title={isNew ? "Add a team member" : person!.name} back={{ href: "/admin/team", label: "Team" }} />
      <AdminForm action={savePerson} submitLabel={isNew ? "Add member" : "Save"}>
        <input type="hidden" name="id" value={person?.id ?? ""} />
        <Row>
          <TextField label="Name" name="name" required defaultValue={person?.name} />
          <TextField label="Role" name="role" defaultValue={person?.role} placeholder="Community Outreach" />
        </Row>
        <FileField label="Photo" name="photoFile" accept="image/*" current={person?.photo} removeName="removePhoto" hint="Optional. A square headshot works best. Without one, the site shows their initials." />
        <TextArea label="Short bio" name="bio" defaultValue={person?.bio} rows={4} hint="Optional. One or two sentences." />
        <Checkbox label="Hide from the website" name="hidden" defaultChecked={person?.hidden} />
      </AdminForm>
      {!isNew && (
        <div className="mt-6 px-2">
          <DeleteButton action={deleteItem.bind(null, "people", person!.id)} what="team member" />
        </div>
      )}
    </>
  );
}
