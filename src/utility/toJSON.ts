import { TDirectory } from '../types/TDirectory.d.ts';

export const toJson = (txt: string) => {
  const shaped = shapeJson(txt);
  const directory: TDirectory = { name: shaped[0].name, info: shaped[0].info, dir: [] };

  type TConstructureProps = { layer: number; index: number; directory: TDirectory };
  const constructure = ({ layer, index, directory }: TConstructureProps) => {
    let currentLayer = layer;
    let currentIndex = index;
    while (currentIndex !== shaped.length) {
      const currentDirectory: TDirectory = {
        name: shaped[currentIndex].name,
        info: shaped[currentIndex].info,
        dir: [],
      };
      if (currentLayer === shaped[currentIndex].layer) {
        directory.dir.push(currentDirectory);
        currentLayer = shaped[currentIndex].layer;
        currentIndex++;
      } else if (currentLayer > shaped[currentIndex].layer) {
        constructure({ layer: currentLayer, index: currentIndex, directory: currentDirectory });
      }
    }
    return directory;
    // もし階層が同じならpush
    // 階層が下なら再帰する
    // 階層が上なら現在のdirectoryとindexを返してループから抜ける
  };

  constructure({ layer: shaped[0].layer, index: 0, directory });
};

const shapeJson = (txt: string) => {
  const lines = txt.split('\n').map((line) => line.split('|- ')).filter((line) => line.length !== 1);
  const shaped = lines.map((line) => {
    const [name, ...info] = line[1].split('//');
    return { layer: line[0].length, name, info: info.join() };
  });
  return shaped;
};
