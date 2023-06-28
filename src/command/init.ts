type TCreatePathProps = { prePath: string; name: string };
type TDirectoryInfo = { name: string; info: string; dir: TDirectoryInfo[] };
type TCreateConstructureProps = { name: string; entry: string; isDir: boolean };

const createPath = ({ prePath, name }: TCreatePathProps) => prePath + '/' + name;

const ignoreList = ['.git'];

export const createConstructure = async ({ name, entry, isDir }: TCreateConstructureProps) => {
  const directoryInfo: TDirectoryInfo = { name, info: '', dir: [] };

  if (!isDir) return { name: entry, info: '', dir: [] };

  for await (const dir of Deno.readDir(entry)) {
    const path = createPath({ prePath: entry, name: dir.name });

    if (dir.isFile) {
      await createConstructure({ name: dir.name, entry: path, isDir: false });
    } else {
      const structure = await createConstructure({ name: dir.name, entry: path, isDir: true });
      if (!ignoreList.includes(dir.name)) directoryInfo.dir.push(structure);
    }
  }

  return directoryInfo;
};
