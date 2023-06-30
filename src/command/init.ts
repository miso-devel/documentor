import { TDirectory } from '../types/TDirectory.d.ts';

type TCreateConstructureProps = { name: string; entry: string; isDir: boolean };

const ignoreList = ['.git'];

export const createConstructure = async ({ name, entry, isDir }: TCreateConstructureProps) => {
  const directoryInfo: TDirectory = { name, info: '', dir: [] };

  if (!isDir) return { name: entry, info: '', dir: [] };

  for await (const dir of Deno.readDir(entry)) {
    const path = entry + '/' + name;

    if (dir.isFile) {
      await createConstructure({ name: dir.name, entry: path, isDir: false });
    } else {
      const structure = await createConstructure({ name: dir.name, entry: path, isDir: true });
      if (!ignoreList.includes(dir.name)) directoryInfo.dir.push(structure);
    }
  }

  return directoryInfo;
};
