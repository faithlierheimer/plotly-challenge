//read in samples.json
d3.json("../../samples.json").then((data)=>{
    var otu_labels = data.samples.map(d => d.otu_labels[0]);
    var otu_ids = data.samples.map(d => d.otu_ids[0]);
    var sample_values = data.samples.map(d => d.sample_values[0])
    var wfreq = data.metadata.map(d => d.wfreq);
    var trace1 = {
        type: "bar",
        name: "test",
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        width: 100
    };
    var layout = {
        title: `OTU Frequency`,
        width: 1000,
        height: 1000

    };
    var data = [trace1];
    Plotly.newPlot("bar", data, layout);
});


//notes on json structure
//can use dot notation to get to different pieces and potentially save them as variables

