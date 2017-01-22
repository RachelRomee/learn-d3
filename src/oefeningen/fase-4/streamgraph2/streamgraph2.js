// *** streamgraph
// \ represents variation and change (like boyplot)
// \ a 'stacked chart': the layers accrete upon each other and adjust the area of elements above and below
// \ focus: how to use accessors with D3 line and area generators
// \ case: gross earnings for six movies over the course of 9 days (each datapoint: amount of money made by movie on one day)
d3.csv('../../data/movies.csv', steamgraph);

function steamgraph(data) {


	xScale = d3.scale.linear().domain([1,10]).range([20,470]);
	yScale = d3.scale.linear().domain([0,50]).range([480,20]);
	var fillScale = d3.scale.linear().domain([0,5]).range(['pink', 'red']) // creates color ramp that corresponds to the 6 movies

	// add axis
	xAxis = d3.svg.axis()
			.scale(xScale)
			.orient('bottom')
			.tickSize(480)
			.tickValues([1,2,3,4,5,6,7,8,9,10]); // fixes the ticks to correspond to the day
	yAxis = d3.svg.axis()
			.scale(yScale)
			.orient('right')
			.ticks(10)
			.tickSize(480)
	d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis);
	d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis);


	// ** make a generator for all area's
	var n = 0 // each movie corresponds to 1 iteration, so increment 'n' to use in the color ramp
	for (x in data[0]) {
		if (x != "day") {
			var movieArea = d3.svg.area()
				.x(function(d) { return xScale(d.day) })
				.y(function(d) { return yScale(simpleStacking(d,x)) })
				.y0(function(d) { return yScale(simpleStacking(d,x) - d[x]) }) // here we define bottom of the path (in this case: mirror shape by making bottom equal to inverse of the top)
				.interpolate('basis');

			d3.select('svg')
				.append('path')
				.style('id', x + 'Area')
				.attr('d', movieArea(data))
				.attr('fill', fillScale(n))
				.attr('stroke', 'none')
				.attr('stroke-width', 2)
				.style('opacity', .5);
			n++;
		}
	}
	// \ this function takes the incoming bound data and the name of the attr and loops through the incoming data
	// \ adding each value intill it reaches the current named attribute
	// \ so result: it returns the total value for every movie during this day up to the movie we've sent
	function simpleStacking(incomingData, incomingAttribute) {
		var newHeight = 0;
		for (x in incomingData) {
			if (x != 'day') {
				newHeight += parseInt(incomingData[x]);
				if (x == incomingAttribute) {
					break;
				}
			}
		}
		return newHeight;
	}
}
