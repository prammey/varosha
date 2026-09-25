"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  label: string;
  name: string;
  accept: "image/*" | "application/pdf";
  /** URL of the file already saved, if any */
  current?: string | null;
  hint?: string;
  /** name of a checkbox that removes the current file */
  removeName?: string;
};

/** File picker that shows the current photo (or file name) and previews a new pick before saving. */
export function FileField({ label, name, accept, current, hint, removeName }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const isImage = accept === "image/*";
  const shown = preview ?? current ?? null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.9rem] font-bold">{label}</span>
      <div className="flex flex-wrap items-center gap-4">
        {isImage && shown && (
          <span className="relative block h-[84px] w-[112px] overflow-hidden rounded-lg bg-cream-2">
            <Image src={shown} alt="" fill sizes="112px" className="object-cover" unoptimized={shown.startsWith("blob:")} />
          </span>
        )}
        {!isImage && current && !fileName && (
          <a href={current} target="_blank" rel="noopener" className="text-[0.9rem] font-semibold">Current PDF ↗</a>
        )}
        <label className="cursor-pointer rounded-lg border border-line bg-white px-3.5 py-2 text-[0.9rem] font-semibold hover:border-maroon">
          {shown || fileName ? "Choose a different file" : "Choose a file"}
          <input
            type="file"
            name={name}
            accept={accept}
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setFileName(f.name);
              if (isImage) setPreview(URL.createObjectURL(f));
            }}
          />
        </label>
        {fileName && <span className="text-[0.85rem] text-mute">{fileName}</span>}
      </div>
      {removeName && current && !preview && (
        <label className="flex items-center gap-2 text-[0.85rem] text-mute">
          <input type="checkbox" name={removeName} className="accent-maroon" /> Remove the current photo
        </label>
      )}
      {hint && <span className="text-[0.82rem] text-mute">{hint}</span>}
    </div>
  );
}
