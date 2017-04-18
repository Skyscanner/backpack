import d3 from './d3';

var chartDiv = document.createElement('div');
chartDiv.id = 'chart';
document.body.appendChild(chartDiv);
var svg = d3.select(chartDiv).append("svg");
var margin = {top: 20, right: 20, bottom: 50, left: 100}
    // width = +svg.attr("width") - margin.left - margin.right,
    // height = +svg.attr("height") - margin.top - margin.bottom;
var datag;
function init() {
    var width = chartDiv.clientWidth - margin.left - margin.right;
    var height = chartDiv.clientHeight - margin.top - margin.bottom;
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.tsv("data.tsv", function(d) {
      d.frequency = +d.frequency;sdfdsfsdfsdf

      return d;
    }, function(error, data) {
      datag = data;
      if (error) throw error;
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.frequency); });
    });
}
function redraw() {
    var width = chartDiv.clientWidth - margin.left - margin.right;
    var height = chartDiv.clientHeight - margin.top - margin.bottom;
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);
    x.domain(datag.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(datag, function(d) { return d.frequency; })]);
    svg.selectAll(".axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    svg.selectAll(".axis--y")
          .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");
    svg.selectAll(".bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.frequency); })
}
window.addEventListener("resize", redraw);
init();
