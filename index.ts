import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const libFolder = 'libs';
const clientFolder = 'client';
let libFiles = [];
let clientFiles = [];
// const buildsMatchers = new Map<string, () => Response>();
const init = async () => {
  // const builds = await Bun.build({
  //   entrypoints: ['./hydrate.tsx'],
  //   target: "browser",
  //   splitting: true,
  //   minify: {
  //     identifiers: true,
  //     syntax: true,
  //     whitespace: true,
  //   },
  // });
  // for (const build of builds.outputs) {
  //   buildsMatchers.set(build.path.substring(1), () => new Response(build.stream(), {
  //     headers: {
  //       "Content-Type": build.type,
  //     },
  //   }));
  // }
  libFiles = await getFiles(libFolder)
  clientFiles = await getFiles(clientFolder)
}

await init();

async function getFiles( directoryPath ) {

    try {
        const fileNames = await readdir( directoryPath ); // returns a JS array of just short/local file-names, not paths.
        const filePaths = fileNames.map( fn => join( directoryPath, fn ) );
        return filePaths;
    }
    catch (err) {
        console.error( err ); // depending on your application, this `catch` block (as-is) may be inappropriate; consider instead, either not-catching and/or re-throwing a new Error with the previous err attached.
    }
}

export const server = Bun.serve({
  port: 3000,
  async fetch(req, server) {

    const { pathname } = new URL(req.url);
    const filePath =  `${libFolder}${pathname}`;

    if (libFiles.includes(filePath) && req.method === "GET") {
      return new Response(Bun.file(filePath), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    const clientPath =  `${clientFolder}${pathname}`;
    if (clientFiles.includes(clientPath) && req.method === "GET") {
      return new Response(Bun.file(clientPath), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    if (pathname == '/' || pathname.endsWith("/index.html"))
      return new Response(Bun.file(import.meta.dir + "/index.html"),
      {
        status: 200,
        headers:{
          "Content-Type": "text/html",
        }
      });

    return new Response(JSON.stringify({ status: 404, message: "Not found" }), { status: 404 });
  },
});