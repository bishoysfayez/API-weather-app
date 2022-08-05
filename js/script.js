    // Route - Full stack diploma C38 - SAT & TUE - ALEX
    // Date : 11-June-2022
    // Assignment # 9 - JS - APIs Weather App
    // Name : Bishoy Saeed Fayez
    // e-mail : bishoysfayez@gmail.com 
    // Mobile & Whatsapp : 01211351223


    
// global Vars
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var goBtn = document.querySelector('#search-go');
var cityInput = document.querySelector('#input-city');

// event for button Go to get API of the City 
goBtn.addEventListener('click', function (){
  getCity(cityInput.value)
});

// city input to get API for City when start writing in search field

cityInput.addEventListener('change', (event) => {
  //console.log(cityInput.value);
  if(getCity(cityInput.value).length >= 3){
    getCitySuggestionOnly(cityInput.value);

  }
})
// function to get cities 

async function getCity(cityValue){
  var cityResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=23b03007334245b49d472248220906&&q=${cityValue}`)
  var cityArray = (await cityResponse.json());
  var city = cityArray[0].name;
  //console.log(cityArray);



  // show other cities suggestions on badges 
  var citiesCartona;
  for (var i = 0; i < cityArray.length; i++){
    //console.log(cityArray[i].name)
   citiesCartona += `
   <div class="m-1 d-inline-block" style= "cursor: pointer">
     <span class="badge bg-secondary" data-city-name ="${cityArray[i].name}" onclick="suggestionClick(this)">${cityArray[i].name} -- ${cityArray[i].country}</span>
 
     </div>`
  }
//  post the suggestion to badges 
document.querySelector(".cities-results").innerHTML =  citiesCartona;
// finally get weather of the first result city 
  getWeather(city);
  
}

    // when clicking suggestion badge get its weather
    function suggestionClick(element){
      var clickedSuggestedCity = element.getAttribute('data-city-name');
      //console.log(clickedSuggestedCity)
      getWeather(clickedSuggestedCity);

    }



// event for badge click to select city 


async function getWeather(city){

    var reponseToday = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=23b03007334245b49d472248220906&q=${city}&aqi=no&days=3`);
    // getting date data 
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(afterTomorrow.getDate() + 1);
    var todayDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var tomorrowDate = tomorrow.getFullYear()+'-'+(tomorrow.getMonth())+'-'+tomorrow.getDate();
    var afterTomorrowDate = afterTomorrow.getFullYear()+'-'+(afterTomorrow.getMonth())+'-'+afterTomorrow.getDate();


    
    
    var weatherData = await reponseToday.json();
    //console.log('weather', weatherData);
    var cartona = `
    
    <div class = "container-fluid">
    
    


    <div class="row row-of-results gx-4 mx-auto p-5 border-2">


        <!-- ---- today ----- -->
        
            
        <div class="col-sm-10 col-md-4 py-1 bg-color-1 weather-card">
        <div class="">
        <div class="d-flex flex-row justify-content-between align-content-between">
          <div class = "text-white">${todayDate}</div>
          <div class="text-center text-white">${days[today.getDay()]}</div>
        </div>
        </div>
        <div class="d-flex flex-column">
        <p class =" text-muted text-start"> ${weatherData.location.country} / ${weatherData.location.name}<p>
        <h2 class="text-center text-light mb-2">${weatherData.current.temp_c} &#176; C</h2>
        <p class= "text-light fw-bold text-center" >${weatherData.forecast.forecastday[0].day.mintemp_c} &#176; C</p>
        
        <div class="container-fluid text-center">
            <img class = "w-50" src="https:${weatherData.current.condition.icon}" alt="" srcset="">
            <p class= " text-muted text-center" >${weatherData.current.condition.text}</p>
        </div>
        </div>
        <div class="row g-2">
        <div class=" col-md-4 col-sm-10">
            <i class="fa-solid text-light fa-wind"></i> 
            <span class="text-muted">${weatherData.current.wind_kph} kph</span> 
        </div>
        <div class="col-md-4 col-sm-10">
            <i class="fa-solid text-light fa-compass"></i> 
            <span class="text-muted"> ${weatherData.current.wind_dir}</span> 
        </div>
        <div class="col-md-4  p-1 col-sm-10">
            <i class="fa-solid text-light fa-umbrella"></i> 
            <span class="text-muted"> ${weatherData.current.precip_mm} mm</span> 
        </div>
    
    </div>
    
        </div>
        
         <!-- ---- tomorrow  -->
        
          <div class="col-sm-10 col-md-4 bg-color-2 weather-card">
            <div class = "py-2">
            
                <div class="text-center text-light mx-auto d-flex justify-content-center pb-3 align-content-center my-auto">
                      ${days[tomorrow.getDay()]}
                </div>
                    
                <div class = "py-4 mt-2">
                    <h5 class ="text-light text-center">${weatherData.forecast.forecastday[1].day.maxtemp_c}&#176; C</h5>
                    <p class= "text-light fw-blod text-center" >${weatherData.forecast.forecastday[1].day.mintemp_c} &#176; C</p>
        
                    <div class="mx-auto text-center container-fluid">
                    <img class = "w-50" src="https:${weatherData.forecast.forecastday[1].day.condition.icon}" alt="" srcset="">
                    <p class= " text-muted text-light text-center" >${weatherData.forecast.forecastday[1].day.condition.text}</p>
                </div>
            </div>
          
          
         </div>
          </div>
        
         <!-- ---- after tomorrow  -->
          
          <div class="col-sm-10 col-md-4 bg-color-1 weather-card">
            <div class="py-2">
                <div class="text-light text-center mx-auto d-flex justify-content-center pb-3 align-content-center my-auto">
                ${days[(afterTomorrow.getDay())]}
            </div>
            <div class = "py-4 mt-2">
            
                <h5 class="text-light text-center">${weatherData.forecast.forecastday[2].day.maxtemp_c}&#176; C</h5>
                <p class= "text-light text-center" >${weatherData.forecast.forecastday[2].day.mintemp_c} &#176; C</p>
        
                <div class="mx-auto text-center container-fluid">
                    <img class = "text-center w-50" src="https:${weatherData.forecast.forecastday[2].day.condition.icon}" alt="" srcset="">
                    <p class= "text-muted text-center" >${weatherData.forecast.forecastday[2].day.condition.text}</p>
                </div>
            </div>
          </div>
        </div>
        </div>


    
    </div>

    `
    document.querySelector('.results').innerHTML = cartona;

}

// default get weather of cairo


// get city suggestions only witgout API 
async function getCitySuggestionOnly(cityValue){
  var cityResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=23b03007334245b49d472248220906&&q=${cityValue}`)
  var cityArray = (await cityResponse.json());
  var city = cityArray[0].name;
  //console.log(cityArray);



  // show other cities suggestions on badges 
  var citiesCartona;
  for (var i = 0; i < cityArray.length; i++){
    //console.log(cityArray[i].name)
   citiesCartona += `
   <div class="m-1 d-inline-block" style= "cursor: pointer">
     <span class="badge bg-secondary" data-city-name ="${cityArray[i].name}" onclick="suggestionClick(this)">${cityArray[i].name} -- ${cityArray[i].country}</span>
 
     </div>`
  }
//  post the suggestion to badges 
document.querySelector(".cities-results").innerHTML =  citiesCartona;

}


// default city on page start
getCity('Alexandria');