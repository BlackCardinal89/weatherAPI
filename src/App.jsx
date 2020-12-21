import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [hasError, setHasError] = useState(false);

  const fetchFromAPI = async () => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${city}`
    );

    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      setWeatherInfo(data);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFromAPI();
  };

  return (
    <div className="App">
      <div id="main-container">
        <header className="App-header">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <button onChange={(event) => setCity(event.target.value)} className="icon-button">
                <FontAwesomeIcon icon={faSearch} className="icon-search" />
              </button>
              <input
                onChange={(event) => setCity(event.target.value)}
                type="text"
                placeholder="Search city"
              />
              <br /><br />
              {hasError && (
                <span className="error-msg">No matching location found!</span>
              )}
            </div>
          </form>
        </header>
        {weatherInfo ? (
          <div className="main-weather-display">
            <div className="general-info">
              <p className="condition">
                {weatherInfo?.current?.condition?.text || "Not Available"}
              </p>
              <h1 className="locationCity">
                {`${weatherInfo?.location?.name}, ${weatherInfo?.location?.country}` ||
                  "Not Available"}
              </h1>
              <div className="full-details">
                <div className="full-degrees">
                  <span className="degrees">
                    {weatherInfo?.current?.temp_c || "0"}
                  </span>
                  <span className="degrees2">
                    {weatherInfo?.current?.temp_c || "0"}
                  </span>
                  <span className="degrees-celsium">{"\u00b0"} C</span>
                </div>
                <div className="weather-details info">
                  <p className="feels-like">
                    FEELS LIKE:{" "}
                    {weatherInfo?.current?.feelslike_c || "undefined"}
                    <span className="feels-like-celsium">{"\u00b0"} C</span>
                  </p>
                  <p className="wind-kph">
                    WIND: {weatherInfo?.current?.wind_kph} KPH
                  </p>
                  <p className="humidity">
                    HUMIDITY: {weatherInfo?.current?.humidity || "undefined"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="try-some">Try some city</h1>
        )}
      </div>
    </div>
  );
}

export default App;
