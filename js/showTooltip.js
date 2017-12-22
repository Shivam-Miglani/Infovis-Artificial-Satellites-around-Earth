//Show the tooltip on hover
function showTooltip(d) {

    //Show how to close tooltip
    d3.select("#tooltipInfo").style("visibility", "visible");

    //Set first location of tooltip and change opacity
    var xpos = 100;
    var ypos = 100;

    d3.select("#tooltip")
        .style('top',ypos+"px")
        .style('left',xpos+"px")
        .transition().duration(500)
        .style('opacity',1);


    //returns true (when the user clicks)
    d3.timer(function() {
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
