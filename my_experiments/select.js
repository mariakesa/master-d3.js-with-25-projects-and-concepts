const h1=d3.select("h1");
console.log(h1);

let firstSvg=d3.select("svg");
console.log(firstSvg);
firstSvg=d3.select("svg#circles");
console.log(firstSvg);
firstSvg=d3.select("#circles");
console.log(firstSvg);

let secondSvg=d3.select("svg#rects");
console.log(secondSvg);
let secondSvg2=d3.select("svg:nth-of-type(2)");
console.log(secondSvg2);