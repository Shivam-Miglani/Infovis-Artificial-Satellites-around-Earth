//Let's get some numbers from the satCount data
//first, frequency of 


// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var axisMargin = 20,
    margin = 40,
    valueMargin = 4,
    //width = parseInt(d3.select('#linechart').style('width'), 10),
    //height = parseInt(d3.select('#linechart').style('height'), 10),
    barHeight = (height-axisMargin-margin*2)* 0.4/sc.length,
    barPadding = (height-axisMargin-margin*2)*0.6/sc.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;

max = d3.max(sc, function(d) { return d.Purpose; });

svg = d3.select('#linechart1')
    .append("svg")
    .attr("width", width)
    .attr("height", height);


bar = svg.selectAll("g")
    .data(sc)
    .enter()
    .append("g");

bar.attr("class", "bar")
    .attr("cx",0)
    .attr("transform", function(d, i) {
        return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
    });

bar.append("text")
        .attr("class", "label")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em") //vertical align middle
        .text(function(d){
            return d.Purpose;
        }).each(function() {
    labelWidth = Math.ceil(Math.max(0,30));//labelWidth, this.getBBox().width));
});

scale = d3.scale.linear()
    .domain([0, max])
    .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
    .scale(scale)
    .tickSize(-height + 2*margin + axisMargin)
    .orient("bottom");

bar.append("rect")
    .attr("transform", "translate("+labelWidth+", 0)")
    .attr("height", barHeight)
    .attr("width", function(d){
        return scale(d.Purpose);
    })            
    .append('title') // Tooltip
    .text(function (d) {
        return d.launchYear + ' has ' + d.Count;
    });



svg.insert("g",":first-child")
    .attr("class", "axisHorizontal")
    .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
    .call(xAxis);

