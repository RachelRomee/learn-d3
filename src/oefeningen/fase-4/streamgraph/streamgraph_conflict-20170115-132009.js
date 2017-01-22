// *** streamgraph
// \ represents variation and change (like boyplot)
// \ a 'stacked chart': the layers accrete upon each other and adjust the area of elements above and below
// \ focus: how to use accessors with D3 line and area generators
// \ case: gross earnings for six movies over the course of 9 days (each datapoint: amount of money made by movie on one day)
d3.csv('../../data/movies.csv', steamgraph);

function steamgraph(data) {


	xScale = d3.scale.linear().domain([1,10]).range([20,470]);
	yScale = d3.scale.linear().domain([0,35]).range([250,20]);

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

	// var xScale = d3.scale.linear().domain([1,8]).range([20,470]);
	// var yScale = d3.scale.linear().domain([0,100]).range([480,20]);

	// ** make a generator for all lines
	// \ use when you want to dray most shapes and lines (closed/open, filled/unfilled)
	for (x in data[0]) { // iterate through data attr - x = name of each column ('data', 'movie1', ...)
		if (x != 'day') {  // skip 'day'

			var movieLine = d3.svg.line() // instantiates line generator for each movie
				.x(function(d) { return xScale(d.day) })
				.y(function(d) { return yScale(d[x]) }) // dynamically sets y-accessor function
				.interpolate('cardinal');

			d3.select('svg')
				.append('path')
				.attr('id', x + 'Line')  // here: x = movie1, movie2 etc
				.attr('d', movieLine(data))
				// .attr('d', movieLine(data) + 'Z') // add 'Z' to close the path = connect the two end points
				.attr('fill', 'none')
				.attr('stroke', 'red')
				.attr('stroke-width', 3)
				.style('opacity', .75)
		}
	}

	// ** make a generator for all area's
	// \ use when you want to draw a shape where the bottom can be calculated based on the top of the shape
	// \ (ex: stacked area chart or steamgraph)
	for (x in data[0]) {
		if (x != "day") {
			var movieArea = d3.svg.area()
				.x(function(d) { return xScale(d.day) })
				.y(function(d) { return yScale(d[x]) })
				.y0(function(d) { return yScale(-d[x]) }) // here we define bottom of the path (in this case: mirror shape by making bottom equal to inverse of the top)
				.interpolate('cardinal');

			d3.select('svg')
				.append('path')
				.attr('id', x + 'Area')
				.attr('d', movieArea(data))
				.attr('fill', 'darkgray')
				.attr('stroke', 'lightgray')
				.attr('stroke-width', 2)
				.style('opacity', .5);
		}
	}
}
