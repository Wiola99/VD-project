function reasonsGraph() {
    let dataReasons = null; // store the data and enable to reuse it
    let currentLanguage = 'FR'; // set language by default, the same as used un html

    function loadData() {
        d3.dsv(',','data/learning_reasons.csv').then((dataLoaded) => {
            dataReasons = dataLoaded;  
            drawGraph();
        });
    }

    function drawGraph(){
        d3.select('#languageReasonsGraph').remove();
        
        const filteredData = dataReasons.filter(d=> d.language === currentLanguage);

        const svg = d3.select('.learningReasons')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('id', 'languageReasonsGraph') // add id to find and remove svg
            .attr('style', 'font: 10px sans-serif');  
            
        // Horizontal scale
        scaleX = d3.scaleBand()
            .domain(['WORK', 'TRAVEL', 'PLEASURE', 'CONTACT', 'IMPORTANT', 'COUNTRY', 'EDUCATION','OTHER'])
            .range([margin.left, width - margin.right])
            .padding(0.3)
            .round(true) //arrondir les valeurs a pixel pres

        // Vertical scale
        scaleY = d3.scaleLinear()
            .domain([70, 0])
            .range([margin.top, height-margin.bottom]);
        
        svg.append('g')
            .attr('transform', `translate(60, 0)`)
            .call(d3.axisLeft(scaleY).tickFormat((d,i) => d+'%'))
            
        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
            .call(d3.axisBottom(scaleX));



        //create color scale
        colorScale = d3.scaleSequential(d3.interpolateBrBG)
            .domain([0, d3.max(filteredData, d=> d.value)]);

        //create bars 
        Bars = svg.append('g')
            .selectAll('rect')
            .data(filteredData)
            .join('rect')
            .attr('width', scaleX.bandwidth())
            .attr('height', d => scaleY(0) - scaleY(d.value))
            .attr('x', function(d) { return margin.left + scaleX(d.reason) })
            .attr('y',  d => scaleY(d.value))
            .style('fill', d => colorScale(d.value));

        //Add text
        Texte = svg.append('g')
            .style('fill', 'rgb(57,91,113)')
            .attr('text-anchor','end')
            .selectAll('text')
            .data(filteredData)
            .enter()
            .append('text')
            .attr('x', d => margin.left + scaleX(d.reason) + (scaleX.bandwidth()/2) + 10 )
            .attr('y', d => scaleY(d.value)-5)
            .text(function(d){
                if(d.value == 0){
                    return 'no data'
                }else{
                    return d.value
                }
            });
    }

    function init() {
        loadData();
        
        d3.select('#reasonForLaanguage').on('change', function() {
            currentLanguage = d3.event.target.value;
            drawGraph()
        });
    }
    init();
}

reasonsGraph();