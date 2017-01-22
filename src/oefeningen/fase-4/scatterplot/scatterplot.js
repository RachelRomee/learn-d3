// *** scatterplot
// \ requires multidimensional numerical data (multid= more than one piece of data connected to it)
var scatterData = [
	{friends: 5, salary: 22000},
	{friends: 3, salary: 18000},
	{friends: 10, salary: 88000},
	{friends: 0, salary: 180000},
	{friends: 27, salary: 56000},
	{friends: 8, salary: 74000}
];

// *** draw axis
// \ labels are derived from xScale and yScale
var xExtent = d3.extent(scatterData, function(d) { return d.salary; });
var yExtent = d3.extent(scatterData, function(d) { return d.friends; });

/*
var xScale = d3.scale.linear().domain(xExtent).range([0,500]);
var yScale = d3.scale.linear().domain(yExtent).range([0,500]);
d3.select('svg').selectAll('circle')
	.data(scatterData).enter()
	.append('circle')
	.attr('r', 5)
	.attr('cx', function(d,i) { return xScale(d.salary); })
	.attr('cy', function(d) { return yScale(d.friends); });

var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
var yAxis = d3.svg.axis().scale(yScale).orient('right');

d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis);
d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis);

// ** styling axis
d3.selectAll('path.domain') // path.domain = whole axis (including axisline, ticks and text)
	.style('fill', 'none') // remove default axis style = black thick line
	.style('stroke', 'black') // add stroke to show thin axis line
// \ ticks not shown by default
d3.selectAll('line.tick') // line.tick = major tick
	.style('stroke', 'black')

// \ we need to turn the axis around because we use orient('bottom')&('left') -- if we use orient('top')&('right'), the axis is drawn outside canvas
d3.selectAll('#yAxisG').attr('transform', 'translate(0,500)')
*/

xScale = d3.scale.linear().domain([0,180000]).range([20,480]);
yScale = d3.scale.linear().domain([0,27]).range([0,480]);

xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickSize(480).ticks(4);
yAxis = d3.svg.axis().scale(yScale).orient('right').ticks(16).tickSize(480).tickSubdivide(10);

d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis);
d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis);

// * g element contains tick line and text, and d3 generates classes for styling:
// <g class="tick major" transform="translate(0,0)" style="opacity: 1;">
   // <line x2="6" y2="0"></line>
   // <text x="9" y="0" dy=".32em" style="text-anchor: start;">0</text>
// </g>

d3.select('svg').selectAll('circle')
	.data(scatterData).enter()
	.append('circle')
	.attr('r', 5)
	.attr('cx', function(d) { return xScale(d.salary); })
	.attr('cy', function(d) { return yScale(d.friends); });
	// !! we need to set path.domain fill to none, now: main.css (you can also use d3)
	// d3.selectAll("#yAxisG").attr("transform","translate(0,500)");

	
