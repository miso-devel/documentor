import { checkInfo } from './command/info.ts';
import { createConstructure } from './command/init.ts';
import { toJson } from './utility/toJSON.ts';
import { totxt } from './utility/toTXT.ts';

const cwd = Deno.cwd().split('/')[Deno.cwd().split('/').length - 1];
type TScriptKind = 'init' | 'update' | 'info';
const scriptKind = Deno.args[0] as TScriptKind;

switch (scriptKind) {
  case 'init':
    {
      const result = await createConstructure({ name: cwd, entry: '.', isDir: true });
      console.log(totxt({ directory: result }));
      await Deno.writeTextFile('documentor.txt', totxt({ directory: result }));
    }
    break;

  case 'update':
    console.log('update');
    break;

  case 'info':
    {
      const test = await Deno.readFile('documentor.txt');
      const dec = new TextDecoder('utf-8');
      const txt = dec.decode(test);
      console.log(toJson(txt));
      //   await checkInfo();
    }

    break;

  default:
    console.log('default');

    break;
}
