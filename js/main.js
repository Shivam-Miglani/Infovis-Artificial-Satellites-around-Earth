



//loading data
d3.csv("data.csv", function(data) {
    data.forEach(function(d) {
        d["Name of Satellite"]= +d["Name of Satellite"];
        d["land area"] = +d["land area"];
    });
    console.log(data[0]);
});

