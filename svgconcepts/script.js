//import * as d3 from "d3";

console.log('Start!');

let clicked= () => {
    console.log('Button clicked');
    let line=d3.select('polyline').style('stroke','blue');
    console.log(line);
}