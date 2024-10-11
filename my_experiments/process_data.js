const fs = require('fs');

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
    });
})();

