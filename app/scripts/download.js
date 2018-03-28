(function() {
  function convertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }

    return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + ".csv" || "export.csv";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  $(document).ready(function() {
    $("#download").click(function() {
      notification.showNotification(
        "top",
        "right",
        "info",
        "File will start downloading"
      );

      console.log("download function");

      var current_bike = $("#all_bikes_at_address").val();

      console.log(current_bike);

      var settings = {
        async: true,
        crossDomain: true,
        url: "https://spin-bike-api.herokuapp.com/",
        method: "GET"
      };

      $.ajax(settings)
        .done(function(response) {
          var usage = [];
          for (var index in response) {
            if (parseInt(response[index].bikes[0].sb_id) === parseInt(current_bike)) {
              usage = response[index].bikes[0].usage;
              console.log(response[index].bikes[0].usage);
              break;
            }
          }

          console.log(usage);
          var headers = {
            sb_id: "Spin Bike id".replace(/,/g, ""), // remove commas to avoid errors
            start_time: "Start Time".replace(/,/g, ""),
            duration: "Duration"
          };

          var usageFormatted = [];

          // format the data
          usage.forEach(function(item) {
            usageFormatted.push({
              sb_id: item.sb_id, // remove commas to avoid errors,
              start_time: item.start_time,
              duration: item.duration
            });
          });
          var fileTitle = "Spin Bike Usage for Bike " + current_bike;

          exportCSVFile(headers, usageFormatted, fileTitle);

          notification.showNotification(
            "top",
            "right",
            "success",
            "File is downloaded"
          );
        })
        .fail(function(xhr, status, error) {
          // error handling
          notification.showNotification(
            "top",
            "right",
            "danger",
            "Download file failed, please try again later"
          );
        });
    });
  });
})();
