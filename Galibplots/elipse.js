d3.csv('data.csv', function (data) {
  // Variables
    console.log("data loaded!")
  var body = d3.select('body')
	var margin = { top: 50, right: 50, bottom: 50, left: 50 }
	var h = 1000 - margin.top - margin.bottom
	var w = 1000 - margin.left - margin.right
	//var formatPercent = d3.format('.2%')
	// Scales
  //var colorScale = d3.scale.category20()
    
    var colors = ["#1f77b4", "#2ca02c", "#d62728", "black"]
    var colorScale = d3.scale.ordinal()
                    .domain(["LEO", "MEO", "GEO", "Elliptical"])
                    //.domain(function (d) {return d.ClassOfOrbit})
                    .range(colors);
    
    function translateFn(d){
        
        return "rotate(" + d.Inclination+ ", 500, 500)"; 
        
    }
    
  var xScale = d3.scale.linear()
    .domain([
    	d3.min([0,d3.min(data,function (d) { return d.major})]),
    	d3.max([0,d3.max(data,function (d) { return d.major})])
    	])
    .range([0,100])
  var yScale = d3.scale.linear()
    .domain([
    	d3.min([0,d3.min(data,function (d) { return d.minor })]),
    	d3.max([0,d3.max(data,function (d) { return d.minor })])
    	])
    .range([100,0])
	// SVG
	var svg = body.append('svg')
	    .attr('height',h + margin.top + margin.bottom)
	    .attr('width',w + margin.left + margin.right)
        .attr("fill", "#636363")
	  .append('g')
	    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
	
  // Circles
  var ellipse = svg.selectAll('ellipse')
      .data(data)
      .enter()
    .append('ellipse')
      .attr('cx', 500 )
      .attr('cy', 500 )
      .attr('rx', function(d) {return xScale(d.major*0.05)})
      .attr('ry', function(d) {return yScale(d.minor*0.05)})
      .attr('transform', translateFn)
      .attr('stroke',function (d) { return colorScale(d.ClassOfOrbit)})
      .attr("fill", "none")
      .attr('stroke-width',.5)
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr("stroke","black")
          .attr('stroke-width',5)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('stroke-width',.5)
          .attr('stroke',function (d) { return colorScale(d.ClassOfOrbit)})
      })
    .append('title') // Tooltip
      .text(function (d) { return d.NameofSatellite +
                           '\nEccentricity: ' + d.Eccentricity +
                           '\nInclination: ' + d.Inclination +
                         '\nClass of orbit: ' + d.ClassOfOrbit})
  
})