$(function() {

    $("#submit").click(function() {

        // tempFormat = parseInt(tempFormat);
        var tempFormat = document.getElementById('tempFormat');
        tempFormat = tempFormat.value;
        // console.log("tempFormat is "+tempFormat);

        if(tempFormat == "f")
        {
            var units = "&units=imperial";
            var unitDegree = "&#8457";
        }else
        {
            var units = "&units=metric";
            var unitDegree = "&#8457";
        }

        var length = $("#enteredCity").val();
        length = length.length;
        // console.log(length);
        if(length > 0){

            $(".well").removeClass( "hidden" );
            $(".well").addClass( "animate" );
            var api = "http://api.openweathermap.org/data/2.5/weather?q=";
            // var city = "Chicago";
            var apiKey = "&appid=e5443695562b2564371d9390c830bc1f"; //Change API Key
            // var units = "&units=imperial";
            var city = $("#enteredCity").val();
            var url = api+city+apiKey+units;

            // setInterval(fetchData, 3000);
            var fetchData = $.getJSON(url, gotData, "jsonp");

        }
        else{
            alert("Enter City name")
        }

    });


    function gotData(data){
        var tempFormat = document.getElementById('tempFormat');
        tempFormat = tempFormat.value;
        var currentCity = data.name;
        var currentCountry = data.sys.country;
        var currentWeather = data.weather[0].main;
        var currentTemperature = data.main.temp;
        var minTemp = data.main.temp_min;
        var maxTemp = data.main.temp_max;

        var dateTime = data.dt;
        var myDate = new Date(dateTime);

        // Create a new JavaScript Date object based on the timestamp
        // var date = new Date(dateTime*1000);
        // var hours = date.getHours(); var minutes = "0" + date.getMinutes(); var seconds = "0" + date.getSeconds();
        // var currentDateTime = formattedTime = hours + ':' + minutes.substr(-2);

        var utcSeconds = dateTime;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        console.log(d);


        var currentIcon = data.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";

        currentTemperature = Math.floor(currentTemperature);

        document.getElementById("city").innerHTML = currentCity;
        $(".city").html(currentCity + ",");
        $(".country").html(currentCountry);
        $("#loc").html(currentCity + ", " + currentCountry);
        // document.getElementById("country").innerHTML = currentCountry;
        document.getElementById("weather").innerHTML = currentWeather;
        document.getElementById('maxTemp').innerHTML = "High: " + maxTemp;
        document.getElementById('minTemp').innerHTML = "Low: " + minTemp;

        //Uncomment if need to add weather icons
        // var x = document.createElement("IMG");
        //   x.setAttribute("src",iconURL);
        //   document.getElementById("weather").appendChild(x);

        //Display temperature in C or F
        if(tempFormat == "f") {
            document.getElementById("temperature").innerHTML = currentTemperature +   "&#8457"; $(".current-temperature").html(currentTemperature);
        }
        else{
            document.getElementById("temperature").innerHTML = currentTemperature +   "&#8451"; $(".current-temperature").html(currentTemperature);
        }
        tempFormat = tempFormat.toUpperCase();
        $("div.current-weather").html(tempFormat);
        //Change background image to match with the current weather
        var currentBackgroundImg = currentWeather+".jpg";
        currentBackgroundImg = '"' + "/images/"+ currentBackgroundImg +'"';
        // console.log(currentBackgroundImg);
        $('.well').css('backgroundImage','url('+currentBackgroundImg+')');
    }//end gotData

    //Enter for submit
    $('.form').each(function() {
        $(this).find('input').keypress(function(e) {
            // Enter pressed?
            if(e.which == 10 || e.which == 13) {
                this.form.submit();
            }
        });

        $(this).find('input[type=submit]').hide();
    });

    //Enter key press for submit
    $(document).keypress(function(e){
        if (e.which == 13){
            $("#submit").click();
        }
    });

});//end ready function
