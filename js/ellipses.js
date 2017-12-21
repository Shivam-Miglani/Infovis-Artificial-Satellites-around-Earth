//Calling the initial drawing function
start1();


//Select function that selects Country and Users from HTML drop-down
function select1(){
    var Country = document.getElementById("Country").value;
    var Users = document.getElementById("Users").value;
    console.log("kuttamara")
    if(Country=="All" && Users=="All"){start1()}
    else{
        update1(Country , Users);
    }
}



//Update function
function update1(Country, Users){
    d3.csv('data.csv', function (data) {


        var svg = d3.select('#ellipsesvg');
        svg.selectAll("g").remove();
        var margin = { top: 15, right: 50, bottom: 50, left: 50 }
        var h = 1000 - margin.top - margin.bottom
        var w = 1000 - margin.left - margin.right

        var colors = ["#1f77b4", "#2ca02c", "#d62728", "black"]
        var colorScale = d3.scale.ordinal()
            .domain(["LEO", "MEO", "GEO", "Elliptical"])
            .range(colors);

        //This function is to get the rotation of the ellipses according to their Inclination keeping the center point fixed
        function translateFn(d){

            return "rotate(" + d.Inclinationdegrees+ ", 385, 312)";

        }

        //X-Scale
        var xScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.major})]),
                d3.max([0,d3.max(data,function (d) { return d.major})])
            ])
            .range([0,50])

        //Y-Scale
        var yScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.minor })]),
                d3.max([0,d3.max(data,function (d) { return d.minor })])
            ])
            .range([50,0])
        // SVG selection from the HTML
        svg = d3.select('#ellipsesvg')
            .attr('height',h + margin.top + margin.bottom)
            .attr('width',w + margin.left + margin.right)
            .attr("fill", "#636363")
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');



        //console.log(Users);

        // Drawing the ellipses (orbits)
        var ellipse = svg.selectAll('ellipse')
            .data(data)
            .enter()
            .append('ellipse')
            .attr('cx', 385 )
            .attr('cy', 312 )
            .attr('rx', function(d) {if (d.Country==Country && d.Users==Users){return xScale(d.major*0.05)}
            else if(Country=="All") {if(d.Users==Users){return xScale(d.major*0.05)}}
            else if(Users=="All") {if(d.Country==Country){return xScale(d.major*0.05)}}})
            .attr('ry', function(d) {if (d.Country==Country && d.Users==Users){return yScale(d.minor*0.05)}
            else if(Country=="All"){if(d.Users==Users){return yScale(d.minor*0.05)}}
            else if(Users=="All"){if(d.Country==Country){return yScale(d.minor*0.05)}}})
            .attr('transform', translateFn)
            .attr('stroke',function (d) { return colorScale(d.ClassofOrbit)})
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
                    .attr('stroke',function (d) { return colorScale(d.ClassofOrbit)})
            })
            .append('title') // Appending Tooltip
            .text(function (d) { return d.NameofSatellite +
                '\nEccentricity: ' + d.Eccentricity +
                '\nInclination: ' + d.Inclinationdegrees +
                '\nClass of orbit: ' + d.ClassofOrbit
            })

    })

}

//Initial drawing with All countries All users similar to update function
function start1(){
    d3.csv('data.csv', function (data) {


        var svg = d3.select('#ellipsesvg');
        svg.selectAll("g").remove();
        var margin = { top: 15, right: 50, bottom: 50, left: 50 }
        var h = 1000 - margin.top - margin.bottom
        var w = 1000 - margin.left - margin.right

        var colors = ["#1f77b4", "#2ca02c", "#d62728", "black"]
        var colorScale = d3.scale.ordinal()
            .domain(["LEO", "MEO", "GEO", "Elliptical"])
            .range(colors);

        function translateFn(d){

            return "rotate(" + d.Inclinationdegrees+ ", 385, 312)";

        }

        var xScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.major})]),
                d3.max([0,d3.max(data,function (d) { return d.major})])
            ])
            .range([0,50])
        var yScale = d3.scale.linear()
            .domain([
                d3.min([0,d3.min(data,function (d) { return d.minor })]),
                d3.max([0,d3.max(data,function (d) { return d.minor })])
            ])
            .range([50,0])

        // SVG
        svg = d3.select('#ellipsesvg')
            .attr('height',h + margin.top + margin.bottom)
            .attr('width',w + margin.left + margin.right)
            .attr("fill", "#636363")
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');




        // Drawing Ellipses
        var ellipse = svg.selectAll('ellipse')
            .data(data)
            .enter()
            .append('ellipse')
            .attr('cx', 385 )
            .attr('cy', 312 )
            .attr('rx', function(d) {return xScale(d.major*0.05)})
            .attr('ry', function(d) {return yScale(d.minor*0.05)})
            .attr('transform', translateFn)
            .attr('stroke',function (d) { return colorScale(d.ClassofOrbit)})
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
                '\nInclination: ' + d.Inclinationdegrees +
                '\nClass of orbit: ' + d.ClassofOrbit
            })

    })

}
