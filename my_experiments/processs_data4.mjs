// Save this script as 'process_data4.mjs'

import fs from 'fs';
import D3Node from 'd3-node';
import * as d3 from 'd3';
import npyjs from 'npyjs';

(async () => {
    // Path to the NumPy file in the same folder
    const filePath = './dat.npy';

    try {
        // Read the NumPy file
        const buffer = await fs.promises.readFile(filePath);

        // Parse the .npy file using npyjs
        const npy = new npyjs();
        const array = npy.parse(buffer.buffer); // Use buffer.buffer to get the ArrayBuffer
        console.log(array.shape)
        console.log(array.data)
        // Extract the first two columns
        const data = [];
        const N = array.shape[0];
        const M = array.shape[1];
        for (let i = 0; i < N; i++) {
            const x = array.data[i * M + 0]; // first column
            const y = array.data[i * M + 1]; // second column
            data.push({ x: x, y: y });
        }
        //console.log(data.length);

        // Set up D3.js with D3Node and pass the d3 module
        const d3n = new D3Node({ d3Module: d3 }); // Pass d3 as an option

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
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y))
            .range([height, 0]);

        // Add X axis
        //g.append('g')
            //.attr('transform', `translate(0,${height})`)
            //.call(d3.axisBottom(xScale));

        // Add Y axis
        //g.append('g')
            //.call(d3.axisLeft(yScale));

        // Add dots
        g.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', 3)
            .style('fill', 'steelblue');

        // Output the SVG to a file
        fs.writeFileSync('output.svg', d3n.svgString());
        console.log('SVG file saved as output.svg');

    } catch (err) {
        console.error('Error:', err);
    }
})();
