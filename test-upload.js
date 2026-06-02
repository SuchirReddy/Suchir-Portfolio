const fs = require('fs');

async function test() {
  const formData = new FormData();
  formData.append("files", new Blob(["test"], { type: "image/png" }), "test.png");
  const req = new Request("http://localhost:3000/api/admin/projects/1/images", {
    method: "POST",
    body: formData,
  });
  
  try {
    const data = await req.formData();
    console.log(data.getAll("files"));
  } catch (e) {
    console.error(e);
  }
}
test();
