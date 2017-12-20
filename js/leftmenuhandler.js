var filtered_data = satellites;

function usa(){
    var usa = satellites.filter((function(d) { return d.Country === "USA"}));
    console.log(usa);

}

function all(){
    filtered_data = satellites;
}
