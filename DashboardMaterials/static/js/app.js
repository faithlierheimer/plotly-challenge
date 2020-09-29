//read in samples.json
function getPlot(id){
    d3.json("../../samples.json").then((data)=>{
        var otu_labels = data.samples.map(d => d.otu_labels[0]);
        var otu_ids = data.samples.map(d => d.otu_ids[0]);
       
        var wfreq = data.metadata.map(d => d.wfreq);
        //sample values filtered by id
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
            width: 25
        };
        var layout = {
            title: `OTU Frequency`,
            width: 500,
            height: 500
    
        };
        var data = [trace1];
        Plotly.newPlot("bar", data, layout);
    });
};

getPlot('940');
function dropdown(){
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

}

d3.selectAll("#selDataset").on("change", updateData);



//notes on json structure
//can use dot notation to get to different pieces and potentially save them as variables

