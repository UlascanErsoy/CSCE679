
const [width, height] = [600, 400];    
// Step 1 (Dataset)

const data = [
  // Left eye
  { x: 120, y: 400 }, { x: 130, y: 380 }, { x: 140, y: 400 },
  { x: 120, y: 420 }, { x: 130, y: 440 }, { x: 140, y: 420 },

  // Right eye
  { x: 220, y: 400 }, { x: 230, y: 380 }, { x: 240, y: 400 },
  { x: 220, y: 420 }, { x: 230, y: 440 }, { x: 240, y: 420 },

  // Nose
  { x: 175, y: 360 }, { x: 180, y: 380 }, { x: 185, y: 400 },
  { x: 190, y: 420 }, { x: 185, y: 440 }, { x: 175, y: 440 },

  // Mouth (smile)
  { x: 140, y: 300 }, { x: 160, y: 280 }, { x: 180, y: 275 },
  { x: 200, y: 280 }, { x: 220, y: 300 },

];

function get_min_max(data) {
    const x_min = Math.min(...data.map((pt) => pt.x));
    const x_max = Math.max(...data.map((pt) => pt.x));
    const y_min = Math.min(...data.map((pt) => pt.y));
    const y_max = Math.max(...data.map((pt) => pt.y));

    return [x_min, x_max, y_min, y_max];

}


const margin = {top:20, right:30, bottom:40, left:50 };

const [x_min, x_max, y_min, y_max] = get_min_max(data);

console.log(x_min);
//create an SVG
const svg = d3.select("#chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleLinear()
            .domain([x_min - 50, x_max + 50])
            .range([0, width]);

const y = d3.scaleLinear()
            .domain([y_min - 50, y_max + 50])
            .range([height, 0]);

x_axis = d3.axisBottom(x)
y_axis = d3.axisLeft(y)

svg.append("g")
    .attr("transform", `translate(0 , ${height})`)
    .call(x_axis);

svg.append("g")
    .call(y_axis);

const t = d3.transition().duration(250).ease(d3.easeLinear);
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .transition(t)
    .attr("r", 10)



const tooltip = d3.select("#tooltip");

svg.selectAll("circle")
    .on("mouseover", function(event, d) {
        //show the tooltip
        tooltip.style("opacity", 1)
            .html(`x:${d.x}, y:${d.y}`)
                       })
    .on("mousemove", function(event) {
        tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 20) + "px");

    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0);
    });

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .text("index");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -45)
    .attr("x", -height/2 + 22.5)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Value");
