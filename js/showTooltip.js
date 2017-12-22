//Show the tooltip on hover
function showTooltip(d) {

    //Show how to close tooltip
    d3.select("#tooltipInfo").style("visibility", "visible");

    //Make a different offset for really small planets
    //var Offset = (rScale(d.Radius)/2 < 2) ? 3 : rScale(d.Radius)/2;
    var xOffset = ((10*d.Radius)/2 < 3) ? 6 : (10*d.Radius)/2;
    var yOffset = ((10*d.Radius)/2 < 3) ? 0 : (10*d.Radius)/2;

    //Set first location of tooltip and change opacity
    var xpos = 100;
    var ypos = 100;

    d3.select("#tooltip")
        .style('top',ypos+"px")
        .style('left',xpos+"px")
        .transition().duration(500)
        .style('opacity',1);

    //Change the texts inside the tooltip
    d3.select("#tooltip .tooltip-planet").text(d.name);
    d3.select("#tooltip .tooltip-year").html("Discovered in: " + d.discovered);
    //d3.select("#tooltip-class").html("Temperature of star: " + d.temp + " Kelvin");
    d3.select("#tooltip-period").html("Orbital period: " + formatSI(d.period) + " days");
    d3.select("#tooltip-eccen").html("Eccentricity of orbit: " + d.e);
    d3.select("#tooltip-radius").html("Radius of planet: " + formatSI(d.Radius * 11.209 ) + " Earth radii");
    d3.select("#tooltip-dist").html("Approx. distance to its Star: " + formatSI(d.major/3000) + " au");
}//showTooltip
