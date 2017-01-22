// *** lineChart
// \ drawing connections between points & shaded regions (in or outside area)
// \ also shows change - often over time
// \ case: twitter account - display greatest response over time to see the change
// d.tweets d.favorites d.retweets

d3.csv('../../data/linechart-tweets.csv', lineChart);

function lineChart(data) {

	xScale = d3.scale.linear().domain([1,10.5]).range([20,480]);
	yScale = d3.scale.linear().domain([0,35]).range([480,20]);

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

	// add points for tweets
	d3.select('svg').selectAll('circle.tweets')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'tweets')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day) })
		.attr('cy', function(d) { return yScale(d.tweets) })
		.style('fill', 'lightblue');

	// add points for retweets
	d3.select('svg').selectAll('circle.retweets')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'retweets')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day) })
		.attr('cy', function(d) { return yScale(d.retweets) })
		.style('fill', 'lightgreen');

	// add points for favorites
	d3.select('svg').selectAll('circle.favorites')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'favorites')
		.attr('r', 5)
		.attr('cx', function(d) { return xScale(d.day) })
		.attr('cy', function(d) { return yScale(d.favorites) })
		.style('fill', 'orange');

	// *** make lines (connect the dots)
	// ** define tweet, retweet and favorite lines
	// \ you can make a generator that generates all 3 lines (and moderate y accessor as we call each line)
	var tweetLine = d3.svg.line()
						.x(function(d) { return xScale(d.day) }) // defines accessor for x axis - pass attribute to xScale first
						.y(function(d) { return yScale(d.tweets) }); // defines accessor for y axis
	var retweetLine = d3.svg.line()
						.x(function(d) { return xScale(d.day) })
						.y(function(d) { return yScale(d.retweets) });
	var favLine = d3.svg.line()
						.x(function(d) { return xScale(d.day) })
						.y(function(d) { return yScale(d.favorites) });
	// ** line interpolators
	// \ you can add them here (after generator but before calling the line), or when we set the generator
	tweetLine.interpolate('basis'); // rounded line, does not reach all points, but shows the 'average' more
	retweetLine.interpolate('step'); // rectangular line, shows each step (day) as a horizontal line
	favLine.interpolate('cardinal'); // rounded line, goes through all points

	// ** add lines to svg
	d3.select('svg')
		.append('path')
		.attr('d', tweetLine(data)) // the path is drawn according to the generator with the loaded tweetdata passed to it
		.attr('fill', 'none') // if you don't set the stroke to 'none', you will see the area
		.attr('stroke', 'lightblue')
		.attr('stroke-width', 2)
	d3.select('svg')
		.append('path')
		.attr('d', retweetLine(data))
		.attr('fill', 'none')
		.attr('stroke', 'lightgreen')
		.attr('stroke-width', 2)
	d3.select('svg')
		.append('path')
		.attr('d', favLine(data))
		.attr('fill', 'none')
		.attr('stroke', 'orange')
		.attr('stroke-width', 2)
}
