
var margin = {top: 20, right: 20, bottom: 70, left: 20},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var axisMargin = 20,
    margin = 40,
    valueMargin = 4,
    //width = parseInt(d3.select('#linechart').style('width'), 10),
    //height = parseInt(d3.select('#linechart').style('height'), 10),
    barHeight = (height-axisMargin-margin*2)* 0.4/sc.length,
    barPadding = (height-axisMargin-margin*2)*0.6/sc.length,
    data, bar, svg, scale, xAxis, labelWidth = 0;

max = d3.max(sc, function(d) { return d.Count; });

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
            return d.Country;
        }).each(function() {
    labelWidth = Math.ceil(Math.max(0,90));//labelWidth, this.getBBox().width));
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

/*selection of bars*/
function select(){
    var Country = document.getElementById("Country").value;
    var Users = document.getElementById("Users").value;
    var Purpose = document.getElementById("Purpose").value;
    if(Country=="All" && Users=="All" && Purpose=="All"){location.reload()}
    console.log(Country);
    console.log(Users);
    console.log(Purpose);
    update(Country , Users, Purpose);
}

function update(Country, Users,Purpose){
    var svg = d3.select('#linechart1');
    svg.selectAll("g").remove();

    var axisMargin = 20,
        margin = 40,
        valueMargin = 4,
        barHeight = (height-axisMargin-margin*2)* 0.4/sc.length,
        barPadding = (height-axisMargin-margin*2)*0.6/sc.length,
        data, bar, svg, scale, xAxis, labelWidth = 0;

    max = d3.max(sc, function(d) { return d.Count; });

    svg = d3.select('#linechart1')
        .append('svg')
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
                return d.Country;
            }).each(function() {
        labelWidth = Math.ceil(Math.max(0,90)); 
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
            if (d.Country==Country && d.Users==Users && d.Purpose==Purpose ){ console.log(d.Count);return scale(d.Count);}
            else if(Country=="All") {if(d.Users==Users){return scale(d.Count)}}
            else if(Users=="All") {if(d.Country==Country){return scale(d.Count)}}
        })            
        .append('title') // Tooltip
        .text(function (d) {
            return d.Country + ' has ' + d.Count + ' satellites ';
        });


    svg.insert("g",":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
        .call(xAxis);
}
