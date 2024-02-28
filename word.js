import glob from 'glob';
import fs from 'fs'

const data = [];
const files = await new Promise((resolve, reject) => 
  glob("training/*", (err, files) => err ? reject(err) : resolve(files))
);

console.log(files);

for (const file of files) {
  data.push(`${file} : ${fs.readFileSync(file, 'utf-8').length}`);
}

console.log(data);