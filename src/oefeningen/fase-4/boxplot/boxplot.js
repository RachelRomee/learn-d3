// *** boxplot
// \ use when the distribution of your data is important (ex: user demographics / statistical data)
// \ similar to scatterplot, but append <g> (not <circle>)
// \ case: plot number of registered visitors that visit our website by the day of the week

// * <g> - you position elements appended to <g> relative to parent
// * .each() - allows you to access the bound data, array position, and DOM element.

d3.csv('../../data/boxplot.csv', boxplot)

function boxplot(data) {
    xScale = d3.scale.linear().domain([1,8]).range([20,470]);
    yScale = d3.scale.linear().domain([0,100]).range([480,20]);

    yAxis = d3.svg.axis()
         .scale(yScale)
         .orient("right")
         .ticks(8)
         .tickSize(-470);

    d3.select("svg").append("g")
         .attr("transform", "translate(470,0)")
         .attr("id", "yAxisG")
         .call(yAxis);

    xAxis = d3.svg.axis()
         .scale(xScale)
         .orient("bottom")
         .tickSize(-470) // negative tickSize() draws line above x-axis -- need to offsett axis later by this value
         .tickValues([1,2,3,4,5,6,7]);

    d3.select("svg").append("g")
         .attr("transform", "translate(0,470)")
         .attr("id", "xAxisG")
         .call(xAxis);
    d3.select("#xAxisG > path.domain") // we don't need these tick lines on the outside
        .style("display", "none");
    // var boxWidth = 20

	d3.select("svg").selectAll("g.box")
         .data(data).enter()
         .append("g")
         .attr('class', 'box')
         .attr('transform', function(d) {
            //  return "translate(" + (xScale(d.day) - (.5*boxWidth)) + "," + yScale(d.median) + ")";
             return "translate(" + xScale(d.day) + "," + yScale(d.median) + ")";
         })
        //  ** .each() drawing 5 child elements (4 lines & 1 rect)
         .each(function(d,i) { // (d,i) declared in .each() - each time we access it, we get the data bound to the original element
             d3.select(this) // in .each() we can use 'this'
                .append('rect')
                // .attr('width', boxWidth)
                .attr('width', 20)
                .attr('x', -10) // to place box in the middle of x-axis tick line ( width/2 )
                .attr('y', yScale(d.q3) - yScale(d.median)) // to shift box up by upside - median (+ value shifts up because we turned te range: [480,20])
                .attr('height', yScale(d.q1) - yScale(d.q3))
            d3.select(this)
                .append('line')
                .attr('class', 'bar')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', yScale(d.max) - yScale(d.median)) // draws line from min to max val (middle)
                .attr('y2', yScale(d.min) - yScale(d.median))
            d3.select(this)
                .append('line')
                .attr('class', 'bar')
                .attr('x1', -10) // from left to right for boxwidth
                .attr('x2', 10)
                .attr('y1', yScale(d.max) - yScale(d.median)) // top bar so both max
                .attr('y2', yScale(d.max) - yScale(d.median))
            d3.select(this)
                .append('line')
                .attr('class', 'bar')
                .attr('x1', -10) // from left to right for boxwidth
                .attr('x2', 10)
                .attr('y1', yScale(d.min) - yScale(d.median)) // bottom bar so both min
                .attr('y2', yScale(d.min) - yScale(d.median))
            d3.select(this)
                .append('line')
                .attr('class', 'bar')
                .attr('x1', -10) // from left to right for boxwidth
                .attr('x2', 10)
                .attr('y1', 0) // median doesn't move cause <g>(parent) is centered on its value
                .attr('y2', 0)

         })
 }
