// *** scatterplot 2
// \ case: plot number of registered visitors that visit our website by the day of the week
//  d3.scale.quartile() - to get the quartiles (now already in data)
d3.csv('../../data/boxplot.csv', scatterplot)

function scatterplot(data) {
    xScale = d3.scale.linear().domain([1,8]).range([20,470]);
    yScale = d3.scale.linear().domain([0,100]).range([480,20]); // scale is inverted! to flip y-axis
    yAxis = d3.svg.axis()
         .scale(yScale)
         .orient("right")
         .ticks(8)
         .tickSize(-470);
    d3.select("svg").append("g")
         .attr("transform", "translate(470,0)") // offsets the yAxis (to right side)
         .attr("id", "yAxisG")
         .call(yAxis);
    xAxis = d3.svg.axis()
         .scale(xScale)
         .orient("bottom")
         .tickSize(-470)
         .tickValues([1,2,3,4,5,6,7]); // exact tick values (for days of week)
    d3.select("svg").append("g")
         .attr("transform", "translate(0,480)")
         .attr("id", "xAxisG")
         .call(xAxis);
	d3.select("svg").selectAll("circle.median")
     .data(data)
     .enter()
     .append("circle")
     .attr("class", "tweets")
     .attr("r", 5)
     .attr("cx", function(d) {return xScale(d.day)})
     .attr("cy", function(d) {return yScale(d.median)})
     .style("fill", "darkgray");
 }
