
$(document).ready(function() {

    /* Toggle Temperature from checkbox */
    $("label.switch > input").change(function() {
        var setval = this.checked ? "f" : "c";
        $('#tempFormat').val(setval);
        click();
    });

    $('button').click(function () {
        console.log("Clicked!");
    });


    var input = $('#txt');
    input.on('keydown', function() {
        var key = event.keyCode || event.charCode;
        if (key ==  13) {
            console.log("Enter");
            if((input.val().length > 1) && (key == 13) ) {
                $('#enteredCity').val(input.val());
                $('button.btn-success').click();
                console.log("Enter");
            }
        } else {
            var cache = $('#txt')
            var textLength = cache.val().length + 1;

            if( key == 8 || key == 46 ) { textLength -=2; }

            var width = textLength * 35;
            width = width + "px";

            if(textLength < 3) {
                width = textLength * 45;
                width = width + "px";
            }
            cache.css({
                "min-width": "60px",
                "width": width
            });
        }
    });



    var city, state, country, countryCode, timezone, bgimages, imgURL;
    var currentTime;
    var appID = config.appID;
    var appSecret = config.appSecret;

    var rawData = $.getJSON('https://freegeoip.net/json/',loc, "jsonp");

    function img(data) {
        var len = (data.results).length;
        var number = Math.floor(Math.random() * len) + 1;
        number = number.toString();
        if(!number) {number = 0;}
        //console.log(number);
        // imgURLfull = data.results[number].urls.full;
        imgURL = data.results[number].urls.regular;
        // bgimages = data.results;
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
        var bgImg = $.getJSON("//api.unsplash.com/search/photos?page=1&query="+ city +"&client_id=" + appID, img, "jsonp");

        $('#enteredCity').val(city);
        //trigger the click
        click();
    }, 200);

    function getImage() {
        setTimeout(function() {
            /* Set the background image from City name, if error, display fallback image */
            if(imgURL) {
                $('.weather').css('background-image', 'url('+imgURL+')');
            } else {
                var fallBack = "/images/Clear.jpg";
                $('.weather').css('background-image', 'url('+fallBack+')');
            }
        }, 500);
    }
    getImage();

    //
    // $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=" + config.google,getCurrentTime, "jsonp");
    //
    //
    // function getCurrentTime(data) {
    //     var location = (data.results["0"].geometry.location);
    //     var latitude = location.lat;
    //     var longitude = location.lng;
    //
    //     console.log("latitude is " + latitude);
    //     console.log("longitude is " + longitude);
    //
    //     //https://maps.googleapis.com/maps/api/timezone/json?location=37.77492950,-122.41941550&timestamp=1331161200&sensor=false
    //
    //     $.getJSON("https://maps.googleapis.com/maps/api/timezone/json?location=" + latitude + "," + longitude, gotData, "jsonp");
    //
    //     function gotData(data){
    //         console.log(currentTime)
    //     }
    // }


    function getTimeZone(data) {

        currentTime = (data.data.time_zone["0"].localtime).split(" ")[1];
        if(currentTime.split(":")[0] > 12) {
            currentTime = currentTime.split(":")[0] - 12 + ":" + currentTime.split(":")[1] + ' PM';
        } else if(currentTime.split(":")[0] == 12) {
            currentTime = currentTime.split(":")[0] + ":" + currentTime.split(":")[1] + ' PM';
        }

        else {
            currentTime = currentTime + ' AM';
        }
        $('span#time').html(currentTime);
    }

    //https://www.amdoren.com/api/timezone.php?api_key=qer6be5kLvhm5ci5mfWP9cUzdYQV46&loc=New+York

    function click() {

        if ($('#tempFormat').val() == 'f') {
            $('label.switch > input').prop('checked', true);
        } else {
            $('label.switch > input').prop('checked', false);
        }

        city = $('#enteredCity').val();
        timezone = $.getJSON("//api.worldweatheronline.com/premium/v1/tz.ashx?q=" + city + "&key=" + config.timeAPI + "&format=json",getTimeZone, "jsonp");
        //timeNow = $.getJSON("https://www.amdoren.com/api/timezone.php?api_key=qer6be5kLvhm5ci5mfWP9cUzdYQV46&loc=New+York", getCurrentTime, "jsonp");

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
            var api = "//api.openweathermap.org/data/2.5/weather?q=";
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
        //console.log(d);


        var currentIcon = data.weather[0].icon;
        var iconURL = "//openweathermap.org/img/w/" + currentIcon + ".png";
        currentTemperature = Math.floor(currentTemperature);
        // document.getElementById("city").innerHTML = currentCity;
        $('.city').html(currentCity);
        $("location > .city").html(currentCity + ",");
        $(".country").html(currentCountry);
        $("#loc").html(currentCity + ", " + currentCountry);
        // currentTime = getCurrentTime();
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
        $(".current-temperature").html(currentTemperature);
        tempFormat = tempFormat.toUpperCase();
        $("div.current-weather").html(tempFormat);
        //Change background image to match with the current weather
        var currentBackgroundImg = currentWeather+".jpg";
        currentBackgroundImg = '"' + "//d252geuwm6rln6.cloudfront.net/"+ currentBackgroundImg +'"';
        // console.log(currentBackgroundImg);
        $('.well').css('backgroundImage','url('+currentBackgroundImg+')');
    }//end gotData


    $("#submit").click(function() {
        click();
    });
    $("#enteredCity").change(function() {
        var city = $("#enteredCity").val();
        var bgImg = $.getJSON("//api.unsplash.com/search/photos?page=1&query="+ city +"&client_id=" + appID, img, "jsonp");
        getImage();
        click();
    });
    $("#tempFormat").change(function() {
        click();
    });



});//end ready function
