//Build plot() function to construct new bar/bubble plots at each new sample.
function plot(id){
    //read in JSON--have to do everything within this d3.json(). 
    d3.json("../../samples.json").then((data)=>{
        //.map() returns an array of values from sections of the json
        //calls arrow function for each array element-grabbing the first
        //array element for each sample. 
        var otu_labels = data.samples.map(d => d.otu_labels[0]);
        var otu_ids = data.samples.map(d => d.otu_ids[0]);
        //sample values filtered by id--make a new array, contains
        //only elements that match the samples.id part of the json,
        //changes them to a string.
        var samples =data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);
        //get top 10 sample values, slice up to 10th value and then reverse
        //to go from top down. 
        var sample_values = samples.sample_values.slice(0,10).reverse()
        
        //get top 10 otu ids in same method
        var top_OTU = (samples.otu_ids.slice(0,10)).reverse();
        //get top 10 otu labels for hover over functionality
        var hover = samples.otu_labels.slice(0,10);

        //for i=0 to length of metadata, grab the id key 
        var trace1 = {
            type: "bar",
            name: "test",
            x: sample_values,
            y: top_OTU,
            text: hover,
            width: 25,
            orientation: "h"
        };

        var layout = {
            title: `OTU Frequency`,
            width: 500,
            height: 500
    
        };

        var data = [trace1];
        //bar chart setup
        Plotly.newPlot("bar", data, layout);

        //set up bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        //set up layout for bubble plot 
        var layout_b = {
            xaxis: {title: "OTU ID"},
            height: 500, 
            width: 1000
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout_b);
    });
};

getPlot('1545');
//info fxn to repopulate demographic panel each time dropdown is. 
function getInfo(id){
    //re-read json
    d3.json("../../samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
        //filter down metadata by id 
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        //select demographic panel to put data in
        var demographicInfo = d3.select('#sample-metadata');
        //clear out data each time event changes
        demographicInfo.html("");
        //get data to populate table
        Object.entries(result).forEach((key)=>{
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });

    });
}

function optionChanged(id){
    getPlot(id);
    getInfo(id);
}

function init(){
    var dropdown = d3.select("#selDataset");
    //re-read
    d3.json("../../samples.json").then((data)=>{
        console.log(data)
        //get the id 
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        //call fxns 
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();



//notes on json structure
//can use dot notation to get to different pieces and potentially save them as variables

