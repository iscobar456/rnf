import config from "@payload-config"
import { getPayload } from "payload"
import { writeFile, readFile } from "fs";
import path from "path";
import { promisify } from "util";

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

export const dumpPosts = async () => {
  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
  })
  const fileName = 'index_props.json'
  writeFile(
    path.join(process.cwd(), 'data', fileName),
    JSON.stringify(posts),
    (err) => {
      if (err) {
        console.error("Could not write index props file")
      }
    }
  )
}


export const copyTypes = async () => {
  const typesFilePath = path.join(process.cwd(), 'src/payload-types.ts');
  const typesFile = await readFilePromise(typesFilePath);
  const typesFileStr = typesFile.toString();
  const modifiedTypesFileStr = typesFileStr.split('\n').slice(0, -3).join('\n');
  return writeFilePromise(
    path.join(process.cwd(), 'data/payload-types.ts'),
    modifiedTypesFileStr,
  )
}

