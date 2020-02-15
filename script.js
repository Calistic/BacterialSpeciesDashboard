function init() {
    // Select dropdown menu #selDDataset, set to var selector
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);
        // same names array as var sampleNames
        var sampleNames = data.names;
        // append name to dropdown menu
        sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
})}
  
init();

//   newSample is the value selected in the html page
function optionChanged(newSample) {
    buildMetadata(newSample);
    // buildCharts(newSample);
}

// sample is name ID number
function buildMetadata(sample) {
// pull data from samples.json then refer to it as data
d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // filter metadata for an object with ID equal to sample 
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // save result to array
    var result = resultArray[0];
    // Demographic Info panel's ID is sample-metadata. Use d3.select to work on this div.
    var PANEL = d3.select("#sample-metadata");

    // clear content in Demographic Info panel
    PANEL.html("");
    // append result to H6 heading and the result's location
    PANEL.append("h6").text(result.location);
    console.log("test")
});
}