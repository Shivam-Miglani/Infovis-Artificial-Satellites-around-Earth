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
    
    //var colors = ["blue", "green", "red"]
    //var colorScale = d3.scale.ordinal()
                    //.domain(["LEO", "MEO", "GEO"])
                    //.domain(function (d) {return d.ClassOfOrbit})
                    //.range(colors);
    
  var xScale = d3.scale.ordinal()
    .domain(["Communications", "Surveillance", "Technology Development", "Navigation/GPS", "Earth Observation", "Communications", "Space Science", "Earth Science", "Technology Demonstration", "Multiple" ])
    .rangePoints([0,w])
  var yScale = d3.scale.ordinal()
    .domain(["Civil", "Commercial", "Government", "Military"])
    .rangePoints([h,0])
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
	  .ticks(4)
	  .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.Purpose) })
      .attr('cy',function (d) { return yScale(d.Users) })
      .attr('r','5')
      .attr('stroke','black')
      .attr('stroke-width',.1)
      //.attr('fill',function (d) { return colorScale(d.ClassOfOrbit)})
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',.3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',5)
          .attr('stroke-width',.1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.NameofSatellite +
                           '\nPurpose: ' + d.Purpose +
                           '\nUser: ' + d.Users 
                         })
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
      .text('Purpose')
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
      .text('User')
})