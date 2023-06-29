import { TDirectory } from '../types/TDirectory.d.ts';

type TTxtProps = { directory: TDirectory; indent?: number };

export const totxt = ({ directory, indent = 0 }: TTxtProps) => {
  let txt = `${' '.repeat(indent)} |- ${directory.name} //${directory.info}\n`;
  directory.dir.forEach((subDir) => txt += totxt({ directory: subDir, indent: indent + 1 }));
  return txt;
};
