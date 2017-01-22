'use strict';

// LOG STUFF
/*
d3.json("data.json", function(err, data) {
    var respData = data.A1;
    var metaData = data.Datamap;

    console.log(data);
    // if err throw err;
    console.table(data);
    console.table(respData);
    console.table(metaData);
});
*/

// -------------------------------------------------------




// like so in a seperate function, you can load multiple data sets
function getData() {
    d3.json("data.json", drawChart);
};

function drawChart(error, data) {
    var respData = data.A1;


		//  dataset picker buttons: http://bl.ocks.org/tjdecke/5558084
		// Q1
    var nestedQ1 = d3.nest()
        .key( function(el) { return el.Evaluater1 ;})
        .entries(respData);
    // console.table(nestedQ1);
    nestedQ1.forEach(function(el) {
        el.numVotes = el.values.length;
				console.log('nestedQ1 : ' + el.numVotes);
    });


		// Q2
    var nestedQ2 = d3.nest()
        .key( function(el) { return el.Evaluater2 ;})
        .entries(respData);
    nestedQ2.forEach(function(el) {
        el.numVotes = el.values.length;
				console.log('nestedQ2 : ' + el.numVotes );
    });

		// Q3
		var nestedQ3 = d3.nest()
				.key( function(el) { return el.Evaluater3 ;})
				.entries(respData);
		nestedQ3.forEach(function(el) {
				el.numVotes = el.values.length;
				console.log('nestedQ3 : ' + el.numVotes);
		});

		// Q4
		var nestedQ4 = d3.nest()
				.key( function(el) { return el.Evaluater4 ;})
				.entries(respData);
		nestedQ4.forEach(function(el) {
				el.numVotes = el.values.length;
				console.log('nestedQ4 : ' + el.numVotes);
		});

		var maxQ1 = d3.max( nestedQ1, function(el) {return el.numVotes ;});
		console.log(maxQ1);
		var yScale = d3.scale.linear().domain([0,maxQ1]).range([0,400]);

    d3.select("svg").attr('style', 'height: 400px; width: 600px; border: 2px solid pink;')
  	  .selectAll("rect")
			.data(nestedQ4)
			.enter()
			.append('rect')
			.attr('width', '40')
			.attr('height', function(d) { return (yScale(d.numVotes)) ;})
			.attr('x', function(d,i) { return i * 100 ;})
			.attr('y', function(d) { return 400 - (yScale(d.numVotes)) ;})
			.style('fill', 'blue')
			.style('stroke', 'red')
			.style('stroke-width', '1px')
			.style('opacity', '.25');

			
};

getData();
