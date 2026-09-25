import { deleteItem, saveNewsletter } from "@/app/admin/actions";
import { SortableList } from "@/components/admin/SortableList";
import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { TextField } from "@/components/admin/Field";
import { FileField } from "@/components/admin/FileField";
import { PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminNewsletters() {
  const { newsletters } = await getSiteData();
  const nextYear = (newsletters[0]?.year ?? new Date().getFullYear() - 1) + 1;
  return (
    <>
      <PageTitle title="Newsletters" intro="One PDF per year. The top one is featured on the website. Use the arrows to reorder, then click Save changes." />
      <AdminForm action={saveNewsletter} submitLabel="Add newsletter">
        <h2 className="text-[1.1rem] font-bold">Add a year</h2>
        <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
          <TextField label="Year" name="year" type="number" required defaultValue={nextYear} />
          <FileField label="PDF" name="pdfFile" accept="application/pdf" />
        </div>
      </AdminForm>
      <h2 className="mb-3 mt-8 text-[1.1rem] font-bold">Published years</h2>
      <SortableList
        collection="newsletters"
        canHide={false}
        items={newsletters.map((n) => ({ id: n.id, title: String(n.year), extra: { href: n.file, label: "Open PDF ↗" } }))}
        emptyText="No newsletters yet. Add the first one above."
      />
      <details className="mt-8 rounded-xl bg-white px-4 py-3 text-[0.9rem] shadow-[0_1px_2px_rgba(42,30,34,.05)]">
        <summary className="cursor-pointer font-semibold text-mute hover:text-ink">Need to remove a year?</summary>
        <ul className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
          {newsletters.map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-3">
              <span className="font-semibold">{n.year}</span>
              <DeleteButton action={deleteItem.bind(null, "newsletters", n.id)} what={`${n.year} newsletter`} />
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
