d3.csv("data/sandbox/cities.csv",function(error,data) {console.log(error,data)});
// refer to data as data because csv file

// ----------------------------------------------
// LOG DATA, FIND MIN/MAX
d3.csv("data/sandbox/cities.csv", function(data) {
  // we want min/max/average of population attribute
  console.log(d3.min(data, function (el) {return +el.population})); // returns min [500000]
  console.log(d3.max(data, function (el) {return +el.population })); // returns max [13000000]
  console.log(d3.mean(data, function (el) {return +el.population })); // returns mean [6856250]
  console.log(d3.extent(data, function (el) {return +el.population})); // returns min and max like: [500000, 13000000]

  d3.min(data, function (el) {return +el.population});
  d3.max(data, function (el) {return +el.population });
  d3.mean(data, function (el) {return +el.population });
  d3.extent(data, function (el) {return +el.population});
});


// ----------------------------------------------
// DISPLAY CITY NAMES
d3.csv("data/sandbox/cities.csv",function(error,data) {dataViz(data);});
// csv and json are asynchronous, so to load data first you can nest the function 'dataViz' in the data loading function here

function dataViz(incomingData) {
  d3.select("body").selectAll("div.cities")  // 'empty selection' because no div exists with class='cities' in html
    .data(incomingData) // bind data to selecting
    .enter() // how to respond when more data than dom elements?
    .append("div") // append a div!
    // .insert() is like append but gives control where in the dom you put the element
    .attr("class","cities") // with class cities
    .html(function(d,i) { return d.label; }); // sets html content of new divs - here displays city name
}


// ----------------------------------------------
// BAR CHART
// show population per city
d3.csv("data/sandbox/cities.csv", function(error,data) {loadData(data);});

function loadData(incomingData) {

  // get max population value to determine domain
  var maxPopulation = d3.max(incomingData, function(el) {
    return parseInt(el.population); // transforms population value into integer
  });

  var yScale = d3.scale.linear().domain([0,maxPopulation]).range([0,460]);

  d3.select("svg").attr('style', 'height: 480px; width: 600px');
  d3.select("svg")
    .selectAll("rect")
    .data(incomingData)
    .enter()
    .append('rect') // every data point gets a rect
    .attr('width', '50')
    .attr('height', function(d) { return yScale(parseInt(d.population)); })
    .attr('x', function(d,i) { return i * 60 })
    .attr('y', function(d) { return 480 - yScale(parseInt(d.population)); })
    .style('fill', 'blue')
    .style('stroke', 'red')
    .style('stroke-width', '1px')
    .style('opacity', '.25');
};
