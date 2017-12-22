var svg = d3.select("#yc");
start4();

function select4(){

            var Purpose = document.getElementById("Purpose").value;
            var Users1 = document.getElementById("Users1").value;

            //console.log(Purpose);
            //console.log(Users1);
            if(Purpose=="All" && Users1=="All"){

                start4();} //calls the initial overview drawing
            else{
            update4(Purpose, Users1); }


}


function start4(){


    d3.select("#yc").selectAll("g").remove();
var margin = {top: 80, right: 70, bottom: 90, left: 70},
    width = 750 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    svg = d3.select("#yc")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

x.domain(scByLaunchYear.map(function (d) {
    return d.key;
}));
y.domain([0, d3.max(scByLaunchYear, function (d) {
    return d.value;
})]);


// Set up the x axis
var xaxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x axis")
    .call(d3.axisBottom(x)
        .tickSize(0, 0)
        .tickSizeInner(0)
        .tickPadding(10))
    .selectAll("text")
    .style("font-size", "8px")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-1.3em")
    .attr("transform", "rotate(-90)" );

// Add the Y Axis
var yaxis = svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y)
        //.ticks(10)
        .tickSizeInner(0)
        .tickPadding(6)
        .tickSize(0, 0));


//label to the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 60)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Satellites")
    .attr("class", "y axis label");

//label for x axis
svg.append("text")
    .attr("y", 0 + (height+70))
    .attr("x", 0 + (width/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Year")
    .attr("class", "x axis label");

// Draw the bars
svg.selectAll(".rect")
    .data(scByLaunchYear)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .append('title')
    .text(function (d) { return "Number of satellites: "+d.value;});

}


function update4(Purpose, Users1){

    d3.select("#yc").selectAll("g").remove();

    var margin = {top: 80, right: 70, bottom: 90, left: 70},
    width = 750 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    svg = d3.select("#yc")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var scByLaunchYear1 = d3.nest()
    .key(function(d) {if (d.Purpose==Purpose && d.Users==Users1){return d.DateofLaunch.split("/").pop(); }
                     else if(Users1=="All"){if (d.Purpose==Purpose){return d.DateofLaunch.split("/").pop();}}
                     else if(Purpose=="All"){if (d.Users==Users1){return d.DateofLaunch.split("/").pop();}}})
    .rollup(function(v){ return v.length; })
    .entries(satellites)
    .sort(function(a, b){ return d3.ascending(+a.key, +b.key); });

    var scByLaunchYear2 = scByLaunchYear1;
    var position=0;
    for(var i in scByLaunchYear1){

        if(scByLaunchYear1[i].value > 500){
            position = i;
            console.log("zzz"+i);
            break;
        }
    }
    console.log(position);
    scByLaunchYear2.splice(position,1);
    console.log("scByLaunchYear1:"+scByLaunchYear1);
    console.log("scByLaunchYear2:"+scByLaunchYear2);
    //
    //
    //
    // if(Purpose=="Technology Development" || Users1=="Civil" ){
    //     scByLaunchYear2 = scByLaunchYear2.slice(1);
    // }

    // console.log(JSON.stringify(scByLaunchYear1));
    // console.log(JSON.stringify(scByLaunchYear2));

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

x.domain(scByLaunchYear2.map(function (d) {
    return d.key;
}));
y.domain([0, d3.max(scByLaunchYear2, function (d) {
    return d.value;
})]);


// Set up the x axis
var xaxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x axis")
    .call(d3.axisBottom(x)
        .tickSize(0, 0)
        .tickSizeInner(0)
        .tickPadding(10))
    .selectAll("text")
    .style("font-size", "8px")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-1.3em")
    .attr("transform", "rotate(-90)" );

// Add the Y Axis
var yaxis = svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y)
        //.ticks(10)
        .tickSizeInner(0)
        .tickPadding(6)
        .tickSize(0, 0));


//label to the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 60)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Satellites")
    .attr("class", "y axis label");

//label for x axis
svg.append("text")
    .attr("y", 0 + (height+70))
    .attr("x", 0 + (width/2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Year")
    .attr("class", "x axis label");

// Draw the bars
svg.selectAll(".rect")
    .data(scByLaunchYear2)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .append('title')
    .text(function (d) { return "Number of satellites: "+d.value;});

}
