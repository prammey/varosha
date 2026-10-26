import { notFound } from "next/navigation";
import { deleteItem, saveEvent } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Checkbox, Row, TextArea, TextField } from "@/components/admin/Field";
import { FileField } from "@/components/admin/FileField";
import { PageTitle } from "@/components/admin/PageTitle";
import { getContentSnapshot } from "@/lib/data";

export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const { data, revisions } = await getContentSnapshot();
  const event = isNew ? null : data.events.find((e) => e.id === id);
  if (!isNew && !event) notFound();

  return (
    <>
      <PageTitle title={isNew ? "Add an event" : event!.title} back={{ href: "/admin/events", label: "All events" }} />
      <AdminForm action={saveEvent} revision={revisions.events}>
        <input type="hidden" name="id" value={event?.id ?? ""} />
        <Row>
          <TextField label="Title" name="title" required defaultValue={event?.title} placeholder="Thank You Party" />
          <TextField label="When" name="date" defaultValue={event?.date} placeholder="September 13, 2025" hint="Written out, however you like it to read." />
        </Row>
        <TextArea label="Summary" name="summary" defaultValue={event?.summary} rows={5} />
        <FileField label="Photo or flyer" name="imageFile" accept="image/*" current={event?.image} removeName="removeImage" hint="Optional." />
        <TextField label="Photo description" name="imageAlt" defaultValue={event?.imageAlt} hint="A short sentence describing the image." />
        <div className="flex flex-col gap-3">
          <Checkbox label="This is the current event" name="current" defaultChecked={event?.current} hint="Shown large at the top of the Events page. Only one event can be current." />
          <Checkbox label="Hide from the website" name="hidden" defaultChecked={event?.hidden} />
        </div>
      </AdminForm>
      {!isNew && (
        <div className="mt-6 px-2">
          <DeleteButton action={deleteItem.bind(null, "events", event!.id, revisions.events)} what="event" />
        </div>
      )}
    </>
  );
}
