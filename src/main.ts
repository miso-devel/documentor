import { createConstructure } from "./utility/init.ts";

const cwd = Deno.cwd();
type TScriptKind = "init" | "update";
const scriptKind = Deno.args[0] as TScriptKind;
if (scriptKind === "init") {
  const result = await createConstructure({
    name: cwd.split("/")[cwd.split("/").length - 1],
    entry: ".",
    isDir: true,
  });

  await Deno.writeTextFile("documentor.json", JSON.stringify(result));
}
