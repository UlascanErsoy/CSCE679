
const [width, height] = [640, 400];    
        const margin = {top:20, right:30, bottom:40, left:40 };

        //create an SVG
        const svg = d3.select("#chart")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.bottom + margin.top)
                        .append("g")
                        .attr("transform", `translate(${margin.left}, ${margin.right})`);

        var data = [1, 2, 4, 8, 16,32, 64, 1];


        //set up our scales
        const x = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .range([0, width])
                    .padding(0.1);

        const y = d3.scaleLinear()
                    .domain([0, d3.max(data)])
                    .range([height, 0]);

        const t = d3.transition().duration(750).ease(d3.easeLinear);
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i))
            .attr("width", x.bandwidth)
            .transition(t)
            .attr("height", d=> height - y(d))
            .attr("y", d => y(d));

        const tooltip = d3.select("#tooltip");

        //Add tooltip functionality
        svg.selectAll(".bar")
            .on("mouseover", function(event, d) {
                //show the tooltip
                tooltip.style("opacity", 1)
                    .html(`Value:${d}`)
                               })
            .on("mousemove", function(event) {
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");

            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });

