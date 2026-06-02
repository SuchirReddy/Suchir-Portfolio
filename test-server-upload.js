const fs = require('fs');

async function test() {
  const formData = new FormData();
  const largeBuffer = Buffer.alloc(100, "a");
  formData.append("files", new Blob([largeBuffer], { type: "image/png" }), "large.png");
  
  const req = await fetch("http://localhost:3000/api/admin/projects/1/images", {
    method: "POST",
    body: formData,
  });
  
  console.log(req.status);
  console.log(await req.text());
}
test();
