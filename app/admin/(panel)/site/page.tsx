import { saveSite } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { Row, TextField } from "@/components/admin/Field";
import { PageTitle } from "@/components/admin/PageTitle";
import { getSiteData } from "@/lib/data";

export default async function AdminSite() {
  const { site } = await getSiteData();
  return (
    <>
      <PageTitle title="Site details" intro="Contact details, the mailing address, and where donations go. Used across every page." />
      <AdminForm action={saveSite}>
        <h2 className="text-[1.1rem] font-bold">Contact</h2>
        <Row>
          <TextField label="Email" name="email" type="email" defaultValue={site.email} />
          <TextField label="Phone" name="phone" defaultValue={site.phone} />
        </Row>
        <h2 className="mt-2 text-[1.1rem] font-bold">Mailing address</h2>
        <TextField label="Name on the envelope" name="addressName" defaultValue={site.addressName} />
        <Row>
          <TextField label="Street" name="street" defaultValue={site.street} />
          <TextField label="City, State ZIP" name="cityStateZip" defaultValue={site.cityStateZip} />
        </Row>
        <h2 className="mt-2 text-[1.1rem] font-bold">Donations</h2>
        <Row>
          <TextField label="Zelle" name="zelle" defaultValue={site.zelle} />
          <TextField label="Venmo" name="venmo" defaultValue={site.venmo} />
        </Row>
        <h2 className="mt-2 text-[1.1rem] font-bold">Social links</h2>
        <TextField label="Facebook" name="facebook" type="url" defaultValue={site.facebook} />
        <Row>
          <TextField label="X / Twitter" name="x" type="url" defaultValue={site.x} hint="Leave blank if there is no account; the icon then opens the Contact page." />
          <TextField label="YouTube" name="youtube" type="url" defaultValue={site.youtube} />
        </Row>
        <TextField label="Instagram" name="instagram" type="url" defaultValue={site.instagram} />
      </AdminForm>
    </>
  );
}
