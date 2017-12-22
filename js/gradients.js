function createGradients() {

    //Just for fun a gradient that runs over all satellites in a rainbow patterns
    var gradientLinear = svg
        .append("linearGradient")
        .attr("id", "gradientLinear")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("y1", "0")
        .attr("y2", "0")
        .attr("x1", "0")
        .attr("x2", "30%")
        .attr("spreadMethod", "reflect")
        .selectAll("stop")
        .data([
            {offset: "0%", color: "#023858"},
            {offset: "7%", color: "#045a8d"},
            {offset: "12%", color: "#0570b0"},
            {offset: "25%", color: "#3690c0"},
            {offset: "50%", color: "#74a9cf"},
            {offset: "100%", color: "#a6bddb"},

        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });
}
















