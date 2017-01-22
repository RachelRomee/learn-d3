// *** piechart2
// \ with d3 layouts: preprocessing step that formats your data so it's ready to be displayed like a piechart2 (in this case)
// \ you can update a layout, and then with rebinding the data use enter() update() exit()
// \ like all layouts a pie chart can be: created, assigned to a var and used as both object and function
// \ pie chart > change to > ring chart

d3.json('../../data/sandbox/tweets.json', function(error, data) {dataViz(data.tweets)})

function dataViz(incData) {
	var nestedTweets = d3.nest().key(function(el) { return el.user }).entries(incData);

	var colorScale = d3.scale.category20([0,1,2,3]);

	nestedTweets.forEach(function(el) {
		el.numTweets = el.values.length;
		el.numFavorites = d3.sum(el.values, function(d) { return d.favorites.length });
		el.numRetweets = d3.sum(el.values, function(d) { return d.retweets.length });
	});

	// *** create pie chart
	// ** get data
	pieChart = d3.layout.pie().sort(null); // use sort to prevent the pie pieces to change order (by default: the pieces reorder from large to small)
	pieChart.value(function(d) { return d.numTweets })
	yourPie = pieChart(nestedTweets)
	// ** create arc
	newArc = d3.svg.arc();
	newArc.outerRadius(100).innerRadius(20); // set innerRadius() to create donut / ring chart

	// ** create svg
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate(250,250)')
		.selectAll('path')
		.data(yourPie, function(d) { return d.data.key })
		.enter()
		.append('path')
		.attr('d', newArc)
		.style('fill', function(d,i) { return colorScale(i) })
		.style('opacity', .5)
		.style('stroke', 'white')
		.style('stroke-width', '2px')
		// .on('click', numFavs)

		.on('click', numRetweets)
		.each(function(d) { this._current = d });

	function numFavs() {
		pieChart.value(function(d) { return d.numFavorites });

		yourPie = pieChart(nestedTweets.filter(function(d) {
													return d.numFavorites > 0;
												})),
												function(d) {
													return d.data.key;
												};

		d3.selectAll('path')
		.data(yourPie)
		// .enter()
		// .append('path')
		// d3.selectAll("path")
		.transition()
		.duration(1000)
		.attr('d', newArc)
		// .attrTween('d', arcTween);
	}
	function numRetweets() {
		pieChart.value(function(d) { return d.numRetweets });

		// only bind objects that have values
		yourPie = pieChart(nestedTweets.filter(function(d) {
													return d.numRetweets > 0;
												})),
												function(d) {
													return d.data.key;
												} ;

		d3.selectAll('path')
		.data(yourPie)
		.exit()
		.remove()

		d3.selectAll('path')
		.transition()
		.duration(1000)
		.attrTween('d', arcTween);

		d3.selectAll('path')
			.on('click', numFavs);

		function arcTween(a) {
			var i = d3.interpolate(this._current, a);
			this._current = i(0);
			return function(t) {
				return newArc(i(t));
			}
		}
	}
}
