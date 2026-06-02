const fs = require('fs');

async function test() {
  const formData = new FormData();
  // Create a 5MB buffer
  const largeBuffer = Buffer.alloc(5 * 1024 * 1024, "a");
  formData.append("files", new Blob([largeBuffer], { type: "image/png" }), "large.png");
  
  const req = new Request("http://localhost:3000/api/admin/projects/1/images", {
    method: "POST",
    body: formData,
  });
  
  try {
    const data = await req.formData();
    console.log(data.getAll("files").length);
  } catch (e) {
    console.error("Error parsing formData:", e.message);
  }
}
test();
