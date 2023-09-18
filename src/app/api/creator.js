import fs from "fs";

const filename = "/creator.html";

export default async function api(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(fs.readFileSync(filename, "utf-8"));
  res.end();
}
