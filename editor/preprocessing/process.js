/* eslint-disable */
const stars = require("./rawFiles/stars.8.json");
const milklyway = require("./rawFiles/mw.slim.json");
const pointReducedMilkyway = require("./rawFiles/mw.pointReduced.json");
const constellations = require("./rawFiles/constellations.lines.json");
console.log(pointReducedMilkyway)
const fs = require("fs");

const slimStars = stars.features
  .map(r => ({
    magnitude: +r.properties.mag.toFixed(2),
    declination: +r.geometry.coordinates[1].toFixed(3),
    rightAscension: +r.geometry.coordinates[0].toFixed(3)
  }))
  .filter(r => r.magnitude <= 6);
/*
 This is an idea to only store relative difference and with that reduce the size a bit more
.sort((r1, r2) => r1.declination - r2.declination + r1.rightAscension / 1000 - r2.rightAscension / 1000)


const slimmerStars = [slimStars[0]]
for (let i=1; i<slimStars.length; i++) {
    slimmerStars.push({
        magnitude: slimStars[i].magnitude,
        declination: +(slimStars[i].declination - slimStars[i-1].declination).toFixed(3),
        rightAscension: +(slimStars[i].rightAscension - slimStars[i-1].rightAscension).toFixed(3)
    })
}
fs.writeFileSync('out/stars.6.slimer.json', JSON.stringify(slimmerStars))*/

const slimkyway = milklyway.features.map(polygon => ({
  paths: polygon.geometry.coordinates[0].map(path =>
    path.map(equatorialCoords => ({
      declination: +equatorialCoords[1].toFixed(3),
      rightAscension: +equatorialCoords[0].toFixed(3)
    }))
  )
}));
const reducedMilkyway = pointReducedMilkyway.features.map(polygon => ({
  paths: polygon.geometry.coordinates[0].map(path =>
    path.map(equatorialCoords => ({
      declination: +equatorialCoords[1].toFixed(3),
      rightAscension: +equatorialCoords[0].toFixed(3)
    }))
  )
}));
const slimConstellations = constellations.features.map(constellation => ({
  paths: constellation.geometry.coordinates.map(path =>
    path.map(equatorialCoords => ({
      declination: equatorialCoords[1].toFixed(3),
      rightAscension: equatorialCoords[0].toFixed(3)
    }))
  )
}));

fs.writeFileSync("out/mw.slim.json", JSON.stringify(slimkyway));
fs.writeFileSync("out/mw.reduced.json", JSON.stringify(reducedMilkyway));
fs.writeFileSync("out/stars.6.slim.json", JSON.stringify(slimStars));
fs.writeFileSync(
  "out/constellations.slim.json",
  JSON.stringify(slimConstellations)
);
