import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
    <Container className="flex flex-col items-center gap-5 py-[clamp(80px,12vw,160px)] text-center">
      <span className="eyebrow text-maroon">404</span>
      <h1 className="text-[clamp(2.6rem,6vw,4.8rem)]">That page isn’t here.</h1>
      <p className="lede max-w-[40ch] text-ink-2">The link may be old. Everything on the site is one click from the menu above.</p>
      <Button href="/">Back to the home page</Button>
    </Container>
      </main>
      <Footer />
    </>
  );
}
