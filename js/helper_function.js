//Change x and y coordinates of each satellite
d3.timer(function() {
    d3.selectAll(".sat")
        .attr("cx", locate("x"))
        .attr("cy", locate("y"))
        .attr("transform", function(d) {
            return "rotate(" + (d.theta%360) + "," + d.x + "," + d.y + ")";
        })
    ;
});

//Calculate the new x or y position per satellite
function locate(coord) {
    return function(d){
        var k = 360 * d.major * d.minor / ((d.Periodminutes/60) * resolution * speedUp);

        for (var i = 0; i < resolution; i++) {
            d.theta += k / (d.r * d.r);
            d.r = d.major  * (1 - d.Eccentricity * d.Eccentricity) / (1 - d.Eccentricity * Math.cos(toRadians(d.theta)));
            d.r = d.r * scalingFactor
        }

        var x1 = d.r * Math.cos(toRadians(d.theta)) - d.focus;

        var y1 = d.r * Math.sin(toRadians(d.theta));

        if (d.theta > 360) {d.theta -= 360;}

        if (coord === "x") {
            //New x coordinates
            newX = d.cx + x1 * Math.cos(toRadians(phi)) - y1 * Math.sin(toRadians(phi));
            d.x = newX;
            //console.log(newX);
            return newX;
        } else if (coord === "y") {
            newY = d.cy + x1 * Math.sin(toRadians(phi)) + y1 * Math.cos(toRadians(phi));
            d.y = newY;
            //console.log(newY);
            return newY;
        }
    };
}//function locate

//Show the total orbit of the hovered over satellite
function showEllipse(d, i, opacity) {
    var satellite = i;
    var duration = (opacity == 0) ? 2000 : 100; //If the opacity is zero slowly remove the orbit line


    svg.selectAll(".sat")
        .filter(function(d, i) { return i == satellite;})
        .transition().duration(duration)
        .style("stroke-opacity", opacity * 1.25);

    //Select the orbit with the same index as the satellite
    svg.selectAll(".orbit")
        .filter(function(d, i) {console.log(i==satellite); return i == satellite;})
        .transition().duration(duration)
        .style("stroke-opacity", opacity)
        .style("fill-opacity", opacity/3);

}

//Decrease opacity of non selected stellar classes when hovering in Legend
function classSelect(opacity) {
    return function(d, i) {
        stopTooltip = true;
        var chosen = d.sClass;
        svg.selectAll(".sat")
            .filter(function(d) { return d.class != chosen; })
            .transition()
            .style("opacity", opacity);
    };
}//function classSelect

//Turn degrees into radians
function toRadians (angle) { return angle * (Math.PI / 180);}

//Show the information box
function showInfo() {
    d3.select("#information").style("z-index","1000").transition().duration(300).style('opacity',1);
    stopTooltip = true;
    removeEvents();
}//showInfo

//Hide the information box
function closeInfo() {
    d3.select('#information').transition().duration(300).style('opacity',0)
        .call(endall,  function() {
            d3.select('#information').style("z-index","-1000");
        });
    resetEvents();
}//closeInfo

//Remove all events
function removeEvents() {
    //Remove event listeners during examples
    d3.selectAll('.sat').on('mouseover', null).on('mouseout', null);
    d3.select("svg").on("click", null);
}//function removeEvents

//Reset all events
function resetEvents() {
    //Replace saatellite events
    d3.selectAll('.sat')
        .on("mouseover", function(d, i) {
            stopTooltip = false;
            showTooltip(d);
            showEllipse(d, i, 0.8);
        })
        .on("mouseout", function(d, i) {
            showEllipse(d, i, 0);
        });



    //Replace click event
    d3.select("svg")
        .on("click", function(d) {stopTooltip = true;});
}


//Highlight the chosen planet and its orbit
function highlight(planet, delayTime){

    if(typeof(delayTime)==='undefined') delayTime = 0;
    //if(typeof(tooltip)==='undefined') tooltip = true;
    var time = 1000;

    //Highlight the chosen planet
    svg.selectAll(".sat")
        .filter(function(d, i) {return i == planet;})
        .transition().delay(700 * delayTime).duration(time)
        .style("stroke-opacity", 1)
        .style("opacity", 0.95)
    //.transition()
    //.each(function(d) {if (tooltip == true) {showTooltip(d);}})
    ;

    //Select the orbit with the same index as the planet
    svg.selectAll(".orbit")
        .filter(function(d, i) {return i == planet;})
        .transition().delay(700 * delayTime).duration(time)
        .style("stroke-opacity", 0.8)
        .style("fill-opacity", 0.2);

}//function highlight


//Function to bring opacity back of all satellites
function bringBack(opacity, delayTime){

    if(typeof(delayTime)==='undefined') delayTime = 0;
    var time = 500;

    //Change opacity of all
    svg.selectAll(".sat")
        .transition().delay(700 * delayTime).duration(time)
        .style("opacity", opacity);

}//function bringBack


//Dim all other satellites (and orbits)
function dimOne(planet, delayTime) {

    if(typeof(delayTime)==='undefined') delayTime = 0;
    var time = 500;

    //Dim all other satellites
    svg.selectAll(".sat")
        .filter(function(d, i) {return i == planet;})
        .transition().delay(700 * delayTime).duration(time)
        .style("stroke-opacity", 0)
        .style("opacity", 0.1);

    //Select the orbit with the same index as the planet
    svg.selectAll(".orbit")
        .filter(function(d, i) {return i == planet;})
        .transition().delay(700 * delayTime).duration(time)
        .style("stroke-opacity", 0)
        .style("fill-opacity", 0);

}//function dim


//Dim all satellites (and orbits)
function dim(delayTime) {

    if(typeof(delayTime)==='undefined') delayTime = 0;
    var time = 1000;

    //Dim all other satellites
    svg.selectAll(".sat")
        .transition().delay(700 * delayTime).duration(time)
        .style("stroke-opacity", 0)
        .style("opacity", 0.1);

    //Select the orbit with the same index as the planet
    svg.selectAll(".orbit")
        .transition().delay(700 * delayTime).duration(time)
        .style("stroke-opacity", 0)
        .style("fill-opacity", 0);

}//function dim


//Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text
function wrap(text, width) {
    var text = d3.select(this[0][0]),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
    }
};

//Taken from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
//Calls a function only after the total transition ends
function endall(transition, callback) {
    var n = 0;
    transition
        .each(function() { ++n; })
        .each("end", function() { if (!--n) callback.apply(this, arguments); });
}

//Outline taken from http://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js
function updateWindow(){
    x = (e.clientWidth || g.clientWidth) - 50;
    y = (e.clientHeight|| g.clientHeight) - 50;

    svg.attr("width", x).attr("height", y);
    d3.selectAll(".container").attr("transform", "translate(" + x/2 + "," + y/2 + ")");
    d3.selectAll(".legendContainer").attr("transform", "translate(" + 30 + "," + (y - 90) + ")");
    d3.select("#crazy").style("left", (x/2 - 112/2 + 6) + "px").style("top", (y/2 - 100) + "px");
}
