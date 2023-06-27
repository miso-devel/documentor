type TCreatePathProps = { prePath: string; name: string };

const createPath = ({ prePath, name }: TCreatePathProps) => prePath + '/' + name;

type TDirectoryInfo = { name: string; description: string; directories: TDirectoryInfo[] };

const ignoreList = ['.git'];

type TCreateConstructureProps = { name: string; entry: string; isDir: boolean };
export const createConstructure = async ({ name, entry, isDir }: TCreateConstructureProps) => {
  const directoryInfo: TDirectoryInfo = { name, description: '', directories: [] };

  if (!isDir) return { name: entry, description: '', directories: [] };

  for await (const dir of Deno.readDir(entry)) {
    const path = createPath({ prePath: entry, name: dir.name });

    if (dir.isFile) {
      await createConstructure({ name: dir.name, entry: path, isDir: false });
    } else {
      const structure = await createConstructure({ name: dir.name, entry: path, isDir: true });
      if (!ignoreList.includes(dir.name)) directoryInfo.directories.push(structure);
    }
  }

  return directoryInfo;
};
