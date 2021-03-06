// *** tree chart
// \ horizontal and vertical generator
// \ zoom behavior
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
	// * turn dendogram on it's side - turn around links - below: horizontal
	linkGenerator.projection(function (d) {return [d.y, d.x]})

	// ** create groups for node circle and label
	d3.select('svg')
		.append('g') // create parent group
		.attr('id', 'treeG')
		.selectAll('g')
		.data(treeChart(packableTweets)) // data that is preprocessed by layout
		.enter()
		.append('g')	// append <g> so we can label them
		.attr('class', 'node')
		// * turn dendogram on it's side - swap x and y axis below - below: horizontal
		.attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')' }) // computes XY coordinates of each node

	// * create node circle
	d3.selectAll('g.node')
		.append('circle')
		.attr('r', 10)
		.style('fill', function(d) { return depthScale(d.depth) })
		.style('stroke', 'white')
		.style('stroke-width', '2px');

	// * create node label
	d3.selectAll('g.node')
		.append('text')
		.text(function(d) { return d.id || d.key || d.content })

	// ** create links
	d3.select('#treeG')
		.selectAll('path')
		.data(treeChart.links(treeChart(packableTweets))) // .links() creates an array of links between each node (we use that to draw the links)
		.enter()
		.insert('path', 'g')
		.attr('d', linkGenerator)
		.style('fill', 'none')
		.style('stroke', 'black')
		.style('stroke-width', '2px')

	// *** create zoom behavior - using panning
	treeZoom = d3.behavior.zoom();
	treeZoom.on('zoom', zoomed);
	d3.select('svg').call(treeZoom);

	function zoomed() {
		var zoomTranslate = treeZoom.translate();
		d3.select('g#treeG')
			.attr('transform', 'translate(' +zoomTranslate[0]+ ',' +zoomTranslate[1]+ ')')
	}
}
