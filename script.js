$(document).ready(function() {
    var city, state, country, countryCode, timezone, bgimages, imgURL;
    var currentTime;
    var appID = config.appID;
    var appSecret = config.appSecret;

    var rawData = $.getJSON('http://freegeoip.net/json/',loc, "jsonp");


    function img(data) {
        var len = (data.results).length;
        var number = Math.floor(Math.random() * len) + 1;
        number = number.toString();
        if(!number) {number = 0;}
        console.log(number);
        // imgURLfull = data.results[number].urls.full;
        imgURL = data.results[number].urls.regular;
        console.log(imgURL);
        //bgimages = data.results;
    }



    var fullData;
    function loc(data) {
        fullData=data;
    }

    // Set location as per the ip address from ISP
    setTimeout(function(){
        // console.log(fullData);
        city = fullData.city;
        state = fullData.region_code;
        country = fullData.country_name;
        countryCode = fullData.country_code;


        // Uncomment this line later
        var bgImg = $.getJSON("https://api.unsplash.com/search/photos?page=1&query="+ city +"&client_id=" + appID, img, "jsonp");

        $('#enteredCity').val(city);
        //trigger the click
        click();
    }, 200);

    function getImage() {
        setTimeout(function() {
            $('.weather').css('background-image', 'url('+imgURL+')');
        }, 500);
    }
    getImage();

    function getTimeZone(data) {
        currentTime = (data.data.time_zone["0"].localtime).split(" ")[1];
        if(currentTime.split(":")[0] > 12) {
            currentTime = currentTime.split(":")[0] - 12 + ":" + currentTime.split(":")[1] + ' PM';
        } else {
            currentTime = currentTime + ' AM';
        }
        console.log(currentTime);
    }

    function click() {
        city = $('#enteredCity').val();
        timezone = $.getJSON("http://api.worldweatheronline.com/premium/v1/tz.ashx?q=" + city + "&key=" + config.timeAPI + "&format=json",getTimeZone, "jsonp");

        // tempFormat = parseInt(tempFormat);
        var tempFormat = $('#tempFormat').val();

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
    }//end click

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
        $("#time").html(currentTime);
        // document.getElementById("country").innerHTML = currentCountry;
        document.getElementById("weather").innerHTML = currentWeather;
        document.getElementById('maxTemp').innerHTML = "High: " + maxTemp;
        document.getElementById('minTemp').innerHTML = "Low: " + minTemp;

        //Uncomment if need to add weather icons
        // var x = document.createElement("IMG");
        //   x.setAttribute("src",iconURL);
        //   document.getElementById("weather").appendChild(x);

        //Display temperature in C or F
        // if(tempFormat == "f") {
        //     // document.getElementById("temperature").innerHTML = currentTemperature +   "&#8457"; $(".current-temperature").html(currentTemperature);
        //     $("#temperature").html(currentTemperature);
        // }
        // else{
        //     // document.getElementById("temperature").innerHTML = currentTemperature +   "&#8451"; $(".current-temperature").html(currentTemperature);
        //     $("#temperature").html(currentTemperature);
        // }
        $("#temperature").html(currentTemperature);
        tempFormat = tempFormat.toUpperCase();
        $("div.current-weather").html(tempFormat);
        //Change background image to match with the current weather
        var currentBackgroundImg = currentWeather+".jpg";
        currentBackgroundImg = '"' + "/images/"+ currentBackgroundImg +'"';
        // console.log(currentBackgroundImg);
        $('.well').css('backgroundImage','url('+currentBackgroundImg+')');
    }//end gotData


    $("#submit").click(function() {
        click();
    });
    $("#enteredCity").change(function() {
        var city = $("#enteredCity").val();
        var bgImg = $.getJSON("https://api.unsplash.com/search/photos?page=1&query="+ city +"&client_id=" + appID, img, "jsonp");
        getImage();
        click();
    });
    $("#tempFormat").change(function() {
        click();
    });


    // $('#enteredCity, #tempFormat').change(function(){
    //     click();
    // });

});//end ready function
