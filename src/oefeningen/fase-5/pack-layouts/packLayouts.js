// *** pack layouts
// \ hierarchical / nested data, ex: circle packing
// \ pack expects JSON object array where child elements in hierarchy are stored in a children attribute that points to an array
// ex:
// {id: "All Tweets", children: [
// {id: "Al’s Tweets", children: [{id: "tweet1"}, {id: "tweet2"}]},
// {id: "Roy’s Tweets", children: [{id: "tweet1"}, {id: "tweet2"}]}
// ...

d3.json('../../data/sandbox/tweets.json', function(error, data) { dataViz(data.tweets) })

function dataViz(incData) {

	var nestedTweets = d3.nest().key(function(el) { return el.user }).entries(incData);
	// ** puts the nestedTweets array inside a 'root' object that acts as top-level parent
	var packableTweets = {id: "All Tweets", values: nestedTweets};

	var depthScale = d3.scale.category20([0,1,2]);

	var packChart = d3.layout.pack();
	packChart.size([500,500])
		.children(function(d) { return d.values }) // matches data created in nestedTweets
		.value(function(d) { return 1 }) // returns 1 for determining size of leaf nodes

	d3.select('svg')
		.selectAll('circle')
		.data(packChart(packableTweets))
		.enter()
		.append('circle')
		// .attr('r', function(d) { return d.r }) // if child is the same size as parent (a user made 1 tweet), you will not see the orange circle
		.attr('r', function(d) { return d.r - (d.depth * 10) }) // vs. here you add a sort of margin so you see the orange circle - also makes the green circles smaller - you should use more advanced method for this = d3.scale.linear() OR .padding()
		.attr('cx', function(d) { return d.x })
		.attr('cy', function(d) { return d.y })
		.style('fill', function(d) { return depthScale(d.depth) })
		// .style('stroke', 'hsl(333, 84%, 50%)')
		.style('stroke', 'white')
		.style('stroke', '2px')
		.value(function(d) { return d.retweets.length + d.favorites.length + 1 }) // set size of leaf nodes, use +1 to make sure that tweets without favorites and retweets are also shown
}
