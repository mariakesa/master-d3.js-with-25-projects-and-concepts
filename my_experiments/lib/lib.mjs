// Save this script as 'process_data4.mjs'

import fs from 'fs';
import path from 'path';
import D3Node from 'd3-node';
import * as d3 from 'd3';
import npyjs from 'npyjs';

/**
 * Reads and parses a .npy file.
 * @param {string} filePath - The path to the .npy file.
 * @returns {object} - The parsed NumPy array.
 */
async function readNpyFile(filePath) {
    try {
        const buffer = await fs.promises.readFile(filePath);
        const npy = new npyjs();
        const array = npy.parse(buffer.buffer); // Use buffer.buffer to get the ArrayBuffer
        return array;
    } catch (error) {
        console.error(`Error reading or parsing the file ${filePath}:`, error);
        throw error; // Re-throw the error after logging
    }
}

/**
 * Creates and saves an SVG scatter plot based on two column indices.
 * @param {object} array - The parsed NumPy array.
 * @param {number} index1 - The first column index for the X-axis.
 * @param {number} index2 - The second column index for the Y-axis.
 */
function createSVG(array, index1, index2) {
    const data = [];
    const N = array.shape[0]; // Number of rows
    const M = array.shape[1]; // Number of columns

    // Validate column indices
    if (index1 < 0 || index1 >= M || index2 < 0 || index2 >= M) {
        console.error(`Invalid column indices: index1=${index1}, index2=${index2}. Skipping this pair.`);
        return;
    }

    // Extract the specified columns
    for (let i = 0; i < N; i++) {
        const x = array.data[i * M + index1];
        const y = array.data[i * M + index2];
        data.push({ x: x, y: y });
    }

    // Set up D3.js with D3Node and pass the d3 module
    const d3n = new D3Node({ d3Module: d3 });

    // Define dimensions and margins
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 200;
    const height = 200;

    // Create SVG element
    const svg = d3n.createSVG(width, height);

    // Create a group element and apply margins
    const g = svg.append('g')
        //.attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xExtent = d3.extent(data, d => d.x);
    const yExtent = d3.extent(data, d => d.y);

    const xScale = d3.scaleLinear()
        .domain([xExtent[0], xExtent[1]]).nice()
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([yExtent[0], yExtent[1]]).nice()
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
        .attr('r', 2)
        .style('fill', 'steelblue');

    // Define the output directory
    const outputDir = '/home/maria/master-d3.js-with-25-projects-and-concepts/my_experiments/my_experiments/plots_store';

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate the filename using template literals
    const filename = `scatter_bigger_${index1}_${index2}.svg`;
    const outputPath = path.join(outputDir, filename);

    // Save the SVG to a file
    try {
        fs.writeFileSync(outputPath, d3n.svgString());
        console.log(`SVG file saved as ${filename}`);
    } catch (error) {
        console.error(`Error writing SVG file ${filename}:`, error);
    }
}

/**
 * The main pipeline function to read the .npy file and generate SVG plots.
 */
async function pipeline() {
    const filePath = '/home/maria/master-d3.js-with-25-projects-and-concepts/my_experiments/dat.npy';
    
    let array;
    try {
        array = await readNpyFile(filePath);
        console.log('Array shape:', array.shape);
    } catch (error) {
        console.error('Failed to read and parse the NumPy file. Exiting pipeline.');
        return;
    }

    const M = array.shape[1]; // Number of columns

    // Loop through desired column indices
    for (let index1 = 0; index1 < 20; index1++) {
        for (let index2 = 0; index2 < 20; index2++) {
            // Optional: Skip plotting if both indices are the same

            createSVG(array, index1, index2);
        }
    }

    console.log('All SVG files have been generated.');
}

// Execute the pipeline
pipeline();
