//Width and Height of the SVG
var
    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = (w.innerWidth || e.clientWidth || g.clientWidth) - 50,
    y = (w.innerHeight|| e.clientHeight|| g.clientHeight) - 50;

window.onresize = updateWindow;

//Satellite orbit variables
var resolution = 1,
    speedUp = 400,
    au = 149597871, //km
    radiusEarth = 6371, //km
    phi = 0, //rotation of ellipses
    radiusSizer = 6, //Size increaser of radii of planets
    planetOpacity = 0.6;
scalingFactor = 0.01;
timeFactor=1;



//Create SVG
var svg = d3.select("#planetarium").append("svg")
    .attr("width", x)
    .attr("height", y);



//Create a container for everything with the centre in the middle
var container = svg.append("g").attr("class","container")
    .attr("transform", "translate(" + x/2 + "," + y/2 + ")")




//Create Earth in the Middle - scaled to the orbits
//Radius of Earth in these coordinates (taking into account size of circle inside image)
var ImageWidth = radiusEarth*10/au * 3000 * (2.7/1.5);
container.
append("svg:image")
    .attr("x", -ImageWidth)
    .attr("y", -ImageWidth)
    .attr("class", "sun")
    .attr("xlink:href", "img/earth.png")
    .attr("width", ImageWidth*2)
    .attr("height", ImageWidth*2)
    .attr("text-anchor", "middle");


///////////////////////////////////////////////////////////////////////////
/////////////////////////// Plot and move planets /////////////////////////
///////////////////////////////////////////////////////////////////////////

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
var planetContainer = container.append("g").attr("class","planetContainer");
var satellites = planetContainer.selectAll("g.planet")
    .data(satellites).enter()
    .append("circle")
    .attr("class", "planet")
    .attr("r", function(d) {return radiusSizer*0.6;})   //rScale(d.Radius);})
    .attr("cx", function(d) {return d.major;})
    .attr("cy", function(d) {return 0;})
    .style("fill", "red")
    .style("opacity", planetOpacity)
    .style("stroke-opacity", 0)
    .style("stroke-width", "3px")
    .style("stroke", "yellow")
    .on("mouseover", function(d, i) {
        stopTooltip = false
        showTooltip(d);
        showEllipse(d, i, 0.8);
    })
    .on("mouseout", function(d, i) {
        showEllipse(d, i, 0.8);
    });





