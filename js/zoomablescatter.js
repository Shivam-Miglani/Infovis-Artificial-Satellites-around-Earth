//Initial drawing with All Country and All Users
start();

//Declaring variables
var margin, width, height, colors, colorScale, x, y, tooltip, xAxis, yAxis, svg, clip, scatter, brush, idleTimeout, idleDelay, Country, Users;

//Select function that selects Country and Users from HTML drop-down
function select(){
            var Country = document.getElementById("Country").value;
            var Users = document.getElementById("Users").value;


            if(Country=="All" && Users=="All"){start()} //calls the initial overview drawing
            else{
            update(Country , Users); //updates the drawing according to the selection
                select1();
            }
        }

//Update function
function update(Country,Users){
d3.csv('data_ellipse.csv', function (data) {

    svg = d3.select("#scattersvg")
            .selectAll("g").remove();

     margin = { top: 50, right: 20, bottom: 30, left: 30 };
     width = 600 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;

     colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"]
     colorScale = d3.scaleOrdinal()
        .domain(["LEO", "MEO", "GEO", "Elliptical"])
        .range(colors);

    //X-Scale

     x = d3.scaleLinear()
        .domain([
            d3.min([0,d3.min(data,function (d) { return d.Inclination})]),
            d3.max([0,d3.max(data,function (d) { return d.Inclination})])
        ])
        .range([0, width])
        .nice();

    //Y-Scale
     y = d3.scaleLinear()
        .domain([
            d3.min([0,d3.min(data,function (d) { return d.ecc })]),
            d3.max([0,d3.max(data,function (d) { return d.ecc })])
        ])
        .range([height, 0]);


     tooltip = d3.select("#zoomableScatter").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    //Defining Axes
        xAxis = d3.axisBottom(x).ticks(12)
        yAxis = d3.axisLeft(y).ticks(12 * height / width);


    //Selecting the SVG in HTML

     svg = d3.select("#scattersvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //clip definition
     clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);


    //Scatter plot field
     scatter = svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");

    //brush
     brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
     idleTimeout,
     idleDelay = 350;

    //Initializing the zoom brush
    scatter.append("g")
        .attr("class", "brush")
        .call(brush)

    //Drawing datapoints
    scatter.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { if (d.Country==Country && d.Users==Users){return x(d.Inclination)}
                              else if(Country=="All") {if(d.Users==Users){return x(d.Inclination)}}
                              else if(Users=="All") {if(d.Country==Country){return x(d.Inclination)}}})
        .attr("cy", function (d) { if (d.Country==Country && d.Users==Users){return y(d.ecc)}
                              else if(Country=="All") {if(d.Users==Users){return y(d.ecc)}}
                              else if(Users=="All") {if(d.Country==Country){return y(d.ecc)}}})
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colorScale(d.ClassOfOrbit)})
        .on('mouseover', function () {

            d3.select(this)
                .transition()
                .duration(500)
                .attr('r',6)
                //.attr('stroke-width',.5)
                //.attr('stroke', 'black')
        })
        .on('mouseout', function () {

            d3.select(this)
                .transition()
                .duration(500)
                .attr('r',4)

        })
        .append('title') // Appending Tooltip
        .text(function (d) { return d.NameofSatellite +
            '\nEccentricity: ' + d.ecc +
            '\nInclination: ' + d.Inclination +
            '\nClass of orbit: ' + d.ClassOfOrbit});




    // x axis call
    svg.append("g")
        .attr("class", "x axis")
        .attr('id', "axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")
        .style("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 28)
        .text("Inclination");

    // y axis call
    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Eccentricity");



    //End of brush
    function brushended() {

        var s = d3.event.selection;
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            x.domain(d3.extent(data, function (d) { return d.Inclination; })).nice();
            y.domain(d3.extent(data, function (d) { return d.ecc; })).nice();
        } else {
            console.log("selected!")
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            scatter.select(".brush").call(brush.move, null);
        }
        zoom();

    }

    function idled() {
        idleTimeout = null;
    }

    //function for zooming
    function zoom() {

        var t = scatter.transition().duration(750);
        svg.select("#axis--x").transition(t).call(xAxis);
        svg.select("#axis--y").transition(t).call(yAxis);
        scatter.selectAll("circle").transition(t)
            .attr("cx", function (d) { if (d.Country==Country && d.Users==Users){return x(d.Inclination)}
                              else if(Country=="All") {if(d.Users==Users){return x(d.Inclination)}}
                              else if(Users=="All") {if(d.Country==Country){return x(d.Inclination)}}})
            .attr("cy", function (d) { if (d.Country==Country && d.Users==Users){return y(d.ecc)}
                              else if(Country=="All") {if(d.Users==Users){return y(d.ecc)}}
                              else if(Users=="All") {if(d.Country==Country){return y(d.ecc)}}});

    }
})
}

//this function is exactly identical to the update function but this draws all the datapoints
function start(){
    start1();

    d3.csv('data_ellipse.csv', function (data) {

    svg = d3.select("#scattersvg")

    margin = { top: 50, right: 20, bottom: 30, left: 30 };
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

     colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"]
     colorScale = d3.scaleOrdinal()
        .domain(["LEO", "MEO", "GEO", "Elliptical"])
        .range(colors);

     x = d3.scaleLinear()
        .domain([
            d3.min([0,d3.min(data,function (d) { return d.Inclination})]),
            d3.max([0,d3.max(data,function (d) { return d.Inclination})])
        ])
        .range([0, width])
        .nice();

     y = d3.scaleLinear()
        .domain([
            d3.min([0,d3.min(data,function (d) { return d.ecc })]),
            d3.max([0,d3.max(data,function (d) { return d.ecc })])
        ])
        .range([height, 0]);


     tooltip = d3.select("#zoomableScatter").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);



     xAxis = d3.axisBottom(x).ticks(12)
     yAxis = d3.axisLeft(y).ticks(12 * height / width);


     svg = d3.select("#scattersvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);



     scatter = svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");

     brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    scatter.append("g")
        .attr("class", "brush")
        .call(brush)

    scatter.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d.Inclination); })
        .attr("cy", function (d) { return y(d.ecc); })
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colorScale(d.ClassOfOrbit)})
        .on('mouseover', function () {

            d3.select(this)
                .transition()
                .duration(500)
                .attr('r',6)
                //.attr('stroke-width',.5)
                //.attr('stroke', 'black')
        })
        .on('mouseout', function () {

            d3.select(this)
                .transition()
                .duration(500)
                .attr('r',4)

        })
        .append('title') // Tooltip
        .text(function (d) { return d.NameofSatellite +
            '\nEccentricity: ' + d.Eccentricity +
            '\nInclination: ' + d.Inclination +
            '\nClass of orbit: ' + d.ClassOfOrbit});




    // x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr('id', "axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")
        .style("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 28)
        .text("Inclination");

    // y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Eccentricity");




    function brushended() {

        var s = d3.event.selection;
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            x.domain(d3.extent(data, function (d) { return d.Inclination; })).nice();
            y.domain(d3.extent(data, function (d) { return d.ecc; })).nice();
        } else {
            console.log("selected!")
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            scatter.select(".brush").call(brush.move, null);
        }
        zoom();

    }

    function idled() {
        idleTimeout = null;
    }

    function zoom() {

        var t = scatter.transition().duration(750);
        svg.select("#axis--x").transition(t).call(xAxis);
        svg.select("#axis--y").transition(t).call(yAxis);
        scatter.selectAll("circle").transition(t)
            .attr("cx", function (d) { return x(d.Inclination); })
            .attr("cy", function (d) { return y(d.ecc); });

    }
})

}
