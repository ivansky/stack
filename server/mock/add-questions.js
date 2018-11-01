const fs = require('fs');

const args = process.argv.slice(2);

const filename = args[0];

if (!fs.existsSync(filename)) {
  console.error(`File ${filename} doesn't exist`);
  return;
}

try {
  const map = require('./questions-map.json');

  const json = fs.readFileSync(filename).toString('utf8');

  const list = JSON.parse(json);

  const addMap = list.items.reduce((items, item) => ({
    ...items,
    [item.question_id]: item,
  }), {});

  const nextMap = {
    ...map,
    ...addMap,
  };

  fs.writeFileSync('./questions-map.json', JSON.stringify(nextMap, null, 2));
} catch (e) {
  console.error(e);
}
