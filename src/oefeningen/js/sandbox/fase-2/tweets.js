// "tweets": [{
//     "user": "Al",
//     "content": "I really love seafood.",
//     "timestamp": " Mon Dec 23 2013 21:30 GMT-0800 (PST)",
//     "retweets": ["Raj", "Pris", "Roy"],
//     "favorites": ["Sam"]
// },


d3.json('data/sandbox/tweets.json', function(error, data){ dataViz(data.tweets) });

function dataViz(incomingData) {

	incomingData.forEach(function (d) {
		d.impact = d.favorites.length + d.retweets.length; // impact is #favorites + #retweets
		d.tweetTime = new Date(d.timestamp); // transforms ISO8906 string into datatype
		console.log(d.length)
	})

	var maxImpact = d3.max(incomingData, function(d) { return d.impact ;});
	var startEnd = d3.extent(incomingData, function(d) { return d.tweetTime ;}); // [ start, end ]
	var timeRamp = d3.time.scale().domain(startEnd).range([20,480]);
	var yScale = d3.scale.linear().domain([0,maxImpact]).range([0,460]);
	var radiusScale = d3.scale.linear().domain([0,maxImpact]).range([1,20]);
	var colorScale = d3.scale.linear().domain([0,maxImpact]).range(['white', '#990000']);

	d3.select("svg").attr('style', 'height: 500px; width: 500px;')
		.selectAll("circle")
		.data(incomingData)
		.enter()
		.append("circle")
		.attr("r", function(d) { return radiusScale(d.impact);})
		.attr("cx", function(d,i) { return timeRamp(d.tweetTime);})
		.attr("cy", function(d) { return 480 - yScale(d.impact);})
		.style("fill", function(d) { return colorScale(d.impact);})
		.style("stroke", "black")
		.style("stroke-width", "1px");
};
