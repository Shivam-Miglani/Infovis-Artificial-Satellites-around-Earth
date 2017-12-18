d3.csv('data.csv', function (data) {
  // Variables
    console.log("data loaded!")
  var body = d3.select('body')
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 600 - margin.top - margin.bottom
	var w = 600 - margin.left - margin.right
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
    	d3.min(data,function (d) { return d.Inclination}),
    	d3.max(data,function (d) { return d.Inclination})])
    	
    .range([0,w]);
    
  var yScale = d3.scale.linear()
    .domain([0,1])
    	//d3.min(data,function (d) { return d.Eccentricity}),
    	//d3.max(data,function (d) { return d.Eccentricity})])
    	
    .range([h,0]);
    
	// SVG
	var svg = body.append('svg')
	    .attr('height',h + margin.top + margin.bottom)
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
      .attr('cx',function (d) { return xScale(d.Inclination) })
      .attr('cy',function (d) { return yScale(d.Eccentricity) })
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
                           '\nEccentricity: ' + d.Eccentricity +
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
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Eccentricity')
})