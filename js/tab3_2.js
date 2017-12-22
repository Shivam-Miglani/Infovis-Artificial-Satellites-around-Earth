var margin = {top: 80, right: 70, bottom: 90, left: 70},
    width = 750 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#year_count").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

x.domain(scByLaunchYear.map(function (d) {
    return d.key;
}));
y.domain([0, d3.max(scByLaunchYear, function (d) {
    return d.value;
})]);


// Set up the x axis
var xaxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x axis")
    .call(d3.axisBottom(x)
        .tickSize(0, 0)
        .tickSizeInner(0)
        .tickPadding(10))
    .selectAll("text")
    .style("font-size", "8px")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-1.3em")
    .attr("transform", "rotate(-90)" );

// Add the Y Axis
var yaxis = svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y)
        //.ticks(10)
        .tickSizeInner(0)
        .tickPadding(6)
        .tickSize(0, 0));


//label to the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 60)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Satellites")
    .attr("class", "y axis label");

//label for x axis
svg.append("text")
    .attr("y", 0 + (height+70))
    .attr("x", 0 + (width/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Year")
    .attr("class", "x axis label");

// Draw the bars
svg.selectAll(".rect")
    .data(scByLaunchYear)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .append('title')
    .text(function (d) { return "Number of satellites: "+d.value;});
