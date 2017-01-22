// *** streamgraph
// \ represents variation and change (like boxplot)
// \ a 'stacked chart': the layers accrete upon each other and adjust the area of elements above and below
// \ focus: how to use accessors with D3 line and area generators
// \ case: gross earnings for six movies over the course of 9 days (each datapoint: amount of money made by movie on one day)
// @?? - how do you order the area's so that the smallest is on top (so you can see them all)? [ attr z-index | groups ]
d3.csv('../../data/movies.csv', steamgraph);

function steamgraph(data) {


    xScale = d3.scale.linear().domain([0, 11]).range([20, 460]);
    yScale = d3.scale.linear().domain([-100, 100]).range([480, 20]);
    sizeScale = d3.scale.linear().domain([0,200]).range([20,20]); // @?? - from sourcecode
    var fillScale = d3.scale.linear().domain([1, 10]).range(['pink', 'red']) // creates color ramp that corresponds to the 6 movies

    // add axis
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickSize(480)
        .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // fixes the ticks to correspond to the day
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('right')
        .ticks(10)
        .tickSize(460)
    d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis);
    d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis);


    // ** make a generator for all area's
    var n = 0 // each movie corresponds to 1 iteration, so increment 'n' to use in the color ramp
    for (x in data[0]) {
        if (x != "day") {
            var movieArea = d3.svg.area()
                .x(function(d) { return xScale(d.day) })
                .y(function(d) { return yScale(alternateStacking(d, x, 'top')) })
                .y0(function(d) { return yScale(alternateStacking(d, x, 'bottom')) }) // here we define bottom of the path (in this case: mirror shape by making bottom equal to inverse of the top)
                .interpolate('basis');

            d3.select('svg')
                .append('path')
                .style('id', x + 'Area')
                .attr('d', movieArea(data))
                .attr('fill', fillScale(n))
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
                .style('opacity', 1);
            n++;
        }
    }
    // \ this function takes the incoming bound data and the name of the attr and loops through the incoming data
    // \ adding each value intill it reaches the current named attribute
    // \ so result: it returns the total value for every movie during this day up to the movie we've sent
    function alternateStacking(incomingData, incomingAttribute, topBottom) {
        var newHeight = 0;
        var skip = true;
        for (x in incomingData) {
            if (x != 'day') {
                if (x == 'movie1' || skip == false) { // skips first movie (= our center) and then skips every other movie to get alternating pattern
                    newHeight += parseInt(incomingData[x]);
                    if (x == incomingAttribute) { // stops when we reach this movie, gives us baseline
                        break;
                    }
                    if (skip == false) {
                        skip = true;
                    } else {
                        n % 2 == 0 ? skip = false : skip = true;
                    }
                } else {
                    skip = false;
                }
            }
        }
        if (topBottom == 'bottom') {
            newHeight = -newHeight; // height is negative for area's on bottom of streamgraph
        }
        if (n > 1 && n % 2 == 1 && topBottom == 'bottom') {
            newHeight = 0;
        }
        if (n > 1 && n % 2 == 0 && topBottom == 'top') {
            newHeight = 0;
        }

        return newHeight;
    }
}
