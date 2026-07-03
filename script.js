const apikey = 'https://open-weather13.p.rapidapi.com/fivedaysforcast?latitude=40.730610&longitude=-73.935242&lang=EN';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '578abacf35mshf4728cd731de964p19c225jsna0d2bb97895d',
// 		'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
// 		'Content-Type': 'application/json'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// const apiKey = "YOUR_API_KEY";

async function getWeather() {

    const city = document.getElementById("city").value;

    if(city=="") return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if(data.cod!="200"){

        alert("City not found");

        return;

    }

    document.getElementById("cityName").innerHTML=data.name;

    document.getElementById("temp").innerHTML=Math.round(data.main.temp)+"°C";

    document.getElementById("humidity").innerHTML=data.main.humidity+"%";

    document.getElementById("wind").innerHTML=data.wind.speed+" km/h";

    document.getElementById("icon").src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}