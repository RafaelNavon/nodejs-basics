const { rejects } = require("assert");
const fs = require("fs");

function sumFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        const lines = data.split("\n");
        const sum = lines.reduce((acc, line) => {
          const num = parseFloat(line);
          return acc + (isNaN(num) ? 0 : num);
        }, 0);
        resolve(sum);
      } catch (e) {
        reject(e);
      }
    });
  });
}

sumFromFile("data/nums.txt")
  .then((sum) => console.log("Sum:", sum))
  .catch((err) => console.log("Cannot sum:", err));
