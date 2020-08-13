

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;



var svg = d3.select("#negative")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", (height) + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

bisectDate = d3.bisector(function(d) { return d.Year; }).left;



d3.csv("./Datasets/Airplane_Crashes_Negative_Final.csv", function(data) {


var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Year; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(+10,0)")
    .style("text-anchor", "end");



    var xxx = d3.scaleQuantize().range(data.map(function(d) { return d.Year; }))
  .domain([ 0, width ])
  var xxxx = d3.scaleOrdinal().domain(data.map(function(d) { return d.Year; })).range([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])


var y = d3.scaleLinear()
  .domain([0, 1500])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));




 svg.append("text")
    .attr("class", "axisLabel")
        .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width / 2.5 + 60) + " ," +
      ( height+ 30) + ")")
    .style("text-anchor", "middle")
    .text("Years");

var Y_Neg=svg.append("text")
    .attr("class", "axisLabel")
    .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -height/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Airplane Fatalities");

svg.append("text")
    .attr("class", "axisLabel")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width / 2.5 + 60) + " ," +
      (0) + ")")
    .style("text-anchor", "middle")
    .text("Number of Airplane Fatalities by the years (Negative)");
 
svg.append("text")
    .attr("class", "axisLabel")
        .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width/2) + " ," +
      ( height+ 50) + ")")
    .style("text-anchor", "middle")
    .text("A line plot to represent the number of Airplane Accident Fatalities between years 1999 and 2019");


      var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5)
        .attr("fill", "steelblue");

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left -20 + "," + margin.top + ")")
        .attr("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = xxx(d3.mouse(this)[0]),
          i = bisectDate(data, x0.toString())
          console.log(i)
          var d0 = data[i],
          d1 = data[i],
          d = x0 - d0.year > d1.year - x0 ? d1 : d0;
          
      focus.attr("transform", "translate(" + (x(d.Year)+10) + "," + y(d.Fatalities) + ")");
      focus.select("text").text(function() { return (d.Fatalities); });
    }

     svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year)+10 })
        .y(function(d) { return y(d.Fatalities) })
        )





})