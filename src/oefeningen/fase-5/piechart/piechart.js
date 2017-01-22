// *** piechart
// \ with d3 layouts: preprocessing step that formats your data so it's ready to be displayed like a piechart (in this case)
// \ you can update a layout, and then with rebinding the data use enter() update() exit()
// \ like all layouts a pie chart can be: created, assigned to a var and used as both object and function

// *** basic pie chart
var pieChart = d3.layout.pie();
var yourPie = pieChart([1,1,2]); // layout transforms array
// console.log(yourPie) // into: [object, object, object] - each: object { data: 1'1'2, endAngle: , startAngle: , value: 1'2'3}

// ** simple pie chart generator - gets more complicated with json object arrays
var newArc = d3.svg.arc();
newArc.outerRadius(100);
// console.log(newArc(yourPie[0])); // returns the attr('d') necessary to draw this arc as a <path>

d3.select('svg')
	.append('g') // appends new g
	.attr('transform', 'translate(250,250)') // and move it to the middle of the canvas
	.selectAll('path')
	.data(yourPie) // binds the new array [object, object, object]
	.enter()
	.append('path')
	.attr('d', newArc)
	// .style('fill', 'hsl(302, 86%, 57%)') // pink
	.style('fill', 'rgb(8, 142, 117)') // green
	.style('opacity', .6)
	.style('stroke', 'white')
	.style('stroke-width', '2px');
