// load the data
d3.json("launchYearCount.json", function(error, data) {

    data.forEach(function(d) {
        d.launchYear = d.launchYear;
        d.launchCount = +d.launchCount;
    });


    var width = 500;
    var height = 400;
    var margin = {top:10,left:10,bottom:30,right:10};

    var x = d3.scale.ordinal()
        .rangeRoundBands([margin.left,width-margin.right])
        .domain(data.map(function(d) { return d.launchYear }));

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(5);

    var y = d3.scale.linear()
        .range([height-margin.bottom,margin.top])
        .domain([d3.min(data,function(d) { return d.launchCount; }), d3.max(data, function(d) { return d.launchCount; })
        ]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5);

    var svg = d3.select("#linechart")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    var line = d3.svg.line()
        .x(function(d) { return x(d.launchYear) + x.rangeBand()/2; })
        .y(function(d) { return y(d.launchCount); });

    svg.append("path")
        .datum(data)
        .attr("d",line)
        .attr("fill","none")
        .attr("stroke","steelblue");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - margin.bottom)  + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + (height - margin.left)  + ")")
        .call(yAxis);
});