export const checkInfo = async () => {
  const document = await Deno.readFile('./documentor.json');
  const dec = new TextDecoder('utf-8');
  const result = dec.decode(document);
  console.log(result);
};
