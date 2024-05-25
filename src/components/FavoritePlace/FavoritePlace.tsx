import React, { ReactElement, useEffect, useState } from "react";

import {
  cancelButtonClass,
  cityNameClass,
  confirmButtonClass,
  deleteDescriptionClass,
  deleteHeadingClass,
  listItemClass,
  tempNumClass,
  weatherImgClass,
} from "./style";
import { getWetherReportApi } from "../../apis/getWetherReportApi";
import ReactBaseModal from "../../common/ReactBaseModal/ReactBaseModal";

interface Props {
  eachPlace: {
    place: string;
  };
  onClickDeleteFavoritePlace: (place: string) => void;
}

const FavoritePlace = (props: Props): ReactElement => {
  const { eachPlace, onClickDeleteFavoritePlace } = props;
  const { place } = eachPlace;

  const [temp, setTemp] = useState<number>();
  const [cityName, setCityName] = useState<string>("");
  const [weatherImg, setWeatherImg] = useState<string>("");

  const [openFavoritePopover, setOpenFavoritePopover] =
    useState<boolean>(false);

  useEffect(() => {
    getWetherReportApi({ place, setTemp, setWeatherImg, setCityName });
  }, []);

  const renderRemoveFavoritePlaceModal = () => (
    <div className="flex p-[0px_20px_30px_20px]">
      <div className="ml-[20px]">
        <h3 className={deleteHeadingClass}>Are you sure you want to Delete?</h3>
        <p className={deleteDescriptionClass}>
          We will send you updates and sustainability news
        </p>
        <div className="flex items-center">
          <button
            type="button"
            className={confirmButtonClass}
            onClick={() => onClickDeleteFavoritePlace(place)}
          >
            Yes, Delete
          </button>
          <button
            type="button"
            className={cancelButtonClass}
            onClick={() => {
              setOpenFavoritePopover(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <li
        className={listItemClass}
        onClick={() => setOpenFavoritePopover(true)}
      >
        <img className={weatherImgClass} src={weatherImg} alt="weather-img" />
        <p className={tempNumClass}>{temp}°C</p>
        <h1 className={cityNameClass}>{cityName}</h1>
      </li>
      <ReactBaseModal
        isOpen={openFavoritePopover}
        onOpenChange={setOpenFavoritePopover}
      >
        {renderRemoveFavoritePlaceModal()}
      </ReactBaseModal>
    </>
  );
};

export default FavoritePlace;
