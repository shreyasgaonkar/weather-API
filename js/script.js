/*
Workflow:

☑ 1. Get current city
☑ 2. Get current weather for the city
☐ 3. Get current time of the city
☐ 4. Get future weather for the city
☐ 5. Add weather icons

*/

$(document).ready(function() {

  let city = "Chicago";
  let inputCity = $('#city');
  let unit = "metric";
  let unit_symbol = "C";

  // Get the current city through IP address
  getCity();

  /* Toggle Temperature from checkbox */
  $("label.switch > input").change(function() {
      var setval = this.checked ? "f" : "c";
      if (setval == "c") {
        unit = "metric";
      } else {
        unit = "imperial";
      }
      getWeather();
  });


  // Key press for enter
    inputCity.on('keydown', function() {
      var key = event.keyCode || event.charCode;
      if (key ==  13) {
        getWeather();
        }
  })



  /* Weather app logic here */

  // Step 1: Get current city
  function getCity() {


    $.get(`http://api.ipstack.com/check?access_key=${config.IPSTACK_API_ID}`).then(
      function(data) {
        console.log(data);
        $('#input-city').attr('value', data.city);

        // Get weather of the current city
        getWeather();
      }, function(err) {
        console.log(err);
      }
    );



  }


  // Step 2: Get current weather for the city
  function getWeather() {

    city = $('#input-city').val();
    const url = `//api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${config.API_ID}`;
    var fetchData = $.getJSON(url, getData, "jsonp");

    function getData(data) {
        console.log(data);
        if (unit == "metric") {
          unit_symbol = "C";
        } else {
          unit_symbol = "F";
        }

        data.main.feels_like = Math.round(data.main.feels_like);
        data.main.temp = Math.round(data.main.temp);
        data.main.temp_max = Math.round(data.main.temp_max);
        data.main.temp_min = Math.round(data.main.temp_min);

        console.log(data.main.feels_like);
        console.log(data.main.temp);

        $('#weather-description').html(data.weather[0].main);

        $('#high').html(`High: ${data.main.temp_max}&#176;${unit_symbol}&nbsp;`);
        $('#low').html(`Low: ${data.main.temp_min}&#176;${unit_symbol}&nbsp;`);

        // Update temp to feels like on mouse enter
        $('#temperature > h1')
          .mouseenter(function() {
            $(this).html(`${data.main.feels_like}&#176;${unit_symbol}`);
            // $(this).css({"cursor": "pointer"});
            $(this).attr('title','Feels like');
          })
          .mouseleave(function() {
            $(this).html(`${data.main.temp}&#176;${unit_symbol}`);
            // $(this).css({"cursor": "context-menu"});
          });


        $('#temperature > h1').html(`${data.main.temp}&#176;${unit_symbol}`);
    }
  }


});
