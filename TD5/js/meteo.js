let div_affichage = document.getElementById("affichage");

printMeteo();

async function printMeteo() {
    let apikey = "bf9a90d0e8cd0b4a08ee76dc88923237";
    const response = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" + sessionStorage.getItem("ville") + "&appid=" + apikey + "&units=metric&lang=fr", {
            method: 'GET',
        }).catch(function (err) {
        console.log("erreur:" + err);
    });
    const json = await response.json();
    let ville = document.createElement("h1");
    ville.innerText = sessionStorage.getItem("ville");
    let temp = document.createElement('p');
    temp.innerText = "Température: " + json['main']["temp"] + "°C";
    let res = document.createElement('p');
    res.innerText = "Ressentie: " + json['main']["feels_like"] + "°C";
    let min = document.createElement('p');
    min.innerText = "Température min: " + json['main']["temp_min"] + "°C";
    let max = document.createElement('p');
    max.innerText = "Température max: " + json['main']["temp_max"] + "°C";
    let weather = document.createElement('p');
    weather.innerText = "Temps: " + json['weather'][0]["description"];
    let hum = document.createElement('p');
    hum.innerText = "Humidité: " + json['main']["humidity"] + "%";
    let html = document.getElementsByTagName("html");
    let urlImage = 'url("http://openweathermap.org/img/wn/'+ json["weather"][0]["icon"] + '@4x.png")';
    console.log(urlImage);
    html[0].style.backgroundImage = urlImage;
    div_affichage.before(ville);
    div_affichage.append(temp, res, min, max, weather, hum);
}

