// *** tree chart

d3.json('../../data/sandbox/tweets.json', function(error, data) { dataViz(data.tweets) })

function dataViz(incData) {

	var nestedTweets = d3.nest().key(function(el) { return el.user }).entries(incData);
	// puts the nestedTweets array inside a 'root' object that acts as top-level parent
	var packableTweets = {id: "All Tweets", values: nestedTweets};

	var depthScale = d3.scale.category20([0,1,2]);

	var treeChart = d3.layout.tree();
	treeChart.size([500,480]).children( function(d) { return d.values });

	// ** creates diagonal generator with default settings (= curved lines between points)
	var linkGenerator = d3.svg.diagonal();

	d3.select('svg')
		.append('g') // create parent group
		.attr('id', 'treeG')
		.selectAll('g')
		.data(treeChart(packableTweets)) // data that is preprocessed by layout
		.enter()
		.append('g')	// append <g> so we can label them
		.attr('class', 'node')
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' }) // computes XY coordinates of each node

	d3.selectAll('g.node')
		.append('circle')
		.attr('r', 10)
		.style('fill', function(d) { return depthScale(d.depth) })
		.style('stroke', 'white')
		.style('stroke-width', '2px');

	d3.selectAll('g.node')
		.append('text')
		.text(function(d) { return d.id || d.key || d.content })

	d3.select('#treeG')
		.selectAll('path')
		.data(treeChart.links(treeChart(packableTweets)))
		.enter()
		.insert('path', 'g')
}
