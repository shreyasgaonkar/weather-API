$(document).ready(function() {

  var input = $('#city');

  input.on('keydown', function() {
      var key = event.keyCode || event.charCode;
      if (key ==  13) {
          console.log("Enter");
          let city = "Chicago"
          let unit = "metric"
          const api_id = "e5443695562b2564371d9390c830bc1f"
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${api_id}`


          var fetchData = $.getJSON(url, getData, "jsonp");

          function getData(data) {

            if (unit == "metric") {
              unit_symbol = "C";
            } else {
              unit_symbol = "F";
            }

            console.log(data);

            data.main.feels_like = Math.round(data.main.feels_like);
            data.main.temp = Math.round(data.main.temp);
            data.main.temp_max = Math.round(data.main.temp_max);
            data.main.temp_min = Math.round(data.main.temp_min);

            console.log(data.main.feels_like);
            console.log(data.main.temp);

            $('#weather-description').html(data.weather[0].main);

            $('#high').html(`High: ${data.main.temp_max}&#176;${unit_symbol}&nbsp;`);
            $('#low').html(`Low: ${data.main.temp_min}&#176;${unit_symbol}&nbsp;`);

            $('#temperature > h1')
              .mouseenter(function() {
                $(this).html(`${data.main.feels_like}&#176;${unit_symbol}`);
                $(this).css({"cursor": "pointer"});
              })
              .mouseleave(function() {
                $(this).html(`${data.main.temp}&#176;${unit_symbol}`);
                $(this).css({"cursor": "context-menu"});
              });


            $('#temperature > h1').html(`${data.main.temp}&#176;${unit_symbol}`)
          }
        }

  })
});
