var ymax= 0.957;
var ymax1 = 0.0009;
var svg = d3.select('svg')

function update(ymax) {
    d3.csv('data.csv', function (data) {
  // Variables
    console.log("data loaded!")
    
    svg.selectAll(".dot").remove();
  var body = d3.select('body')
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 600 - margin.top - margin.bottom
	var w = 600 - margin.left - margin.right
    //var ymax= d3.max([0,d3.max(data,function (d) { return d.ecc })]);
    //var ymax1 = 0.0009;
    //console.log(ymax0)
	//var formatPercent = d3.format('.2%')
	// Scales
  //var colorScale = d3.scale.category20()
    
    var colors = ["blue", "green", "red", "black"]
    var colorScale = d3.scale.ordinal()
                    .domain(["LEO", "MEO", "GEO", "Elliptical"])
                    //.domain(function (d) {return d.ClassOfOrbit})
                    .range(colors);
    
  var xScale = d3.scale.linear()
    .domain([
    	d3.min([0,d3.min(data,function (d) { return d.Inclination})]),
    	d3.max([0,d3.max(data,function (d) { return d.Inclination})])
    	])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([ 0, ymax
    	//d3.min([0,d3.min(data,function (d) { return d.ecc })]),
    	//d3.max([0,d3.max(data,function (d) { return d.ecc })])
    	])
    .range([h,0])
	// SVG
  svg.attr('height',h + margin.top + margin.bottom)
	    .attr('width',w + margin.left + margin.right)
	  .append('g')
	    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
	// X-axis
	var xAxis = d3.svg.axis()
	  .scale(xScale)
	  //.tickFormat(formatPercent)
	  .ticks(10)
	  .orient('bottom')
 
    
    // Y-axis
	var yAxis = d3.svg.axis()
	  .scale(yScale)
	  //.tickFormat(formatPercent)
	  .ticks(10)
	  .orient('left')
    
    
    

    
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr("class", "dot")
      .attr('cx',function (d) { return xScale(d.Inclination) })
      .attr('cy',function (d) { return yScale(d.ecc) })
      .attr('r','2')
      .attr('stroke','black')
      .attr('stroke-width',.1)
      .attr('fill',function (d) { return colorScale(d.ClassOfOrbit)})
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',5)
          .attr('stroke-width',.3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',2)
          .attr('stroke-width',.1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.NameofSatellite +
                           '\nEccentricity: ' + d.ecc +
                           '\nInclination: ' + d.Inclination +
                         '\nClass of orbit: ' + d.ClassOfOrbit})
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Inclination')
  // Y-axis
    svg.append('g')
      .attr('class', 'axis')
      .attr("id", "y-axis")
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Eccentricity')
    
}
          ) }
       
    
function transition_axis() {
        
        
  
  // Alternate between 10 and 50 for yMax
  ymax = (ymax == 0.957 ? ymax1 : 0.957);

  // Update scale domain
  //yScale.domain([0, ymax]);
    update(ymax);

    // Grab y axis g element
  var axisEl = svg.select("#y-axis");
    
  // Update the axis
 axisEl.transition()
    .duration(500)
    .call(yAxis);
  
}


// Set up button click handler

d3.select("#transition-axis").on("click", transition_axis);
