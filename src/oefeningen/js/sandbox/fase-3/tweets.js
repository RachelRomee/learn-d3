d3.json('data/sandbox/tweets.json', function(error, data){ dataViz(data.tweets) });

// CREATING LABELS ON <g> ELEMENTS

function dataViz(incomingData) {

	incomingData.forEach(function (d) {
		d.impact = d.favorites.length + d.retweets.length; // impact is #favorites + #retweets
		d.tweetTime = new Date(d.timestamp); // transforms ISO8906 string into datatype
	})



	console.log(filteredData.length)

	var maxImpact = d3.max(incomingData, function(d) { return d.impact ;});
	var startEnd = d3.extent(incomingData, function(d) { return d.tweetTime ;}); // [ start, end ]
	var timeRamp = d3.time.scale().domain(startEnd).range([20,480]);
	var yScale = d3.scale.linear().domain([0,maxImpact]).range([0,460]);
	var radiusScale = d3.scale.linear().domain([0,maxImpact]).range([1,20]);
	var colorScale = d3.scale.linear().domain([0,maxImpact]).range(['white', '#990000']);

	d3.select("svg").attr('style', 'height: 500px; width: 500px;')
		.selectAll("circle")
		// .data(incomingData)
		.data(incomingData, function(d) {
			return JSON.stringify(d) // stringify JSON data to use as whole objects (because there's no unique attribute as the key)
		})
		.enter()
		.append("circle")
		.attr("r", function(d) { return radiusScale(d.impact);})
		.attr("cx", function(d,i) { return timeRamp(d.tweetTime);})
		.attr("cy", function(d) { return 480 - yScale(d.impact);})
		.style("fill", function(d) { return colorScale(d.impact);})
		.style("stroke", "black")
		.style("stroke-width", "1px");


	var filteredData = incomingData.filter(
		function(d) { return d.impact > 0}
	);

	d3.selectAll("circle")
		.data(filteredData, function(d) { return JSON.stringify(d)})
		.exit()
		.remove();


	var tweetG = d3.select("svg")
		.selectAll("g")
		.data(incomingData)
		.enter()
		.append("g")
		.attr('transform', function(d) {
			// <g> requires a transform, which takes a constructed string like so:
			return "translate(" + timeRamp(d.tweetTime) + ',' + (480 - yScale(d.impact)) + ')';
	});

	tweetG.append('cicle')
		.attr('r', function(d) { return radiusScale(d.impact); })
		.style('fill','#990000')
		.style('stroke','black')
		.style('stroke-width','1px');

	tweetG.append('text')
		.text(function(d) { return d.user + "-" + d.tweetTime.getHours();})

}
