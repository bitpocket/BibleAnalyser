function putCloud(cloudData, destinationId) {
  var size = d3.scale.linear()
    .domain([0, cloudData[0].size])
    .range([10, 100]);

  var color = d3.scale.linear()
    .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
    .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

  var width = $(window).width(),
    translateX = width / 2;

  d3.layout.cloud().size([width, 500])
    .words(cloudData)

  .rotate(function() {
    return 0;
  })

  .font("Advent Pro")
    .fontSize(function(d) {
      return size(d.size);
    })
    .on("end", draw)
    .start();

  function draw(words) {
    d3.select(destinationId).append("svg")
      .attr("width", width)
      .attr("height", 500)
      //.attr("class", "wordcloud")
      .append("g")
      // without the transform, words words would get cutoff to the left and top, they would
      // appear outside of the SVG area
      .attr("transform", "translate(" + translateX*0.95 + ", 260)")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .style("font-family", "Advent Pro")
      .style("fill", function(d, i) {
        return "#000"; //color(i);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) {
        return d.text;
      });
  }
}
