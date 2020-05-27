function pieChart() {
    var radius = Math.min(width, height) / 2 - 50

    function loadData() {
        d3.dsv(',','data/languages_everyday.csv').then((dataEverydayLoaded) => {
            dataEverydayLanguages = dataEverydayLoaded;
            console.log('dataloaded', dataEverydayLanguages)
    
                drawGraph();
            });

            
    }


    function drawGraph(){
        
        const svg = d3.select('.languagesEveryDay')
        .append('svg')
            .attr('width', width)
            .attr('height', height)
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        // Set the color scale
        var color = d3.scaleOrdinal()
          .domain(dataEverydayLanguages)
          .range(["#f2b600","#fa9c00","#90a8c2", "#395b71", "#325b33",  ])
        
        // Calculate fields for the pie chart
        var pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(function(d) { return d.percent; })
        (dataEverydayLanguages);
        
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
          .style("opacity", 0.5) //dim the colors

        // Append text
        svg
            .selectAll('donutPart')
            .data(pie)
            .enter()
            .append('text')
            .text(function(d){ return  d.data.percent + '%'  })
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  }) //put the text in the center of the donut chart parts
            .style("text-anchor", "middle")
            .style("font-size", 17)

         
        }

    function init() {
        loadData();
        
    }
    init();


}
pieChart();