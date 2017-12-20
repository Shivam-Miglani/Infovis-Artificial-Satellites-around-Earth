//Change x and y location of each satellite
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
        var k = 360 * d.major * d.minor  / ((d.Periodminutes*timeFactor) * resolution * speedUp);

        for (var i = 0; i < resolution; i++) {
                    d.theta += k / (d.r * d.r);
                    d.r = d.major * (1 - d.Eccentricity * d.Eccentricity) / (1 - d.Eccentricity * Math.cos(toRadians(d.theta)));
                    d.r = d.r * scalingFactor;
        }
        //console.log(d.theta)
        var x1 = d.r * Math.cos(toRadians(d.theta)) - (d.focus*scalingFactor);
        //console.log(x1);
        var y1 = d.r * Math.sin(toRadians(d.theta));
        //console.log(y1)
        if (d.theta > 360) {d.theta -= 360;}

        if (coord === "x") {
            newX = d.cx + x1 * Math.cos(toRadians(phi)) - y1 * Math.sin(toRadians(phi));
            d.x = newX;
            //console.log(newX);
            return newX;
        } else if (coord === "y") {
            newY =  d.cy + x1 * Math.sin(toRadians(phi)) + y1 * Math.cos(toRadians(phi));
            d.y = newY;
            //console.log(newY);
            return newY;
        }
    };
}

//Show the total orbit of the hovered over planet
function showEllipse(d, i, opacity) {
    var satellite = i;
    var duration = (opacity === 0) ? 2000 : 100; //If the opacity is zero slowly remove the orbit line

    //Highlight the chosen planet
    svg.selectAll(".sat")
        .filter(function(d, i) {return i == satellite;})
        .transition().duration(duration)
        .style("stroke-opacity", opacity * 1.25);

    //Select the orbit with the same index as the planet
    svg.selectAll(".orbit")
        .filter(function(d, i) {return i == satellite;})
        .transition().duration(duration)
        .style("stroke-opacity", opacity)
        .style("fill-opacity", opacity/3);

}

//Turn degrees into radians
function toRadians (angle) { return angle * (Math.PI / 180);}


// //Highlight the chosen planet and its orbit
// function highlight(satellite, delayTime){
//
//     if(typeof(delayTime)==='undefined') delayTime = 0;
//     var time = 1000;
//
//     //Highlight the chosen planet
//     svg.selectAll(".sat")
//         .filter(function(d, i) {return i === satellite;})
//         .transition().delay(700 * delayTime).duration(time)
//         .style("stroke-opacity", 1)
//         .style("opacity", 0.95)
//     //.transition()
//     ;
//
//     //Select the orbit with the same index as the planet
//     svg.selectAll(".orbit")
//         .filter(function(d, i) {return i === satellite;})
//         .transition().delay(700 * delayTime).duration(time)
//         .style("stroke-opacity", 0.8)
//         .style("fill-opacity", 0.2);
//
// }
//
//
// //Taken from https://groups.google.com/forum/#!msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
// //Calls a function only after the total transition ends
// function endall(transition, callback) {
//     var n = 0;
//     transition
//         .each(function() { ++n; })
//         .each("end", function() { if (!--n) callback.apply(this, arguments); });
// }
//
// //Outline taken from http://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js
// function updateWindow(){
//     x = (w.innerWidth || e.clientWidth || g.clientWidth) - 50;
//     y = (w.innerHeight|| e.clientHeight|| g.clientHeight) - 50;
//
//     svg.attr("width", x).attr("height", y);
//     d3.selectAll(".container").attr("transform", "translate(" + x/2 + "," + y/2 + ")");
//     d3.select("#crazy").style("left", (x/2 - 112/2 + 6) + "px").style("top", (y/2 - 100) + "px");
// }
