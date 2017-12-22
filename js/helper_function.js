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

//Calculate new coordinates of each satellite
function locate(coord) {
    return function(d){
        var k = 360 * d.major * d.minor / ((d.Periodminutes/60) * resolution * speedUp);

        for (var i = 0; i < resolution; i++) {
            d.theta += k / (d.r * d.r);
            d.r = d.major  * (1 - d.Eccentricity * d.Eccentricity) / (1 - d.Eccentricity * Math.cos(toRadians(d.theta)));
            d.r = d.r * scalingFactor;
        }
        var x1 = d.r * Math.cos(toRadians(d.theta)) - d.focus;
        var y1 = d.r * Math.sin(toRadians(d.theta));

        if (d.theta > 360) {d.theta -= 360;}
        if (coord === "x") {
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
}

//Turn degrees into radians
function toRadians (angle) { return angle * (Math.PI / 180);}

//http://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js
function updateWindow(){
    x = (e.clientWidth || g.clientWidth);
    y = (e.clientHeight|| g.clientHeight) - 50;

    svg.attr("width", x).attr("height", y);
    d3.selectAll(".container").attr("transform", "translate(" + x/2 + "," + y/2 + ")");
    d3.selectAll(".legendContainer").attr("transform", "translate(" + 30 + "," + (y - 90) + ")");
    d3.select("#crazy").style("left", (x/2 - 112/2 + 6) + "px").style("top", (y/2 - 100) + "px");
}
