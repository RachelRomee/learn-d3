// *** histogram
// \ made histogram with nest() before - @sandbox 
// \ with d3 layouts: preprocessing step that formats your data so it's ready to be displayed like a histogram (in this case)
// \ you can update a layout, and then with rebinding the data use enter() update() exit()
// \ creates an interactive dynamic chart if you also use animated transitions
// \ case: showing the number of tweets that were favorited > click on bar to change to > number of tweets that were retweeted
d3.json('../../data/sandbox/tweets.json', function(error, data) { histogram(data.tweets) });

function histogram(tweetsData) {

	var xScale = d3.scale.linear().domain([0,5]).range([0,500]);
	var yScale = d3.scale.linear().domain([0,10]).range([400,0]);

	var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks('5');

	// ** create new layout function
	var histoChart = d3.layout.histogram();
	// ** determine values for histogram bins { for the value the layout is binning for from the datapoint }
	histoChart.bins([0,1,2,3,4,5]).value(function(d) { return d.favorites.length; })
	// ** format the data
	histoData = histoChart(tweetsData);

	// ** create histogram bins in chart
	d3.select('svg').selectAll('rect')
		.data(histoData).enter() // use formatted data to draw the bars
		.append('rect')
		.attr('x', function(d) { return xScale(d.x) })
		.attr('y', function(d) { return yScale(d.y) })
		.attr('width', xScale(histoData[0].dx) - 2) // '- 2' determines white space between bins
		.attr('height', function(d) { return 400 - yScale(d.y) }) // '400' is the max y range
		.style('fill', 'rgb(40, 214, 245)')
		.style('opacity', .75)
		.on('click', retweets);

	// ** create x-axis
	d3.select('svg')
		.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,400)')
		.call(xAxis);
	// ** center x-axis labels under the bars
	d3.select('g.axis')
		.selectAll('text')
		.attr('dx', 50); // barwidth / 2

	// ** on click function
	function retweets() {
		histoChart.value(function(d) { return d.retweets.length; }) // change data value for the bins to retweets

		histoData = histoChart(tweetsData);

		// * bind and redraw new data (retweets)
		d3.select('svg').selectAll('rect')
			.data(histoData)
			.transition().duration(500)
			.attr('x', function(d) { return xScale(d.x) })
			.attr('y', function(d) { return yScale(d.y) })
			.attr('height', function(d) { return 400 - yScale(d.y) })
	}
}
