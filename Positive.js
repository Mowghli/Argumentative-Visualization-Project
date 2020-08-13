
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


    var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("color" , "black")
          .style("border", "0px")
          .style("text-align", "center")
  
  var tooltit =   d3.select("body")
          .append("div")  
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("color" , "black")
          .style("width", "1px")
          .style("border-right", "10px solid black")
          .style("border-top", "10px solid transparent")  
          .style("border-bottom", "10px solid transparent")
          .style("font-size", "0")
          .style("line-height","0")



var tvg = d3.select("#negative")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", (height) + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("./Datasets/Airplane_Crashes_Positive_Final.csv", function(data) {


var xx = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Year; }))
  .padding(0.2);
tvg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xx))
  .selectAll("text")
    .attr("transform", "translate(+10,0)")
    .style("text-anchor", "end");

// Add Y axis
var yy = d3.scaleLinear()
  .domain([0, 30])
  .range([ height, 0]);
tvg.append("g")
  .call(d3.axisLeft(yy));

 tvg.append("text")
    .attr("class", "axisLabel")
        .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width / 2.5 + 60) + " ," +
      ( height+ 30) + ")")
    .style("text-anchor", "middle")
    .text("Years");

var Y_Neg=tvg.append("text")
    .attr("class", "axisLabel")
    .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -height/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Airplane Accidents");

tvg.append("text")
    .attr("class", "axisLabel")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width / 2.5 + 60) + " ," +
      (0) + ")")
    .style("text-anchor", "middle")
    .text("Number of Non-Commercial Airplane Accidents by the years (Affirmative)");

 tvg.append("text")
    .attr("class", "axisLabel")
        .style("font-size", "14px")
    .style("font-family","Sans-serif")
    .attr("transform",
      "translate(" + (width / 2.5 + 60) + " ," +
      ( height+ 50) + ")")
    .style("text-anchor", "middle")
    .text("Bar chart showing the number of Non-Commercial Airplane Accidents between years 1999 and 2019");

tvg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return xx(d.Year); })
    .attr("y", function(d) { return yy(d.counto); })
    .attr("width", xx.bandwidth())
    .attr("height", function(d) { return height - yy(d.counto); })
    .attr("fill", "#386f75")
    .on("mousemove", function() {
     tooltip.style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 15) + "px");

        tooltit.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX +5) + "px");
  })
      .on("mouseout", function() {
     tooltip.style("visibility", "hidden");
     tooltit.style("visibility", "hidden");
    })
      .on("mouseover", function(d) {
    tooltip.transition()    
            .duration(2000)    
            .style("opacity", .8);
     tooltip.style("visibility", "visible")
      .html("Number of Accidents: "+ d.counto+"<br/> Total Fatalities: "+d.Fatalities)
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
        .style("background", "black")
      .style("font-family","Sans-serif")
      .style("color", "white")
      .style("padding","10px");
      tooltit.transition()    
            .duration(2000)    
            .style("opacity", .8);
      tooltit.style("visibility", "visible")
      .style("top", (event.pageY-10)+"px")
        .style("left",(event.pageX+10)+"px")
  });

})
