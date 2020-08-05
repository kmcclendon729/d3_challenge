// Step 1: set up the chart area
//==================================================================
// Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


// Step 2: create an SVG wrapper
//==================================================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Step 3: Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
//==================================================================
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Step 4: Load data from data.csv
//==================================================================
d3.csv("./assets/data/data.csv").then(function(povertyData) {

  // check to make sure the data is being pulled in correctly
  console.log(povertyData);

  // format the poverty and obesity data as numbers
  povertyData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.obesity = +data.obesity
  });

  // save poverty and obesity to variables
  var poverty = povertyData.map(d => d.poverty);
    console.log(poverty);

  var povMax = d3.max(poverty)
    console.log(povMax);

    var povMin = d3.min(poverty)
    console.log(povMin);

  var obesity = povertyData.map(d => d.obesity);
  console.log(obesity);


  // Step 5: create scales
  //==================================================================
  var xScale = d3.scaleLinear()
    .domain([8, d3.max(poverty)])
    // .range([chartMargin.left, chartWidth-chartMargin.right]);
    // .range([0, svgWidth]);
    .range([0, chartWidth]);


  var yScale = d3.scaleLinear()
  .domain([20, d3.max(obesity)])
  // .range([chartHeight - chartMargin.top, chartMargin.bottom]);
  // .range([svgHeight, 0]);
  .range([chartHeight, 0]);


  // Step 6: Create Axes
  //==================================================================
  var bottomAxis = d3.axisBottom(xScale); 
  var leftAxis = d3.axisLeft(yScale); 


  // Step 7: Append the axes to the chart group
  //==================================================================
  // add bottom axis
  chartGroup.append("g")
    .call(bottomAxis)
    .attr("transform", `translate(0, ${chartHeight})`);

  // add left axis
  chartGroup.append("g")
    .call(leftAxis)

    
  // Step 8: Create axes labels
  //==================================================================
  chartGroup.append("text")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + chartMargin.bottom)
    .style("text-anchor", "middle")
    .text("Poverty Rate");   

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (chartHeight / 2))
    .attr("y", 0 - chartMargin.left)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Obesity Rate");   
  

  // Step 9: add circles for each state's data point (x =poverty, y = obesity)
  //==================================================================
  var radius = 15
  var circles = chartGroup.selectAll("circle")
    .data(povertyData)
    .enter();

    circles
    .append("circle")
    // set the x, y coordinates to the poverty and obesity data points
    .attr("cx", d => xScale(d.poverty))  
    .attr("cy", d => yScale(d.obesity))
    .attr("r", radius)
    .attr("fill", "blue")
    .attr("opacity", ".5");


    // add text to the circles displaying the abbreviation for the state
    circles.append("text")
    .text(d => d.abbr)
    .attr("dx", d => xScale(d.poverty) - radius/2)  
    .attr("dy", d => yScale(d.obesity) + radius/2)

});
