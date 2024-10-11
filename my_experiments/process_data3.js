const fs = require('fs');
//const d3 = require('d3');
const D3Node = require('d3-node');
const d3n = new D3Node()
const d3 = d3n.d3;
console.log(d3); 
console.log(d3.scale); 

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

        // Extract the first two columns
        const data = [];
        const N = array.shape[0];
        const M = array.shape[1];
        for (let i = 0; i < N; i++) {
            const x = array.data[i * M + 0]; // first column
            const y = array.data[i * M + 1]; // second column
            data.push({ x: x, y: y });
        }

        // Set up D3.js with D3Node
        const d3n = new D3Node(); // Initializes D3 with container element

        // Define dimensions and margins
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3n.createSVG(width + margin.left + margin.right, height + margin.top + margin.bottom);

        // Create a group element and apply margins
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up scales
        const xScale = d3.scale.linear()
            .domain(d3.extent(data, d => d.x))
            .range([0, width]);

        const yScale = d3.scale.linear()
            .domain(d3.extent(data, d => d.y))
            .range([height, 0]);

        // Add X axis
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        // Add Y axis
        g.append('g')
            .call(d3.axisLeft(yScale));

        // Add dots
        g.selectAll('dot')
            .data(data)
            .enter().append('circle')
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', 3)
            .style('fill', 'steelblue');

        // Output the SVG to a file
        fs.writeFileSync('output.svg', d3n.svgString());
        console.log('SVG file saved as output.svg');
    });
})();
