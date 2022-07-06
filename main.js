// api key: appid=f4d54c4c55da307dc69dfa51e113fe05
// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
//2d: api is http://api.geonames.org/timezoneJSON?

function httpGet(api101) // GET to aquire the api
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", api101, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function showWeather() {
    var landing = document.getElementById("dropDown");
    var cityId = landing.options[landing.selectedIndex].value
    // took me forverver to learn how to target this,. Targeting the ID of the city names of the dropdown.
    const key = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=f4d54c4c55da307dc69dfa51e113fe05"
    // Using Get to request data from the weatherApi
    var info = eval("(" + httpGet(key) + ")");
    // calling eval() to evaluate the string data, I had to ask for help in stack Overflow for this one as i couldn't make it work properly
    var coord = info.city.coord
    var weather = info.list[0].weather[0].main // getting the first data from the list / array of the api 

    var theirTime = "lat=" + coord.lat + "&lng=" + coord.lon
    var cordinates = coord.lat + "," + coord.lon
    const key2api = "http://api.geonames.org/timezoneJSON?" + theirTime + "&username=javthon"
    // i decided to do local time as my second api. I enitially wanted to have a map which shows the landing points from the drop down but i was able to make it work along side the first api
    var final2 = httpGet(key2api) // Get request for 2d api. I tried to write it without declaring ' final2' and staight eval("("+httpGet(key2api)+")") but it didnt work, I was puzzled why
    var localTime = eval("(" + final2 + ")").time // same approach as with the first. 

    console.log("conditions:" + weather)
    console.log("list1:" + info.list[0])
    console.log(coord)
    console.log(final2)

    document.getElementById("coordinates").value = cordinates // selecting the values of the input fields from the .innerHTML
    document.getElementById("timeLocal").value = localTime
    document.getElementById("conditions").value = weather

    var time = localTime.substring(9, 15) // using substring to extract data from the string with number 9 and 15
    var output = ""
    console.log("timeLocal:" + time)


    if (parseInt(time) >= 6 && parseInt(time) <= 18) { // if the local time is later than 6 am then display the following
        output += "It is still daytime therefore enough visibility "
    } else {
        output += "Dangerous to land right now, due to low visibility. " // otherwise display
    }

    document.getElementById("outcome").value = output // output 1 'outcome'  

    var output2 = ""
    
    if (weather === "Clouds") {  // if weather is clours / rain / clear then display the following
        output2 += "Weather is suitable for landing, minimal threats "
    } else {
        output2 += ""
    }

    if (weather === "Rain") {
        output2 += " Landing there may be challenging "
    } else {
        output2 += ""
    }

    if (weather === "Clear") {
        output2 += "Weather is perfect for landing."
    } else {
        output2 += ""
   
    }


    document.getElementById("comeout").value = output2 // selecting and targeting 'comeout' to display the output in the value


}

