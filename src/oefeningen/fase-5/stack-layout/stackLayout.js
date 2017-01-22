// *** tree chart
// \ radial generator

d3.json('../../data/sandbox/tweets.json', function(error, data) { dataViz(data.tweets) })

function dataViz(incData) {

	var nestedTweets = d3.nest().key(function(el) { return el.user }).entries(incData);
	var packableTweets = {id: "All Tweets", values: nestedTweets};

	var depthScale = d3.scale.category20([0,1,2]);

	var treeChart = d3.layout.tree();
	treeChart.size([200,200]).children( function(d) { return d.values });

	// ** creates radial generator
	// / radial() uses threeChart.size to determine the maximum radius and is drawn out from (0,0)
	var linkGenerator= d3.svg.diagonal.radial()
		.projection(function(d) { return [d.y, d.x / 180 * Math.PI] })

	// ** create groups for node circle and label
	d3.select('svg')
		.append('g') // create parent group
		.attr('id', 'treeG')
		.selectAll('g')
		.data(treeChart(packableTweets)) // data that is preprocessed by layout
		.enter()
		.append('g')	// append <g> so we can label them
		.attr('class', 'node')
		// * adjust position of nodes for radial chart
		.attr('transform', function(d) { return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')' }) // computes XY coordinates of each node

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
