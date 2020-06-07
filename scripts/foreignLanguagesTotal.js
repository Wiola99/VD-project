function foreignLanguagesTotal() {
    var radius = Math.min(width, height) / 2 - 50

    function loadData() {
        d3.dsv(',','data/foreign_languages_total.csv').then((dataForeignLanguagesLoaded) => {
            dataForeignLanguages = dataForeignLanguagesLoaded;
            console.log('dataloaded', dataForeignLanguages)
    
                drawGraph();
            });

            
    }


    function drawGraph(){
        
        const svg = d3.select('.foreignLanguagesTotal')
        .append('svg')
            .attr('width', width)
            .attr('height', height)
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        // Set the color scale
        var color = d3.scaleOrdinal()
          .domain(dataForeignLanguages)
          .range(['#006d48',"#182f58","#543b74","#92407e", "#cc4975", "#f4635e", '#ff8d3a', '#ffc009' ,'#6fb634','#5abba4'])
        
        // Calculate fields for the pie chart
        var pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(function(d) { return d.percent; })
        (dataForeignLanguages);
        
        //Create the arcs with arc function

        var arc = d3.arc()
            .innerRadius(150)         // This is the size of the hole
            .outerRadius(radius)

        
        // Create the pie chart
        svg
          .selectAll('donutPart')
          .data(pie)
          .enter()
          .append('path')
          .attr('d', arc )
          .attr('fill', function(d){ return(color(d.data.percent)) })
          .attr("stroke", "white")
          .style("stroke-width", "4px")
          

        // Append text
        svg
            .selectAll('donutPart')
            .data(pie)
            .enter()
            .append('text')
            .text(function(d){
                if(d.data.percent > 1.6){
                    return  d.data.percent + '%'  
                }
                })
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  }) //put the text in the center of the donut chart parts
            .style("text-anchor", "middle")
            .style("font-size", 17)
            .style('fill', 'floralwhite')

         
        }

    function init() {
        loadData();
        
    }
    init();


}
foreignLanguagesTotal();