let canvas = d3.select("svg");

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        let randomColor = getRandomColor(); // Generate a random color
        canvas.append("rect")
            .attr("x", i * 100)
            .attr("y", j * 100)
            .attr("width", 100)
            .attr("height", 100)
            .attr("fill", randomColor); // Set the random color as the fill
    }
}