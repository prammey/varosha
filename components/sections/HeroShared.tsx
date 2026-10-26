import Image from "next/image";

/** Shared text/effects for both hero layouts; layout differences stay in their wrappers. */
export function HeroHeadlineText({ stacked = false }: { stacked?: boolean }) {
  const opening = <span className="hero-marker">Hope and empowerment</span>;
  const ending = <span className="hero-marker hero-marker--second">through <em className="text-maroon">education</em> and <em className="text-maroon">opportunity</em>.</span>;
  return stacked ? (
    <><span className="block">{opening}</span>{" "}<span className="mt-1 block text-[0.85em]">{ending}</span></>
  ) : <>{opening}{" "}{ending}</>;
}

/** The arch, maroon backing and badge remain in the layout; only the photo shifts. */
export function HeroPhotoImage({ sizes, positionY = "16%" }: { sizes: string; positionY?: string }) {
  return (
    <Image
      src="/images/hero/tailoring-graduates.jpg"
      alt="Six young women in a classroom smiling and holding up garments they tailored themselves"
      fill
      priority
      sizes={sizes}
      className="hero-photo object-cover"
      style={{ objectPosition: `center ${positionY}` }}
    />
  );
}
