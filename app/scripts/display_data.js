data =
    display = {
        current_bike: null,
        // Need to cache the results of the first api call.
        initGraphData: function () {
            $.get("https://spin-bike-api.herokuapp.com", function (data) {

                dataBikeUsageChart = {
                    labels: [],
                    series: [
                        []
                    ],
                };
                var bike_one_usages = data[0].bikes[0].usage
                var durations = 0
                var i = 0;
                while (durations < 10) {
                    if (bike_one_usages[i].duration != 0) {
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
        displayGraphData: function (hasCurrentBike) {
            if (!hasCurrentBike) {
                display.current_bike = $("#all_bikes_at_address").val();
            }
            console.log(display.current_bike)
            $.get("https://spin-bike-api.herokuapp.com/usage/" + display.current_bike, function (data) {
                data = JSON.parse(data)

                dataBikeUsageChart = {
                    labels: [],
                    series: [
                        []
                    ],
                };

                var durations = 0
                var i = 0;
                while (durations < 10) {
                    if (data[i].duration != 0) {
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

        getSelectOptions: function () {
            $.get("https://spin-bike-api.herokuapp.com", function (data) {
                data.forEach(function (element) {
                    $("#all_addresses").append("<option value=" + element.address + ">" + element.address + "</option>")
                })
            })
            this.selectBikeOption()
        },

        //Should have dedicated API request
        initBikeOptions: function () {
            $.get("https://spin-bike-api.herokuapp.com", function (data) {
                display.current_bike = data[0].bikes[0].sb_id;
                data[0].bikes.forEach(function (element) {
                    $("#all_bikes_at_address").append("<option value=" + element.sb_id + ">" + element.sb_id + "</option>")
                })
            })
        },

        //Should have dedicated API request
        selectBikeOption: function () {
            const address = $("#all_addresses option:selected").text()
            console.log(address)
            $.get("https://spin-bike-api.herokuapp.com", function (data) {
                data.forEach(function (element) {
                    if (element.address == address) {
                        $("#all_bikes_at_address").empty()
                        display.current_bike = element.bikes[0].sb_id;
                        console.log(display.current_bike);
                        element.bikes.forEach(function (element) {
                            $("#all_bikes_at_address").append("<option value=" + element.sb_id + ">" + element.sb_id + "</option>")
                        })
                    }
                })
                display.displayGraphData(true);
            })
        }
    }