display = {
// Need to cache the results of the first api call.
    initGraphData: function() {
        $.get("https://spin-bike-api.herokuapp.com", function(data){
            
            dataBikeUsageChart = {
                labels: [],
                series: [
                    []
                ],
            };
            var bike_one_usages = data[0].bikes[0].usage
            var durations = 0
            var i = 0;
            while(durations<10){
                if(bike_one_usages[i].duration!=0){
                    dataBikeUsageChart.labels.push(bike_one_usages[i].start_time)
                    dataBikeUsageChart.series[0].push(bike_one_usages[i].duration)
                    durations++
                }
                i++
            }
    
            optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            }
    
            var dailySalesChart = new Chartist.Line('#dailySalesChart', dataBikeUsageChart, optionsDailySalesChart);
    
            md.startAnimationForLineChart(dailySalesChart);
        })
    },

    displayGraphData: function() {
        $.get("https://spin-bike-api.herokuapp.com", function(data){
            
            dataBikeUsageChart = {
                labels: [],
                series: [
                    []
                ],
            };
            var bike_one_usages = data[0].bikes[0].usage
            var durations = 0
            var i = 0;
            while(durations<10){
                if(bike_one_usages[i].duration!=0){
                    console.log(bike_one_usages[i].duration)
                    dataBikeUsageChart.labels.push(bike_one_usages[i].start_time)
                    dataBikeUsageChart.series[0].push(bike_one_usages[i].duration)
                    durations++
                }
                i++
            }
    
            console.log(dataBikeUsageChart)
            optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            }
    
            var dailySalesChart = new Chartist.Line('#dailySalesChart', dataBikeUsageChart, optionsDailySalesChart);
    
            md.startAnimationForLineChart(dailySalesChart);
        })
    },

    getSelectOptions: function() {
        $.get("https://spin-bike-api.herokuapp.com", function(data){
            data.forEach(function(element){
                $("#all_addresses").append("<option value=" + element.address + ">" + element.address + "</option>")
            })
            $("#all_addresses").val($("#all_addresses option:first").val());
        })
    },

    initBikeOptions: function() {
        $.get("https://spin-bike-api.herokuapp.com", function(data){
            data[0].bikes.forEach(function(element){
                $("#all_bikes_at_address").append("<option value=" + element.sb_id + ">" + element.sb_id + "</option>")
            })   
        })
    }
}