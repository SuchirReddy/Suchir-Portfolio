import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

async function main() {
  console.log("Removing background...");
  const blob = await removeBackground("public/image_original.png");
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync("public/image_nobg.png", buffer);
  console.log("Done!");
}

main().catch(console.error);
