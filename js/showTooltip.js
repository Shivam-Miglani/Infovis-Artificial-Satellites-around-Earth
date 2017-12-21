//Show the tooltip on hover
function showTooltip(d) {

    //Show how to close tooltip
    d3.select("#tooltipInfo").style("visibility", "visible");

    //Make a different offset for really small satellites
    //var Offset = (rScale(d.Radius)/2 < 2) ? 3 : rScale(d.Radius)/2;
    var xOffset = ((10*d.Radius)/2 < 3) ? 6 : (10*d.Radius)/2;
    var yOffset = ((10*d.Radius)/2 < 3) ? 0 : (10*d.Radius)/2;

    //Set first location of tooltip and change opacity
    var xpos = d.x + x/2 - xOffset + 3;
    var ypos = d.y + y/2 - yOffset - 5;

    d3.select("#tooltip")
        .style('top',ypos+"px")
        .style('left',xpos+"px")
        .transition().duration(500)
        .style('opacity',1);

    //Keep the tooltip moving with the planet, until stopTooltip
    //returns true (when the user clicks)
    d3.timer(function() {
        xpos = d.x + x/2 - xOffset + 3;
        ypos = d.y + y/2 - yOffset - 5;

        //Keep changing the location of the tooltip
        d3.select("#tooltip")
            .style('top',ypos+"px")
            .style('left',xpos+"px");

        //Breaks from the timer function when stopTooltip is changed to true
        //by another function
        if (stopTooltip == true) {
            //Hide tooltip info again
            d3.select("#tooltipInfo").style("visibility", "hidden");
            //Hide tooltip
            d3.select("#tooltip").transition().duration(300)
                .style('opacity',0)
                .call(endall, function() { //Move tooltip out of the way
                    d3.select("#tooltip")
                        .style('top',0+"px")
                        .style('left',0+"px");
                });
            //Remove show how to close
            return stopTooltip;
        }
    });

    //Change the texts inside the tooltip
    d3.select("#tooltip .tooltip-planet").text(d.name);
    d3.select("#tooltip .tooltip-year").html("Discovered in: " + d.LaunchSite);
    d3.select("#tooltip-period").html("Orbital period: " + formatSI(d.Periodminutes) + " minutes");
    d3.select("#tooltip-eccen").html("Eccentricity of orbit: " + d.Eccentricity);
    d3.select("#tooltip-radius").html("Weight of satellite: " + formatSI(d.Radius*1000));
    d3.select("#tooltip-dist").html("Approx. distance to Earth: " + formatSI(d.major) + " km");
}//showTooltip
