datap = d3.json("daydata.json");

datap.then(function(data)
{
  drawGraph(data,0);
},
function(err)
{
  console.log(err);
})

var drawGraph = function(data,day)
{
  if((day-1)<0)
  {
    document.getElementById('prev').disabled = true;
  }
  if((day)>0)
  {
    document.getElementById('prev').disabled = false;
  }
  if((day)==9)
  {
    document.getElementById('next').disabled = true;
  }
  if((day)<9)
  {
    document.getElementById('next').disabled = false;
  }

  d3.selectAll("button#next")
    .on("click",function(){
      updateGraph(data,day+1)});

  d3.selectAll("button#prev")
    .on("click",function(){
      updateGraph(data,day-1)});

  var screen =
  {
    width:500,
    height:500
  };

  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height);

var margins =
{
  top: 10,
  bottom: 40,
  left: 40,
  right:85
};

var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;

var xScale = d3.scaleLinear()
               .domain([0,4])
               .range([0,width])
var yScale = d3.scaleLinear()
               .domain([0,100])
               .range([height,0])

var xAxis = d3.axisBottom()
              .scale(xScale)
var yAxis = d3.axisLeft()
              .scale(yScale)

var colors = d3.scaleOrdinal(d3.schemeSet3);

d3.select("p.daylable")
  .text("Day:"+(day+1));

var legend=svg.append("g")
                  .classed("legend",true)
                  .attr("transform","translate("
                  + (width+margins.left+20)+","
                  +
                  margins.top+")"
                   );

var legendLines=legend.selectAll("g")
                  .data(data[day].grades)
                  .enter()
                  .append("g")
                  .classed("legendLine",true)
                  .attr("transform",function(d,i)
                   {return "translate(0,"+(i*20)+")";})
legendLines.append("rect")
          .attr("x",0)
          .attr("y",0)
          .attr("width",10)
          .attr("height",10)
          .attr("fill",function(d)
           {return colors(d.name);})
legendLines.append("text")
          .attr("x",20)
          .attr("y",10)
          .text(function(d) {return d.name})


var barLand = svg.append("g")
                  .classed("bar",true)
                  .attr("transform","translate("+(margins.left+5)+","+margins.top+ ")")



svg.append('g').classed("yAxis",true)
              .call(yAxis)
              .attr("transform","translate("+margins.left+","+(margins.top)+ ")")

var bars = barLand.selectAll("rect")
                        .data(data[0].grades)
                        .enter()
                        .append("rect")
                        .attr("x",function(d,i)
                      {
                        return xScale(i);
                      })
                       .attr("y",function(d)
                     {
                         return yScale(d.grade);
                     })
                       .attr("width",(width/4)-5)
                       .attr("height",function(d)
                     {
                       return height - yScale(d.grade);
                     })
                      .attr("fill",function(d){return colors(d.name);})
bars.on("mouseover",function(d,i)
{
var tex = svg.append("text");
tex.text("Grade: "+d.grade)
   .classed("grade",true)
   .attr("x",xScale(i)+50)
   .attr("y",height-yScale(d.grade)+20);
})
.on("mouseout",function(d,i)
{
d3.selectAll("text.grade").remove()
})



}

var updateGraph = function(data,day)
{
  console.log(day)
  if((day-1)<0)
  {
    document.getElementById('prev').disabled = true;
  }
  if((day)>0)
  {
    document.getElementById('prev').disabled = false;
  }
  if((day)==9)
  {
    document.getElementById('next').disabled = true;
  }
  if((day)<9)
  {
    document.getElementById('next').disabled = false;
  }

d3.selectAll("button#next")
  .on("click",function(){
    updateGraph(data,day+1)});

d3.selectAll("button#prev")
  .on("click",function(){
    updateGraph(data,day-1)});
var screen =
{
  width:500,
  height:500
};

var svg = d3.select("svg");


var margins =
{
top: 10,
bottom: 40,
left: 40,
right:85
};


var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;

var xScale = d3.scaleLinear()
             .domain([0,4])
             .range([0,width])
var yScale = d3.scaleLinear()
             .domain([0,100])
             .range([height,0])

var colors = d3.scaleOrdinal(d3.schemeSet3);

var barLand = svg.select(".bar")

barLand.selectAll("rect")
        .data(data[day].grades)
        .transition()
        .duration(1500)
        .ease(d3.easeElastic)
       .attr("y",function(d)
     {
         return yScale(d.grade);
     })
       .attr("height",function(d)
     {
       return height - yScale(d.grade);
     })


d3.select("p.daylable")
  .text("Day:"+(day+1));

}
