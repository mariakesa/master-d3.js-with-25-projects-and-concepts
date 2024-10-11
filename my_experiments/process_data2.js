const fs = require('fs');
const vega = require('vega');
const vl = require('vega-lite');

(async () => {
    // Dynamically import npyjs as an ES module
    const npyjs = await import('npyjs');
    const npy = new npyjs.default();

    // Path to the NumPy file in the same folder
    const filePath = './dat.npy';

    // Read the NumPy file
    fs.readFile(filePath, (err, buffer) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Parse the .npy file using npyjs
        const array = npy.parse(buffer.buffer); // Use buffer.buffer to get the ArrayBuffer

        // Log the contents of the numpy array
        console.log('Parsed NumPy array data:', array.data);
        console.log('Shape of the array:', array.shape);

        // Extract the first two columns
        const data = [];
        const N = array.shape[0];
        const M = array.shape[1];
        for (let i = 0; i < N; i++) {
            const x = array.data[i * M + 0]; // first column
            const y = array.data[i * M + 1]; // second column
            data.push({ x: x, y: y });
        }

        // Create Vega-Lite specification
        const spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "description": "A simple scatter plot",
            "data": {
                "values": data
            },
            "mark": "point",
            "encoding": {
                "x": { "field": "x", "type": "quantitative" },
                "y": { "field": "y", "type": "quantitative" }
            }
        };

        // Compile Vega-Lite spec to Vega spec
        const vegaSpec = vl.compile(spec).spec;

        // Render the Vega spec to SVG
        const runtime = vega.parse(vegaSpec);
        const view = new vega.View(runtime)
            .renderer('none') // no default renderer needed for SVG
            .initialize();

        view.toSVG()
            .then(svg => {
                // Save the SVG to a file
                fs.writeFileSync('output.svg', svg);
                console.log('SVG file saved as output.svg');
            })
            .catch(err => {
                console.error('Error generating SVG:', err);
            });
    });
})();
