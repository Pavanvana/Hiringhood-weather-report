import { getImage } from "../utils/getImage";

interface Props {
  place: string;
  setTemp: (temp: number) => void;
  setWeatherImg: (weatherImg: string) => void;
  setCityName: (cityName: string) => void;
  setHumidity?: (humidity: string) => void;
  setWindSpeed?: (windSpeed: string) => void;
  setApiStatus?: (apiStatus: boolean) => void;
}
export const getWetherReportApi = async (props: Props): Promise<void> => {
  const {
    place,
    setTemp,
    setWeatherImg,
    setCityName,
    setHumidity,
    setWindSpeed,
    setApiStatus,
  } = props;
  setApiStatus?.(true);
  const apikey = "0af51ad90c53822d9bf1381557e1fb25";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}&units=metric`;
  const options = {
    method: "Get",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.ok) {
    const temp = Math.round(data.main.temp);
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const cityName = data.name;

    const weather = data.weather[0].main;
    setCityName(cityName);
    setWeatherImg(getImage(weather));
    setTemp(temp);
    setHumidity?.(humidity);
    setWindSpeed?.(windSpeed);
    setApiStatus?.(false);
  } else {
    alert(data.message);
    setApiStatus?.(false);
  }
};
