// ----------------------------------------------
// BARCHART
d3.select("body").append("svg").style("width", "500").style('height', '300'); // add svg to dom

/*
d3.select("svg")
  .selectAll("rect")
  .data([15, 50, 22, 8, 100, 10])
  .enter()
  .append("rect") // appends a rectangle
  .attr("width", 40) // sets fixed width for rect
  .attr("height", function(d) {return d;}) // sets hight according to data value - you can multiply to increase height - also adjust attr 'y'
  // untill now all rect overlap eachother - to visualize better:
  .style("fill", "blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  // use i (index) to move all rect further along x-axis (here: 40 equal to width so no space between bars)
  .attr("x", function(d,i) {return i * 40})
  // untill now graph is upside down - to turn graph around: substract d from largest value (100) / svg height! or use scale() function
  .attr("y", function(d) {return 300 - d;});
*/

// ----------------------------------------------
// SCALE

/*
// map domain (=data values) to range (=chart range)
var yScale = d3.scale.linear().domain([0,24500]).range([0,300]);
console.log(yScale(0)); // -> 0
console.log(yScale(100)); // -> 0.40816
console.log(yScale(24000)); // -> 97.95918

d3.select("svg")
  .selectAll("rect")
  .data([14, 68, 24500, 430, 19, 1000, 5555])
  .enter()
  .append("rect")
  .attr("width", 40)
  .attr("height", function(d) {return yScale(d);}) // use yScale to determine height
  .style("fill", "blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  .attr("x", function(d,i) {return i * 40;})
  .attr("y", function(d) {return 300 - yScale(d);}); // use yScale to let bars begin at the bottom of range
*/

// ----------------------------------------------
// POLYLINIAR SCALE  - use when: widely diverging data points
// only difference: var yScale

// we are mostly interested in [0,100], sometimes in [100,1000] and consider the rest outliers
// var yScale = d3.scale.linear().domain([0,100,1000,24500]).range([0,50,75,100]);

// other example
var yScale = d3.scale.linear().domain([0,100,500]).range([0,50,100]);
// default behaviour: domain is max 500, but because data has larger values, their range values will be >100 (so disappear on the top of the svg)
console.log(yScale(1000)); // -> 162.5
// if we want to avoid that, use clamp(true)
var yScale = d3.scale.linear().domain([0,100,500]).range([0,50,100]).clamp(true);
console.log(yScale(1000)); // -> 100

d3.select("svg")
  .selectAll("rect")
  .data([14, 68, 24500, 430, 19, 1000, 5555])
  .enter()
  .append("rect")
  .attr("width", 40)
  .attr("height", function(d) {return yScale(d);}) // use yScale to determine height
  .style("fill", "blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  .attr("x", function(d,i) {return i * 40;})
  .attr("y", function(d) {return 300 - yScale(d);}); // use yScale to let bars begin at the bottom of range
