import { TDirectory } from '../types/TDirectory.d.ts';

export const toJson = (txt: string) => {
  const shaped = shapeJson(txt);
  const initialDirectory: TDirectory = { name: shaped[0].name, info: shaped[0].info, dir: [] };
  console.log(shaped);
  type TConstructureProps = { layer: number; index: number; directory: TDirectory };
  const constructure = ({ layer, index, directory }: TConstructureProps) => {
    let currentLayer = layer;
    let currentIndex = index;
    console.log('\n---------------------------------------------------------------\n');
    console.log('現在のindex', currentIndex);
    console.log('現在のレイヤー', currentLayer);
    console.log('親', directory);

    while (currentIndex < shaped.length - 1) {
      const currentDirectory: TDirectory = {
        name: shaped[currentIndex].name,
        info: shaped[currentIndex].info,
        dir: [],
      };

      // console.log(` 現在のレイヤー：{${currentLayer}} --- 処理しているレイヤー：{${shaped[currentIndex].layer}}`);
      // console.log(`現在の情報 { ${currentDirectory.name} }`);
      if (currentLayer > shaped[currentIndex].layer) {
        console.log('子供（Layer上へ）', currentDirectory);
        currentDirectory.dir.push(directory);
        directory = currentDirectory;
        currentLayer = shaped[currentIndex].layer;
        currentIndex++;
        return { dir: directory, index: currentIndex };
      }

      if (currentLayer === shaped[currentIndex].layer - 1) {
        console.log('子供（Layerが1つ深いとdirにpush）', currentDirectory);
        // 1つ先が上か下で深く潜るかどうかの判断をしないといけない
        console.log(shaped[currentIndex]);
        directory.dir.push(currentDirectory);

        currentIndex++;
      } else if (currentLayer + 1 < shaped[currentIndex].layer) {
        console.log('子供（Layer配下へ）', currentDirectory);

        const structure = constructure({
          layer: shaped[currentIndex].layer,
          index: currentIndex + 1,
          directory: currentDirectory,
        });
        directory.dir.push(structure.dir);
        currentLayer = shaped[currentIndex].layer;
        currentIndex = structure.index;
      }
    }

    return { dir: directory, index: currentIndex };
  };
  const result = constructure({ layer: shaped[0].layer, index: 1, directory: initialDirectory });
  console.log('dir!!!');
  console.log(result.dir);
};

const shapeJson = (txt: string) => {
  const lines = txt.split('\n').map((line) => line.split('|- ')).filter((line) => line.length !== 1);
  const shaped = lines.map((line) => {
    const [name, ...info] = line[1].split('//');
    return { layer: line[0].length, name, info: info.join() };
  });
  return shaped;
};
