//VARIABLES
  const tempEl = document.getElementById("temperature");
  const descEl = document.getElementById("weather-description");
  const celBtn = document.getElementById("cel");
  const fahBtn = document.getElementById("fah");
  const cityInput = document.getElementById("city-input"); 
  const cityBtn = document.getElementById("city-btn"); 
  let city = "Oslo"; // Default city
  let currentUnit = "metric";

  const apiKey = "9f9499a531528a12b68f9dd6efe610a5";


//MAIN FUNCTION
  function loadWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`
    )

      .then((res) => res.json())
      .then((data) => {
        const temp = Math.round(data.main.temp);
        const weatherMain = data.weather[0].main;
        tempEl.innerHTML = `${temp}&deg;${currentUnit === "metric" ? "C" : "F"}`;

//PHRASES
  let customPhrase = "";
    switch (weatherMain) {
        case "Clear":
          customPhrase = "The sun is shining. Go have fun!";
          break;
        case "Rain":
          customPhrase = "It's rainy. Don't forget your umbrella!";
          break;
        case "Snow":
          customPhrase = "Snow is falling. Time for snowballs!";
          break;
        case "Clouds":
          customPhrase = "It's cloudy but cozy :)";
          break;
        case "Thunderstorm":
          customPhrase = "Thunderstorm outside. Stay safe.";
          break;
        default:
          customPhrase = "The weather is mysterious today...";
      }
      descEl.innerText = customPhrase;
    })

    .catch((error) => {
      tempEl.innerText = "N/A";
      descEl.innerText = "Something went wrong. Maybe ask your cat?";
      console.error(error);
    });
                                    }

//BUTTONS
celBtn.addEventListener("click", () => {
  currentUnit = "metric";
  loadWeather();
});

fahBtn.addEventListener("click", () => {
  currentUnit = "imperial";
  loadWeather();
});

//BUTTON TO CHANGE CITY
  cityBtn.addEventListener("click", () => {
    city = cityInput.value;
    loadWeather();
  });

loadWeather();

//SNUFIK DAY ANIMATION
  const snufikImg = document.getElementById("snufik");
  const snufikFrames = [
    "images/Day/Snufik/Snufik1.png",
    "images/Day/Snufik/Snufik2.png",
    "images/Day/Snufik/Snufik3.png",
    "images/Day/Snufik/Snufik4.png"
  ];

  let currentFrame = 0;

  setInterval(() => {
    currentFrame = (currentFrame + 1) % snufikFrames.length;
    snufikImg.src = snufikFrames[currentFrame];
  }, 500); 

  function updateDayNight() {//function start
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const bg = document.getElementById("background");
    const sn = document.getElementById("snufik");

    if (isDay) {
      bg.classList.add("day");
      bg.classList.remove("night");
      sn.src = "images/Day/Snufik/Snufik1.png";
    } else {
      bg.classList.add("night");
      bg.classList.remove("day");
      sn.src = "images/Night/Snufik-sleepy1.png";

// SNUFIK NIGHT ANIMATION
  const nightFrames = [
    "images/Night/Snufik-sleepy1.png",
    "images/Night/Snufik-sleepy2.png"];

  let idx = 0;

  clearInterval(window._nightAnim);

  window._nightAnim = setInterval(() => {
   idx = (idx + 1) % nightFrames.length;
    sn.src = nightFrames[idx];
    }, 500);
          }
                                          } //function end

window.onload = () => {
  loadWeather();
    updateDayNight();
};
