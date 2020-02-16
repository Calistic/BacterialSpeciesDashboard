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
optionChanged(940);

//   newSample is the value selected in the html page
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
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
    // PANEL.append("h6").text("ID: " + result.id + "\n" + "Ethnicity: " + result.ethnicity + "\n Gender: " + result.gender + "\n Age: " + result.age + "\n Location: " + result.location + "\n Bbtype: " + result.bbtype + "\n Wfreq: " + result.wfreq);
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
    PANEL.append("h6").text("Gender: " + result.gender);
    PANEL.append("h6").text("Age: " + result.age);
    PANEL.append("h6").text("Location: " + result.location);
    PANEL.append("h6").text("Bbtype: " + result.bbtype);
    PANEL.append("h6").text("Washing Freq: " + result.wfreq);
});
}

// create variables outside of function
var otuIds=[];
var values=[];
var otuLabels=[];
var topSampleValues=[];
var topOtuIds=[];
var topOtuLabels=[];

function buildCharts(sample) {
    // pull data from samples.json then refer to it as data
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        // filter samples object for an object with ID equal to sample 
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        // save result to array
        var result = resultArray[0];
            console.log("resultArray");
            console.log(resultArray);
        // Sort by descending sample_vaues
        var sampleValues = resultArray.sort((a,b) => a.sample_values - b.sample_values).reverse(); 

        // save top 10 sample_values to array
        topSampleValues = sampleValues[0].sample_values.slice(0,10);
            // console.log("10 sampleValues");
            // console.log(topSampleValues);
        // save otu_ids to array
        topOtuIds = sampleValues[0].otu_ids.slice(0,10);
            // console.log("10 otuIds");
            // console.log(topOtuIds);
        // save otu_labels to array
        topOtuLabels = sampleValues[0].otu_labels.slice(0,10);
            // console.log("10 otuLabels");
            // console.log(topOtuLabels);

        // save complete results
        values = result.sample_values;
        console.log(values);
        otuIds = result.otu_ids;
        console.log(otuIds);
        otuLabels = "OTU Labels: " + result.otu_labels;
        console.log(otuLabels);

    // call plot functions
    barPlot();
    bubblePlot();
    gaugePlot();
    });
}

// Bar Plot
function barPlot() {
    // add ID to each item in otu_ids
    for(var i=0;i<topOtuIds.length;i++){
        topOtuIds[i]="OTU "+topOtuIds[i];
    }
    // Reverse the array due to Plotly's defaults
    topSampleValues = topSampleValues.reverse();
    topOtuIds = topOtuIds.reverse();
    topOtuLabels = topOtuLabels.reverse();

    // Trace1 for the Greek Data
    var trace1 = {
    x: topSampleValues,
    y: topOtuIds,
    text: topOtuLabels,
    name: "Greek",
    type: "bar",
    orientation: "h"
    };

    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
    title: "Bacterial Count",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot1", data, layout);
}

// Bubble Plot
function bubblePlot() {
    var trace1 = {
        x: otuIds,
        y: values,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: values,
            color: otuIds,
            colorscale: 'Earth',
        }
      };
      console.log('box plot')
      console.log(otuIds);
      console.log(values);
      console.log(otuLabels);


      var data = [trace1];
      
      var layout = {
        title: 'Bacterial Count: Hover mouse over text',
        showlegend: false,
        height: 600,
        width: 1000
      };
      
      Plotly.newPlot("plot2", data, layout);
};

// Gauge Plot
function gaugePlot() {

};
// gauge
// https://code.tutsplus.com/tutorials/create-interactive-charts-using-plotlyjs-pie-and-gauge-charts--cms-29216