const http = require('http');
async function test() {
  const res = await fetch("http://localhost:3000/api/admin/projects/1/images", {
    method: "POST",
    body: new FormData()
  });
  console.log(res.status);
}
test();
