function languagesAgeGraph() {
    function drawGraph(data){
        const svg = d3.select('.languagesAgeGraph')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('style', 'font: 10px sans-serif');  
            
        // Horizontal scale
        scaleX = d3.scaleBand()
            .domain([1, 2, 3, 4, 5])
            .range([margin.left, width - margin.right])
            .padding(0.3)
            .round(true) //arrondir les valeurs a pixel pres
    
        // Vertical scale
        scaleY = d3.scaleLinear()
            .domain([100, 0])
            .range([margin.top, height-margin.bottom]);
        
        svg.append('g')
            .attr('transform', `translate(60, 0)`)
            .call(d3.axisLeft(scaleY))
            
        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
            .call(d3.axisBottom(scaleX));
    
        const barWidth =  scaleX.bandwidth() / 6
        //create bars 
        Bars = svg.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('width', barWidth)
            .attr('height', d => scaleY(0) - scaleY(d.pourcentage))
            .attr('x', function(d) {
                    let x = margin.left + scaleX(d.language_number);
                    if(d.category === '25-39') {
                        x += barWidth
                    } else if (d.category === '40-54') {
                        x += barWidth * 2
                    } else if (d.category === '55-64') {
                        x += barWidth * 3
                    } else if (d.category === '65-74') {
                        x += barWidth * 4
                    } else if (d.category === '77<') {
                        x += barWidth * 5
                    }
                    return x;
                })
            .attr('y',  d => scaleY(d.pourcentage))
            .style('fill', d => {
                let color = 'red'
                if(d.category === '25-39') {
                    color = 'blue'
                } else if (d.category === '40-54') {
                    color = 'green'
                } else if (d.category === '55-64') {
                    color = 'yellow'
                } else if (d.category === '65-74') {
                    color = 'brown'
                } else if (d.category === '77<') {
                    color = 'black'
                }
                return color;
            });
    }
    
    function loadData() {
        d3.dsv(',','data/Languages_according_to_age.csv').then((dataLoaded) => {
            newData = []

            function transformObject(element, category) {
                // Same thing
                // element.language_number
                // element['language_number']
                const newValue = {}
                newValue.language_number = element.language_number
                newValue.category = category 
                newValue.pourcentage = element[category]
                return newValue;
            }
            
            for (let i = 0; i < dataLoaded.length; i++) {
                const element = dataLoaded[i];
            
                let newValue = transformObject(element, '15-24')
                newData.push(newValue);
            
                newValue = transformObject(element, '25-39')
                newData.push(newValue);
            
                newValue = transformObject(element, '40-54')
                newData.push(newValue);
            
                newValue = transformObject(element, '55-64')
                newData.push(newValue);
            
                newValue = transformObject(element, '65-74')
                newData.push(newValue);
            
                newValue = transformObject(element, '77<')
                newData.push(newValue);
            }

            drawGraph(newData);
        });
    }
    
    function init() {
        loadData();
    }
    
    init();
}

languagesAgeGraph();
