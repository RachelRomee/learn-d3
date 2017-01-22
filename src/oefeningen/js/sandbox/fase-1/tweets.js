d3.json("data/sandbox/tweets.json",function(data) {console.log(data)})
// refer to data as data.tweets because json file

// Nest data into groups -> Group each tweet by the user who tweeted it.
d3.json('data/sandbox/tweets.json', function(error, data){
  var tweetData = data.tweets;
  var nestedTweets = d3.nest()
    .key(function(el) {return el.user})
    .entries(tweetData);
    console.log(nestedTweets);
});

// ----------------------------------------------
var testArray = [18,932,51,592,192,615];

console.log(d3.min(testArray, function(el){return el})); // Returns the min value [18]
console.log(d3.max(testArray, function(el){return el})); // Returns the max value [932]
console.log(d3.mean(testArray, function(el){return el}));  // Returns average of values [400]
// console.log(d3.extent(testArray, function(el){return el}));  // Returns min & max as 2 piece array [18, 932]

d3.min(testArray, function (el) {return el});
d3.max(testArray, function (el) {return el});
d3.mean(testArray, function (el) {return el});


// ----------------------------------------------
// BARCHART
// create a barchart of number of tweets
d3.json('data/sandbox/tweets.json', function(error, data) {dataViz(data.tweets)});

function dataViz(incomingdata) {
	var nestedTweets = d3.nest() // group tweets by user
    .key(function (el) { return el.user ;})
    .entries(incomingdata);
    console.log(incomingdata);
    console.log(nestedTweets);

	// create new attrubute based on number of tweets
	nestedTweets.forEach(function(el) {
		el.numTweets = el.values.length;
	})

	var maxTweets = d3.max(nestedTweets, function(el){ return el.numTweets ;});
	
	// var yScale = d3.scale.linear().domain([0,maxPopulation]).range([0,460]);

	var yScale = d3.scale.linear().domain([0,maxTweets]).range([0,100]);

	d3.select("svg")
		.selectAll("rect")
		.data(nestedTweets)
		.enter()
		.append("rect")
		.attr('width', '50')
		.attr('height', function(d) { return yScale(d.numTweets) ;})
		.attr('x', function(d,i) { return i * 60 ;})
		.attr('y', function(d) { return 150 - yScale(d.numTweets) ;})
		.style('fill', 'blue')
		.style('stroke', 'red')
		.style('stroke-width', '1px')
		.style('opacity', '.25');
}
