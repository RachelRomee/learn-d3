
// ADD HELLO WORLD DIV
d3.select("body").append("div")
	.attr('id', 'test1')
  	.style("border", "1px black solid")
  	.html("hello world");

d3.select("#test1")
	.style("background-color", "pink")
	.style("font-size", "24px")
	.attr("id", "newDiv")
	.attr("class", "d3div")
	.on("click", function() {console.log("You clicked a div")}); // add interactivity

// ----------------------------------------------
// to add svg container - you can also do this in html
/*
d3.select("body").append("svg");
*/

// ----------------------------------------------
// ADD LINES, CIRCLES AND TEXT TO SVG
// the order determines which element is on top of the others (will learn to adjust later)
/*
d3.select("svg")
  .append("line")
  .attr("x1", 20)
  .attr("y1", 20)
  .attr("x2",400)
  .attr("y2",400)
  .style("stroke", "black")
  .style("stroke-width","2px");
d3.select("svg")
  .append("text")
  .attr("x",20)
  .attr("y",20)
  .text("HELLO");
d3.select("svg")
  .append("circle")
  .attr("r", 20) // radius
  .attr("cx",20)
  .attr("cy",20)
  .style("fill","red");
d3.select("svg")
  .append("circle")
  .attr("r", 100)
  .attr("cx",400)
  .attr("cy",400)
  .style("fill","lightblue");
d3.select("svg")
  .append("text")
  .attr("x",400)
  .attr("y",400)
  .text("WORLD");
*/

d3.select("svg")
  .append("circle")
  .attr("r", 20)
  .attr("cx",20)
  .attr("cy",20)
  .style("fill","red");
d3.select("svg")
  .append("text")
  .attr("id", "a")
  .attr("x",20)
  .attr("y",20)
  .style("opacity", 0)
  .text("HELLO WORLD");
d3.select("svg")
  .append("circle")
  .attr("r", 100)
  .attr("cx",400)
  .attr("cy",400)
  .style("fill","lightblue");
d3.select("svg")
  .append("text")
  .attr("id", "b")
  .attr("x",400)
  .attr("y",400)
  .style("opacity", 0)
  .text("Uh, hi.");

// ----------------------------------------------  
// fade in text after a delay
d3.select("#a").transition().delay(1000).style("opacity", 1);
d3.select("#b").transition().delay(3000).style("opacity", .75);
// moves the circes to cy = 200
d3.selectAll("circle").transition().duration(2000).attr("cy", 200);
