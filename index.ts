const init = async () => {
  const builds = await Bun.build({
    entrypoints: ['./hydrate.tsx'],
    target: "browser",
    splitting: true,
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    },
  });
}

await init();

export const server = Bun.serve({
  port: 3000,
  async fetch(req, server) {
    
    const { pathname } = new URL(req.url);
    
    if (pathname === "/underscore-umd.js" && req.method === "GET") {
      return new Response(Bun.file(import.meta.dir + "/underscore-umd.js"), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    if (pathname === "/backbone.js" && req.method === "GET") {
      return new Response(Bun.file(import.meta.dir + "/backbone.js"), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    return new Response(Bun.file(import.meta.dir + "/index.html"),
    {
      status: 200,
      headers:{
        "Content-Type": "text/html",
      }
    });
    // return new Response("data");
    // return new Response(JSON.stringify({ status: 404, message: "Not found" }), { status: 404 });
  },
});