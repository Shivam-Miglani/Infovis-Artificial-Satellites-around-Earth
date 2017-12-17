//version 1
//create the circular rings for orbit type
var width = 800;
var height = 600;
var radius = 300;

var svg = d3.select("#radarchart")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

var tooltip = d3.select("#radarchart")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");


var radargroup = svg.append("g").attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

var p = Math.PI * 2;
var innerradius = [50, 100, 200, 300, 400];
var outerradius = [radius-400, radius-300, radius - 200, radius - 100, radius];
var startangle = [0, 25, 50, 75];
var endangle = [25, 50, 75, 100]
var fillcolor = ['blue','#E4E5E4', '#D7D8D6', '#BFC0BF', '#3e4041'];
var counter = 1;

var satName = [];
var orbitClass = [];
var perigee = [];
var apogee = [];
var period = []


//get data from csv
d3.csv("data.csv", function (csv) {
    csv.map(function (d) {
        satName.push(d["Name of Satellite"]);
        orbitClass.push(d["Class of Orbit"]);
        perigee.push(+d["Perigee (km)"]);
        apogee.push(+d["Apogee (km)"]);
        period.push(+d["Period (minutes)"]);
    })

   // console.log(satName);

var myScale = d3.scale.linear().domain([0, 1000]).range([0,360]);//2 * Math.PI]);


    var svgquadrant = radargroup.append("g");//.attr("id", "quadrant" + index);

    //creating orbit level
    for (var i=0; i<innerradius.length;i++){
        var arcname = "arc" + counter;
        arcname = d3.svg.arc()
            .innerRadius(innerradius[i])
            .outerRadius(outerradius[i])
            .startAngle(myScale(startangle[i]))
            .endAngle(myScale(endangle[i]));

        svgquadrant.append("path").attr('id', 'p' + i + i).attr("d", arcname).attr('fill', fillcolor[i]);
    }

    //plotting planets in each level
        for (var j = 0; j < satName.length; j++) {
            var sat ="";
            if (orbitClass[j] == "LEO") {
                //plot on the inner circle
                var r = (innerradius[1] + outerradius[1]) / 2,
                    a = (myScale(startangle[0]) + myScale(endangle[0])) / 2 - (Math.PI / 2);

                //a += (0.436332 * j);
                a+=j;
                var coors = [Math.cos(a) * r, Math.sin(a) * r];

                svgquadrant.append('circle')
                    .style('fill', 'yellow')
                    .attr('r', 10)
                    .attr('cx', coors[0])
                    .attr('cy', coors[1])
                    //tooltip
                    .on("mouseover", function(d) {
                        tooltip.text("Name : " + sat + "\n" + orbitClass[j]);
                        return tooltip.style("visibility", "visible");
                    });
            }

            if (orbitClass[j] == "MEO") {
                //plot on the middle circle
                var r = (innerradius[2] + outerradius[2]) / 2,
                    a = (myScale(startangle[1]) + myScale(endangle[1])) / 2 - (Math.PI / 2);

                //a += (0.436332 * j);
                a += j;
                var coors = [Math.cos(a) * r, Math.sin(a) * r];

                svgquadrant.append('circle')
                    .style('fill', 'green')
                    .attr('r', 10)
                    .attr('cx', coors[0])
                    .attr('cy', coors[1])
                    //tooltip
                    .on("mouseover", function(d) {
                        tooltip.text("Name : " + sat + "\n" + orbitClass[j]);
                        return tooltip.style("visibility", "visible");
                })
                    .on("mousemove", function() {
                    return tooltip.style("top",
                        (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                    .on("mouseout", function() {
                        return tooltip.style("visibility", "hidden");
                    })
                    .on("mousemove", function() {
                    return tooltip.style("top",
                        (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                    .on("mouseout", function() {
                        return tooltip.style("visibility", "hidden");
                    });
            }


            if (orbitClass[j] == "GEO") {
                var b = orbitClass[j];
                //plot on the last circle
                var r = (innerradius[3] + outerradius[3]) / 2,
                    a = (myScale(startangle[2]) + myScale(endangle[2])) / 2 - (Math.PI / 2);

                a += (0.436332 * j);

                var coors = [Math.cos(a) * r, Math.sin(a) * r];

                svgquadrant.append('circle')
                    .style('fill', 'red')
                    .attr('r', 10)
                    .attr('cx', coors[0])
                    .attr('cy', coors[1])
                    //tooltip
                    .on("mouseover", function(d) {
                        var a = satName[j];
                        var b = apogee[j]
                        tooltip.text(a,' apoggee = ', b);
                        return tooltip.style("visibility", "visible");
                    })
                    .on("mousemove", function() {
                    return tooltip.style("top",
                        (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                    .on("mouseout", function() {
                        return tooltip.style("visibility", "hidden");
                    });
            }

        }

});


