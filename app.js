window.addEventListener("load", () => {
    let long;
    let lat;
    let api_key = config.KEY;
    let temperatureDesription = document.querySelector(".description");
    let temperatureDegree = document.querySelector(".degree");
    let locationTimezone = document.querySelector(".timezone");
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/${api_key}${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            }) 
            .then(data => {
                const {temperature, summary, icon} = data.currently;

                temperatureInCelsius = Math.round((temperature - 32) * (5/9));


                temperatureDegree.textContent = temperatureInCelsius;
                temperatureDesription.textContent = summary;                  
                locationTimezone.textContent = data.timezone;       //location info disp

                setIcons(icon, document.querySelector('.icon'));
            })
        });  
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
})