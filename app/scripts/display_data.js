$(document).ready(function () {
    // $.get(" https://spin-bike-api.herokuapp.com", function(data){
    //     data.forEach(function(element){
    //         var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
    //         $.each(data, function(index, value) {
    //             arrItems.push(value);   
    //         })    // PUSH THE VALUES INSIDE THE ARRAY.
    //     });
    //         var s = "";
    //         for(var i = 0; i < arrItems.length; i++) {
    //                 s = "<tr><td>" + arrItems[i].address + "</td><td>" + arrItems[i].bikes.sb_id + "</td></tr>";
    //                 $("#showData").append(s);
    //     }
    // })

        $.getJSON("https://spin-bike-api.herokuapp.com/bikelogs/asdf&asdf", function(data) {

            var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
            $.each(data, function(index, value) {
                arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
            });

            // EXTRACT VALUE FOR TABLE HEADER.
            var col = [];
            for (var i = 0; i < arrItems.length; i++) {
                for (var key in arrItems[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                if(i != 1){
                    var th = document.createElement("th");      // TABLE HEADER.
                    th.innerHTML = col[i];
                    tr.appendChild(th);                       
                }
             
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < arrItems.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = arrItems[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        });
});

data = 
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
                high: 25, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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

    //Should have dedicated API request
    displayGraphData: function() {
        var current_bike = $("#all_bikes_at_address").val()
        console.log(current_bike)
        $.get("https://spin-bike-api.herokuapp.com/usage/" + current_bike, function(data){
            data = JSON.parse(data)

            dataBikeUsageChart = {
                labels: [],
                series: [
                    []
                ],
            };

            var durations = 0
            var i = 0;
            while(durations<10){
                if(data[i].duration!=0){
                    dataBikeUsageChart.labels.push(data[i].start_time)
                    dataBikeUsageChart.series[0].push(data[i].duration)
                    durations++
                }
                i++
            } 
    
            optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 25, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
        $.get(" https://spin-bike-api.herokuapp.com", function(data){
            data.forEach(function(element){
                $("#all_addresses").append("<option value=" + element.address + ">" + element.address + "</option>")
            })
        })
        this.selectBikeOption()
    },

    //Should have dedicated API request
    initBikeOptions: function() {
        $.get("https://spin-bike-api.herokuapp.com", function(data){
            data[0].bikes.forEach(function(element){
                $("#all_bikes_at_address").append("<option value=" + element.sb_id + ">" + element.sb_id + "</option>")
            })   
        })
    },

    //Should have dedicated API request
    selectBikeOption: function() {
        const address = $("#all_addresses option:selected").text()
        console.log(address)
        $.get("https://spin-bike-api.herokuapp.com", function(data){
            data.forEach(function(element){
                if(element.address == address){
                    $("#all_bikes_at_address").empty()
                    element.bikes.forEach(function(element){
                        $("#all_bikes_at_address").append("<option value=" + element.sb_id + ">" + element.sb_id + "</option>")
                    })
                }
            })
        })
        this.displayGraphData()
    }
}