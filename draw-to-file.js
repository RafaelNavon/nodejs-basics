const fs = require("fs");

function drawSquareToFile() {
  const str = getSquare(getRandomIntInclusive(3, 20));
  drawToFile(str).then(() => {
    setTimeout(drawSquareToFile, 200);
  });
}
function getSquare(size) {
  var str = "*".repeat(size) + "\n";
  for (let i = 0; i < size; i++) {
    str += "*" + " ".repeat(size - 2) + "*\n";
  }
  str += "*".repeat(size) + "\n";
  return str;
}

function drawToFile(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile("data/pic.txt", content, "utf8", (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

drawSquareToFile();
