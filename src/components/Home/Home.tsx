import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";

import TextField from "../../common/TextField/TextField";
import FavoritePlace from "../FavoritePlace/FavoritePlace";
import Button from "../../common/Button/Button";
import { getWetherReportApi } from "../../apis/getWetherReportApi";
import { FavoriteCitiesType } from "../../types/favoriteCitiesType";
import IconButton from "../../common/IconButton/IconButton";
import { SuccessToast } from "../../utils/toastUtils";
import { celsiusToFahrenheit } from "../../utils/temperature";
import Loader from "../../common/Loader/Loader";

import {
  addCityButtonClass,
  appContainerClass,
  cityClass,
  degreesClass,
  degreesSymbolButtonClass,
  detailsClass,
  eachDetailsClass,
  favoritePlaceHeadingClass,
  favoritePlaceHeadingContainerClass,
  headingClass,
  humidityImgClass,
  humidityNumClass,
  listContainerClass,
  newCityInputContainerClass,
  searchContainerClass,
  searchInputClass,
  tempClass,
  typeNewCityInputClass,
  wetherClass,
  wetherIconClass,
  wetherReportContainerClass,
  windSpeedImgClass,
} from "./styles";

const Home = (): React.ReactElement => {
  const [location, setLocation] = useState<string>("Hyderabad");
  const [searchInput, setSearchInput] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [weatherImg, setWeatherImg] = useState<string>("");
  const [temp, setTemp] = useState<number>();
  const [cityName, setCityName] = useState<string>("");
  const [newCityInput, setNewCityInput] = useState<string>("");
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCitiesType[]>(
    JSON.parse(localStorage.getItem("favoriteCities") || "[]")
  );
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState(false);

  useEffect(() => {
    getWetherReportApi({
      place: location,
      setTemp,
      setWeatherImg,
      setCityName,
      setHumidity,
      setWindSpeed,
      setApiStatus,
    });
  }, [location]);

  useEffect(() => {
    onClickLocationButton();
  }, []);

  const onClickSearchButton = (): void => {
    if (searchInput === "") {
      return alert("Please enter city name");
    }
    setLocation(searchInput);
    setSearchInput("");
  };

  const onClickButton = async (): Promise<void> => {
    if (newCityInput === "") {
      return alert("Please enter city name");
    }

    const apikey = "0af51ad90c53822d9bf1381557e1fb25";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCityInput}&appid=${apikey}&units=metric`;
    const options = {
      method: "Get",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const newCity = {
        id: parseInt(uuidV4()),
        place: newCityInput,
      };

      setFavoriteCities([...favoriteCities, newCity]);
      localStorage.setItem(
        "favoriteCities",
        JSON.stringify([...favoriteCities, newCity])
      );
      SuccessToast("City added successfully");
    } else {
      alert(data.message);
    }
    setNewCityInput("");
  };

  const onClickLocationButton = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=&{position.coords.longitude}&localityLanguage=eng`;
        const options = {
          method: "GET",
        };
        const response = await fetch(geoApiUrl, options);
        const data = await response.json();
        setLocation(data.city);
      });
    }
  };

  const onClickDeleteFavoritePlace = (place: string): void => {
    const newFavoriteCities = favoriteCities.filter(
      (each) => each.place !== place
    );
    setFavoriteCities(newFavoriteCities);
    localStorage.setItem("favoriteCities", JSON.stringify(newFavoriteCities));
  };

  const renderFavoritePlaces = (): React.ReactElement => (
    <div>
      <div className={favoritePlaceHeadingContainerClass}>
        <h1 className={favoritePlaceHeadingClass}>Favorite Citys</h1>
        <div className={newCityInputContainerClass}>
          <TextField
            onChange={setNewCityInput}
            className={typeNewCityInputClass}
            placeholder="Type new city..."
            value={newCityInput}
            onSubmit={onClickButton}
          />
          <Button
            onClick={onClickButton}
            type="button"
            className={addCityButtonClass}
            buttonText="Add City"
            size="large"
          />
        </div>
      </div>
      {favoriteCities.length > 0 ? (
        <ul className={listContainerClass}>
          {favoriteCities.map((each) => (
            <FavoritePlace
              key={each.id}
              eachPlace={each}
              onClickDeleteFavoritePlace={onClickDeleteFavoritePlace}
            />
          ))}
        </ul>
      ) : (
        <div className="h-[10vh]">
          <p className="text-center font-sans text-[20px]">No cities added</p>
        </div>
      )}
    </div>
  );

  const renderSearchCities = (): React.ReactElement => (
    <div className={searchContainerClass}>
      <TextField
        className={searchInputClass}
        placeholder="Search city..."
        onChange={setSearchInput}
        value={searchInput}
        onSubmit={onClickSearchButton}
      />
      <div>
        <IconButton
          icon={<HiOutlineSearch size={22} />}
          onClick={onClickSearchButton}
        />
      </div>
      <div className="ml-[12px]">
        <IconButton
          icon={<HiOutlineLocationMarker size={22} />}
          onClick={onClickLocationButton}
        />
      </div>

      <div className={degreesClass}>
        <button
          className={degreesSymbolButtonClass}
          onClick={() => setIsCelsius(true)}
        >
          °C
        </button>
        |
        <button
          className={degreesSymbolButtonClass}
          onClick={() => setIsCelsius(false)}
        >
          °F
        </button>
      </div>
    </div>
  );

  const renderWeatherReport = (): React.ReactElement =>
    apiStatus ? (
      <div className="h-[50vh] flex justify-center">
        <Loader />
      </div>
    ) : (
      <div className={wetherClass}>
        <img src={weatherImg} className={wetherIconClass} alt="wether icon" />
        {isCelsius ? (
          <h1 className={tempClass}>{temp}°C</h1>
        ) : (
          <h1 className={tempClass}>{celsiusToFahrenheit(temp as number)}°F</h1>
        )}
        <h2 className={cityClass}>{cityName}</h2>
        <div className={detailsClass}>
          <div className={eachDetailsClass}>
            <img
              className={humidityImgClass}
              src="https://res.cloudinary.com/daflxmokq/image/upload/v1683970998/humidity_tgjwbf.png"
              alt="humidity"
            />
            <p className={humidityNumClass}>{humidity}%</p>
            <p className={humidityNumClass}>Humidity</p>
          </div>
          <div className="each-details">
            <img
              className={windSpeedImgClass}
              src="https://res.cloudinary.com/daflxmokq/image/upload/v1683971067/wind_zvfown.png"
              alt="wind speed"
            />
            <p className={humidityNumClass}>{windSpeed} km/h</p>
            <p className={humidityNumClass}>Wind Speed</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className={appContainerClass}>
      <div className={wetherReportContainerClass}>
        <h1 className={headingClass}>Wether Report</h1>
        {renderSearchCities()}
        {renderWeatherReport()}
        <hr />
        {renderFavoritePlaces()}
      </div>
    </div>
  );
};

export default Home;
