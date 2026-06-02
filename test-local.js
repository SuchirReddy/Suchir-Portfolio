const fs = require('fs');

async function test() {
  const formData = new FormData();
  formData.append("files", new Blob(["test"], { type: "image/png" }), "test.png");
  
  const res = await fetch("http://localhost:3000/api/admin/projects/cmpwcaf2h0000l804uxpe96g6/images", {
    method: "POST",
    body: formData,
    headers: {
      "cookie": "suchir_admin_session=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyLTEyMyIsImlhdCI6MTc4MDM4NzQ0MSwiZXhwIjoxNzgwMzkxMDQxfQ.piTRm3p-Gc_hq97W-Dz5eIWZAujwsH6KApZdtZraNmU"
    }
  });
  
  console.log("Status:", res.status);
  console.log("Body:", await res.text());
}
test();
