$(function() {


  // $("#tempFormat").click(function () {
  //   var tempFormat = document.getElementById('tempFormat');
  //   tempFormat = tempFormat.value;
  //   console.log("tempFormat is "+tempFormat);
  // });

  $("#submit").click(function() {


    // tempFormat = parseInt(tempFormat);
    var tempFormat = document.getElementById('tempFormat');
    tempFormat = tempFormat.value;
    console.log("tempFormat is "+tempFormat);


    if(tempFormat == "f")
    {
      var units = "&units=imperial";
      var unitDegree = "&#8457";
    }else
    {
      var units = "&units=metric";
      var unitDegree = "&#8457";
    }

    var length =$("#enteredCity").val();
    length = length.length;
    // console.log(length);
    if(length > 0){

      $(".well").removeClass( "hidden" );
      $(".well").addClass( "animate" );
      var api = "http://api.openweathermap.org/data/2.5/weather?q="
      // var city = "Chicago";
      var apiKey = "&appid=e5443695562b2564371d9390c830bc1f";
      // var units = "&units=imperial";
      var city = $("#enteredCity").val();
      var url = api+city+apiKey+units;

      // setInterval(fetchData, 3000);
      var fetchData = $.getJSON(url, gotData);

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
    var currentIcon = data.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
    console.log(iconURL);

    currentTemperature = Math.floor(currentTemperature);

    document.getElementById("city").innerHTML = currentCity;
    // document.getElementById("country").innerHTML = currentCountry;
    document.getElementById("weather").innerHTML = currentWeather;


    //Uncomment if need to add weather icons
    // var x = document.createElement("IMG");
    //   x.setAttribute("src",iconURL);
    //   document.getElementById("weather").appendChild(x);


    // tempFormat = tempFormat.value;
    if(tempFormat == "f")
    {document.getElementById("temperature").innerHTML = currentTemperature +   "&#8457";}
    else{document.getElementById("temperature").innerHTML = currentTemperature +   "&#8451";}

    var currentBackgroundImg = currentWeather+".jpg";
    currentBackgroundImg = '"' + currentBackgroundImg +'"';
    // console.log(currentBackgroundImg);
    $('.well').css('backgroundImage','url('+currentBackgroundImg+')');


  }//end gotData



});
