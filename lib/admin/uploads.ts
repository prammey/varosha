export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
/** Only raster images and PDFs. Do not trust the browser's MIME type alone. */
export function validateUpload(kind: "image" | "pdf", type: string, bytes: Uint8Array) {
  if (bytes.byteLength > MAX_UPLOAD_BYTES) throw new Error("That file is over 3 MB. Please choose a smaller file.");
  const head = Buffer.from(bytes.subarray(0, 16));
  const valid = kind === "pdf"
    ? type === "application/pdf" && head.subarray(0,5).toString() === "%PDF-"
    : (type === "image/jpeg" && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff)
      || (type === "image/png" && head.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))
      || (type === "image/gif" && ["GIF87a", "GIF89a"].includes(head.subarray(0,6).toString()))
      || (type === "image/webp" && head.subarray(0,4).toString() === "RIFF" && head.subarray(8,12).toString() === "WEBP");
  if (!valid || bytes.byteLength === 0) throw new Error(kind === "image" ? "Choose a valid JPG, PNG, GIF, or WebP image." : "Choose a valid PDF file.");
}
