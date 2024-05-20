const fs = require("fs");
const axios = require("axios");

function downloadCountryFlags() {
  const countries = getCountries();
  console.log(
    "Countries:",
    countries.map((c) => c.name.common)
  );
  downloadFlags(countries)
    .then(() => {
      console.log("Your flags are ready");
    })
    .catch((err) => {
      console.error("Error downloading flags:", err);
    });
}

function getCountries() {
  const data = require("./newCountries.json");
  const sortedCountries = data.sort((a, b) => b.population - a.population);
  return sortedCountries.slice(0, 5);
}

async function downloadFlags(countries) {
  const flagPromises = countries.map((country) => {
    return download(country.flags.png, `flags/${country.name.common}.png`);
  });
  await Promise.all(flagPromises);
}

function download(url, path) {
  return axios({
    url,
    responseType: "stream",
  }).then((response) => {
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(path);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  });
}

if (!fs.existsSync("flags")) {
  fs.mkdirSync("flags");
}

downloadCountryFlags();
