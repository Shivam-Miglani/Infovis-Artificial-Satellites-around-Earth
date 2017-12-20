//Width and Height of the SVG
var
    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementById('tab1')[0],
    x = (w.innerWidth || e.clientWidth || g.clientWidth) - 50,
    y = (w.innerHeight|| e.clientHeight|| g.clientHeight) - 50;

//Satellite orbit variables
var resolution = 1,
    speedUp = 400,
    radiusEarth = 6371, //km
    phi = 0, //rotation of ellipses
    radiusSizer = 5.5, //Size increaser of radii of satellites
    satOpacity = 0.4,
    scalingFactor = 0.01,
    timeFactor=60;

//Create SVG
var svg = d3.select("#motionsvgdiv").append("svg")
    .attr("width", 800)
    .attr("height", 800);

//Create a container for everything with the centre in the middle
var container = svg.append("g").attr("class","container")
    .attr("transform", "translate(" + x/2 + "," + y/2 + ")")


//Create Earth in the Middle
var ImageWidth = 50;
container.append("svg:image")
    .attr("x", -ImageWidth)
    .attr("y", -ImageWidth)
    .attr("class", "earth")
    .attr("xlink:href", "img/earth.png")
    .attr("width", ImageWidth*2)
    .attr("height", ImageWidth*2);


//Drawing a line for the orbit
var orbitsContainer = container.append("g").attr("class","orbitsContainer");
var orbits = orbitsContainer.selectAll("g.orbit")
    .data(satellites).enter().append("ellipse")
    .attr("class", "orbit")
    .attr("cx", function(d) {return d.cx* scalingFactor;})
    .attr("cy", function(d) {return d.cy;})
    .attr("rx", function(d) {return d.major* scalingFactor;})
    .attr("ry", function(d) {return d.minor* scalingFactor;})
    .style("fill", "#3E5968")
    .style("fill-opacity", 0)
    .style("stroke", "white")
    .style("stroke-opacity", 0);

// Drawing the satellites
var satContainer = container.append("g").attr("class","satContainer");
var satellite = satContainer.selectAll("g.sat")
    .data(satellites).enter()
    .append("circle")
    .attr("class", "sat")
    .attr("r", function(d) {return radiusSizer*0.3;})
    .attr("cx", function(d) {return d.major;})
    .attr("cy", 0)
    .style("fill", "red")
    .style("opacity", satOpacity)
    .style("stroke-opacity", 0)
    .style("stroke-width", "3px")
    .style("stroke", "yellow")
    .on("mouseover", function(d, i) {
        showEllipse(d, i, 0.8);
    })
    .on("mouseout", function(d, i) {
        showEllipse(d, i, 0.8);
    });





