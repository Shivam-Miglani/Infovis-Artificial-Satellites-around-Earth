// set the dimensions of the canvas
var cc2 =    [{
            "Country": "NR (10/17)",
            "Count": 236
        },
        {
            "Country": "NR (12/16)",
            "Count": 89
        },
        {
            "Country": "NR",
            "Count": 352
        },
        {
            "Country": "South Korea",
            "Count": 10
        },
        {
            "Country": "USA",
            "Count": 410
        },
        {
            "Country": "France",
            "Count": 64
        },
        {
            "Country": "Germany",
            "Count": 22
        },
        {
            "Country": "Norway",
            "Count": 6
        },
        {
            "Country": "Russia",
            "Count": 130
        },
        {
            "Country": "NR (9/17)",
            "Count": 31
        },
        {
            "Country": "United Kingdom",
            "Count": 41
        },
        {
            "Country": "Brazil",
            "Count": 11
        },
        {
            "Country": "Canada",
            "Count": 16
        },
        {
            "Country": "China",
            "Count": 110
        },
        {
            "Country": "Argentina",
            "Count": 2
        },
        {
            "Country": "ESA",
            "Count": 16
        },
        {
            "Country": "Japan",
            "Count": 45
        },
        {
            "Country": "Luxembourg",
            "Count": 17
        },
        {
            "Country": "Belarus",
            "Count": 1
        },
        {
            "Country": "Poland",
            "Count": 1
        },
        {
            "Country": "India",
            "Count": 28
        },
        {
            "Country": "NR (1/17)",
            "Count": 23
        },
        {
            "Country": "Italy",
            "Count": 7
        },
        {
            "Country": "Spain",
            "Count": 3
        },
        {
            "Country": "United Arab Emirates",
            "Count": 6
        },
        {
            "Country": "Turkey",
            "Count": 3
        },
        {
            "Country": "Mexico",
            "Count": 5
        },
        {
            "Country": "Germany/USA",
            "Count": 2
        },
        {
            "Country": "Malaysia",
            "Count": 4
        },
        {
            "Country": "EUMETSAT",
            "Count": 5
        },
        {
            "Country": "EUMETSAT/ESA",
            "Count": 1
        },
        {
            "Country": "Nigeria",
            "Count": 2
        },
        {
            "Country": "Sweden",
            "Count": 2
        },
        {
            "Country": "Australia",
            "Count": 5
        },
        {
            "Country": "Pakistan",
            "Count": 1
        },
        {
            "Country": "Indonesia",
            "Count": 2
        },
        {
            "Country": "Belgium",
            "Count": 1
        },
        {
            "Country": "Saudi Arabia",
            "Count": 11
        },
        {
            "Country": "NR (11/16)",
            "Count": 2
        }
    ];

var margin = {top: 20, right: 20, bottom: 70, left: 20},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var axisMargin = 20,
    margin = 40,
    valueMargin = 4,
    //width = parseInt(d3.select('#linechart').style('width'), 10),
    //height = parseInt(d3.select('#linechart').style('height'), 10),
    barHeight = (height-axisMargin-margin*2)* 0.4/cc2.length,
    barPadding = (height-axisMargin-margin*2)*0.6/cc2.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;

max = d3.max(cc2, function(d) { return d.Count; });

svg = d3.select('#bar')
    .append("svg")
    .attr("width", width)
    .attr("height", height);


bar = svg.selectAll("g")
    .data(cc2)
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
            return d.Country;
        }).each(function() {
    labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
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
        return scale(d.Count);
    })            
    .append('title') // Tooltip
    .text(function (d) {
        return d.Country + ' has ' + d.Count + ' satellites ';
    });


svg.insert("g",":first-child")
    .attr("class", "axisHorizontal")
    .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
    .call(xAxis);

