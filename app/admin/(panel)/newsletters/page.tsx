import { deleteItem, saveNewsletter } from "@/app/admin/actions";
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
      <PageTitle title="Newsletters" intro="One PDF per year. The newest year is featured on the website." />
      <AdminForm action={saveNewsletter} submitLabel="Add newsletter">
        <h2 className="text-[1.1rem] font-bold">Add a year</h2>
        <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
          <TextField label="Year" name="year" type="number" required defaultValue={nextYear} />
          <FileField label="PDF" name="pdfFile" accept="application/pdf" />
        </div>
      </AdminForm>
      <h2 className="mb-3 mt-8 text-[1.1rem] font-bold">Published years</h2>
      <ul className="flex flex-col gap-2">
        {newsletters.map((n) => (
          <li key={n.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(42,30,34,.05)]">
            <span className="display text-[1.3rem]">{n.year}</span>
            <span className="flex items-center gap-4">
              <a href={n.file} target="_blank" rel="noopener" className="text-[0.9rem] font-semibold">Open PDF ↗</a>
              <DeleteButton action={deleteItem.bind(null, "newsletters", n.id)} what="newsletter" />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
