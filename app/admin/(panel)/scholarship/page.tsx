import { saveScholarship } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { TextField } from "@/components/admin/Field";
import { PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminScholarship() {
  const { scholarship } = await getSiteData();
  return (
    <>
      <PageTitle title="Scholarship" intro="The amount, eligibility and document list live in the code. Update these two each cycle." />
      <AdminForm action={saveScholarship}>
        <TextField label="Deadline sentence" name="deadline" defaultValue={scholarship.deadline} hint="Shown in the gold box on the Scholarship page, exactly as written here." />
        <TextField label="Application link" name="applyUrl" type="url" defaultValue={scholarship.applyUrl} hint="Where the “Start application” button goes (the Google Form)." />
      </AdminForm>
    </>
  );
}
