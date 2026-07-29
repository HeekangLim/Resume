import { cp, copyFile, mkdir, rm, writeFile } from "node:fs/promises";

const outputRoot = new URL("../dist/", import.meta.url);
const clientRoot = new URL("client/", outputRoot);
const serverRoot = new URL("server/", outputRoot);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(clientRoot, { recursive: true });
await mkdir(serverRoot, { recursive: true });

await Promise.all([
  copyFile(new URL("../index.html", import.meta.url), new URL("index.html", clientRoot)),
  copyFile(new URL("../.nojekyll", import.meta.url), new URL(".nojekyll", clientRoot)),
  cp(new URL("../images/", import.meta.url), new URL("images/", clientRoot), {
    recursive: true,
  }),
]);

await writeFile(
  new URL("_headers", clientRoot),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/images/*
  Cache-Control: public, max-age=31536000, immutable
`,
);

await writeFile(
  new URL("index.js", serverRoot),
  `export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    return env.ASSETS.fetch(
      new Request(new URL("/index.html", request.url), {
        method: request.method,
        headers: request.headers,
      }),
    );
  },
};
`,
);

console.log("Static portfolio build created in dist/");
