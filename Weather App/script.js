const searchBox = document.querySelector(".search input")
const searchBTN = document.querySelector(".search button")
const cityElement = document.querySelector(".city")
const tempElement = document.querySelector(".temp")
const humidityElement = document.querySelector(".humidity")
const windElement = document.querySelector(".wind")
const img = document.querySelector(".weather-icon")

async function getData(value) {
  try {
    let url = `http://api.weatherapi.com/v1/current.json?key=30c9286da7804c17a24113106241204&q=${value}&aqi=no`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null // or handle the error as needed
  }
}

function setData(data) {
  cityElement.innerHTML = data.location.name
  tempElement.innerText = `${Math.round(data.current.temp_c)}°C`
  humidityElement.innerText = `${data.current.humidity}%`
  windElement.innerText = `${Math.round(data.current.wind_kph)}km/h`
  img.src = "https:" + data.current.condition.icon
  document.querySelector(".weather").style.display = "block"
}

searchBTN.addEventListener("click", (e) => {
  e.preventDefault()

  getData(searchBox.value)
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      console.error(error)
    })
})
