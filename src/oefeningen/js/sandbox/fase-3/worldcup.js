// d: data in selection  -  p: data you mouseover

// \ gets triggered by body onload in html
function createSoccerViz() {
	d3.csv("data/sandbox/worldcup.csv", function(data) {
		overallTeamViz(data);
	});
}

function overallTeamViz(incomingData) {
	d3.select("svg")
		.append('g') // appends <g> to <svg> to move it and center contents more easily
		.attr('id', 'teamsG')
		.attr('transform', 'translate(50,300)')
		.selectAll("g")
		.data(incomingData)
		.enter()
		// ** creates <g> for each team (to add labels for example)
		.append("g")
		.attr('class', 'overallG') // add class overallG to be able to select below
		.attr('transform', function(d,i) {
			return 'translate(' + (i * 50) + ', 0)'
		});

	var teamG = d3.selectAll('g.overallG'); // assign selection with 'teamG', for DRY

	// * create pink circles
	teamG
		.append('circle')
		// .attr('r', 20)

		// ** transition - circle size pulses over 1000ms
		.attr('r', 0)
		.transition()
		.delay(function(d, i) { return i * 100 }) // circles appear one by one - i * 100ms
		.duration(500)
		.attr('r', 20)
		.transition()
		.duration(500)
		.attr("r", 20)

		// .style('fill', 'pink')
		.style('stroke', 'black')
		.style('stroke-width', '1px');

	// ** create labels
	teamG
		.append('text')
		.style('text-anchor', 'middle') // how the label aligns compared to the position you give it
		.attr('y', 30)
		// .style('font-size', '10px')
		.text(function(d) { return d.team;
		})


	// --------------------------------------------------------------------
	// ** add buttons to filter / adjust the chart
	// \ creating buttons dynamically (like this) is scalable for different datasets
	var dataKeys = d3.keys(incomingData[0]).filter(function(el) { // d3.keys returns the names of the attr of an object as an array ( labels are [0] - team, region, win, loss ... )
		return el != "team" && el != "region"; // we want buttons for everything except team and region
	});

	d3.select("#controls")
		.selectAll("button.teams") // select all buttons with the class 'team'
		// \ dataKeys consists of an array of attr names, so the d corresponds to one of those names and makes a good button title
		.data(dataKeys) // numerical data (all data except "team" and "region"(are both strings))
		.enter()
		.append('button')
		.on("click", buttonClick) // gives onclick behaviour to each button. with a wrapper that gives access to the data that was bound to it when it was created
		// .attr("onclick", "console.log('click')" // alternative for on('click') to access HTML mouse events - notice " " at console.log
		// \ There’s a D3-specific reason to use the .on function: it sends the bound data to the function automatically and in the same format as the anonymous inline functions we’ve been using to set style and attribute.
		.html(function(d) { return d; }); // shows text on buttons - dataKeys = incomingData[0]

	/*
	// ** add interactivity to button click
	// \ We can create buttons based on the attributes of the data and dynamically measure the data based on the attribute bound to the button.
	function buttonClick(datapoint) { // fires on button click - bound data is automatically sent as first argument
		var maxValue = d3.max(incomingData, function(d) {
			return parseFloat(d[datapoint]); // click on button sends datapoint
		});

		var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);

		// * resize radius of circles from each team per category
		teamG
			.select("circle")
			.transition()
			.duration(1000)
			.attr('r', function(p) {
				return radiusScale(p[datapoint]);
			});
	}
	*/

	// --------------------------------------------------------------------
	/*
	// ** add interactivity on mouseover
	teamG.on("mouseover", highlightRegion);

	function highlightRegion(d) {
		teamG // = d3.selectAll("g.overallG")
			.select("circle")
			.style('fill', function(p) { // changed to p because d already defined
				return p.region == d.region ? "red" : "gray"; // circle turns red if you mouse over (if d in selection = element you moused over, turn red)
			});
	}

	// ** add interactivity on mouseout
	teamG.on('mouseout', function() {
		teamG
			.select("circle")
			.style("fill", "pink");
	});
	*/

	// --------------------------------------------------------------------
		// \ access dom element with 'this' (only in inline function) or '.node()'
		// \ useful cause you can use js functionality (ex: clone, measure path length) & re-append a child element
		d3.select("circle").each(function(d,i) { // select one circle so first team
			console.log(this); // this: <circle r="3.6.."></circle>
		});
		d3.select("circle").node() // <circle r="3.6.."></circle>

	// --------------------------------------------------------------------
	/*
	// ** add interactivity on mouseover
	teamG.on('mouseover', highlightRegion2);

	function highlightRegion2(d,i) {
		d3.select(this) // this = <circle>
			.select("text")
			.classed("active", true)
			.attr('y', 60); // move text down by 60 px

		d3.selectAll("g.overallG")
			.select('circle')
			.each(function(p,i) {
				p.region == d.region ?
					d3.select(this).classed("active", true) : // increase label font-size -  css: circle.active
					d3.select(this).classed("inactive", true);
			})
	}

	// ** add interactivity on mouseout
	teamG.on("mouseout", unHighlight)

	function unHighlight() { // mouse event is attached to <g> so if you mouse over circle or text it will trigger
		// \ you can disable like this:
		// teamG.select("text").style("pointer-events","none");
		 teamG
		 	.select("circle")
			.attr("class", ""); // remove active class

		 teamG
		 	.select("text")
			.classed("highlight", false)
			.classed("active", false) // remove active class
			.attr("y", 30);
	};
	// */



	// --------------------------------------------------------------------
	// *** use color
	// /*
	// ** add interactivity on mouseover
	// \ use css when possible, d3 functions are inline (ex: dynmic colors and transparency)
	teamG.on('mouseover', highlightRegion2);

	function highlightRegion2(d,i) {

		// \ colors in rgb get muddy, unless you break the color ramp in multiple stops
		teamColor = d3.rgb('pink') // or: d3.rgb(255,0,0); ('#ff0000'), ("rgb(255,0,0)")

		d3.select(this)
			.select('text')
			.classed('highlight', true)
			.attr('y,10')
		teamG // = d3.selectAll('g.overallG')
			.select('circle')
			.style('fill', function(p) {
				return p.region == d.region?
				teamColor.darker(.75) : teamColor.brighter(.5) // .darken() & .brighten()
			})
			this.parentElement.appendChild(this);
	}

	//  ** add interactivity on buttonClick
	function buttonClick(datapoint) {
		var maxValue = d3.max(incomingData, function(d) {
			return parseFloat(d[datapoint]);
		});

		var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
		// var ybRamp = d3.scale.linear().domain([0, maxValue]).range(['yellow', 'blue']);
		// \ use interpolate to use any other scale than rgb - hsl, hcl
		// var ybRamp = d3.scale.linear().interpolate(d3.interpolateHsl).domain([0,maxValue]).range(['yellow', 'blue']); // result: blue green
		var ybRamp = d3.scale.linear().interpolate(d3.interpolateHcl).domain([0,maxValue]).range(['yellow', 'blue']); // result: blue pink orange - use d3.hsl() when you darken pink (avoid muddying)
		// var ybRamp = d3.scale.linear().interpolate(d3.interpolateLab).domain([0,maxValue]).range(['yellow', 'blue']); // result: blue purple beige
		var tenColorScale = d3.scale.category10(["UEFA", "CONMEBOL", "CAF", "AFC"]);

		// \ colorbrewer: designed for qualitive data separated into categories: use quantize! - so we need to sort the numerical data into ranges
		var colorQuantize = d3.scale.quantize().domain([0,maxValue]).range(colorbrewer.Reds[3]); // sorts data into [3] categories according to data value

		teamG
			.select("circle")
			.transition()
			.duration(1000)
			.attr('r', function(p) {
				return radiusScale(p[datapoint]);
			})
			// .style('fill', function(p) {
			// 	return ybRamp(p[datapoint]) // adds color for data values (magnitude)
			// });
			// .style('fill', function(p) {
			// 	return tenColorScale(p.region) // adds color per region
			// })
			.style('fill', function(p) {
				return colorQuantize(p[datapoint]); // each category has a different shade of red
			})
	}
	// */

	// *** use images
	// \ you can resize images on buttonClick - does not work well with raster img (= png, jpg etc)
	teamG
		.insert('image', 'text') // use insert() (not append()) to insert the images before the text elements, keeps the labels from being drawn behind the added images
		.attr('xlink:href', function(d) {
			return "img/" + d.team + ".png";
		})
		.attr('width', '45px') // you need to set width & height for svg images to show!
		.attr('height', '20px')
		.attr('x', '-22') // - 1/2 x value to center image
		.attr('y', '40'); // - 1/2 y value to center image = -10
	// */


	// --------------------------------------------------------------------
	// *** modal with stats per team - uses modal.html
	// ** use d3.text() with .html()
	d3.text('modal.html', function(data) {
		d3.select('body')
			.append('div') // creates a new div
			.attr('id', 'modal') // with id as in main.css
			.html(data); // and fills it with html content from modal.html
	});

	teamG.on('click', teamClick);

	function teamClick(d) {  //selects and updates td.data as you click on a team
		d3.selectAll('td.data') // td with class data from modal.html
			.data(d3.values(d))
			.html(function(p) {
				return p
			});
	}

	// --------------------------------------------------------------------
	// *** pregenerated .svg

	// * add with 'x-link:href'
	teamG // add svg molecule image to each team
		.insert('image', 'text')
		.attr('x-link:href', 'img/molecule.svg')
		.attr('width', '60')
		.attr('height', '60')
		.attr('x', '-30')
		.attr('y', '-80');

	// ** use d3.html() so you can do more manipulation on HTML nodes with:
	// d3.html('img/football.svg', function(data) {
	// 	console.log(data); // contains <svg> > <g> > <path>, but we only want <p>
	// })

	// ----- when you don't add svg to data
	d3.html('img/football.svg', loadSVG1);
	function loadSVG1(svgData) { // load svg into the fragment
		// \ .empty() checks if selection has elements inside it, fires true after we moved the paths out of the fragments into main svg
		// \ .empty() with while statement lets us move all path elements into the SVG canvas out of the fragment
		while (!d3.select(svgData).selectAll('path').empty()) {
			d3.select('svg').node().appendChild(  // use .node() to access dom elements
				d3.select(svgData).select('path').node());
		}
		d3.selectAll('path').attr('transform', 'translate(50,50)'); // move 50x and 50y from left corner (0,0)
	}

	// ----- when you add svg to data
	d3.html('img/football.svg', loadSVG2);

	function loadSVG2(svgData) {
		// \ drawback1: can't use insert() so you need to put images in right order
		// \ drawback2: added with cloneNode() so they have no data bound to them > see next *
		d3.selectAll('g').each(function() { // each statement for each <g>
			var gParent = this; // = <g> node
			console.log(this);
			d3.select(svgData).selectAll('path').each(function() { // each statement for each <path>
				gParent.appendChild(this.cloneNode(true))  // clone the paths and append to each <g> (each team)
			});
		})

		recolorFootballs();
	}

	function recolorFootballs() {
		// d3.selectAll('path')
		// .attr('transform', 'translate(-15, -15) scale(0.3)') // make the football smaller
		// .style('fill', '#d206a4')
		// .style('stroke-width', '2px')
		// .style('stroke', 'white')
		// */
		// * (you can rebind: first select <g> .each() and then bind to <path> with .datum()=
		teamG.each(function(d) {
			d3.select(this)
				.selectAll('path')
				.datum(d) // 1 (singular for) data() - when you're binding 1 piece of data to an element)
		});

		var tenColorScale = d3.scale.category10(["UEFA", "CONMEBOL", "CAF", "AFC"]);

		d3.selectAll('path')
			.attr('transform', 'translate(-15, -15) scale(0.3)')
			.style('fill', function (p) {
				return tenColorScale(p.region);  // !! NOT DEFINED ERROR??
			})
			.style('stroke', 'white')
			.style('stroke-width', '2px');
	}
}
