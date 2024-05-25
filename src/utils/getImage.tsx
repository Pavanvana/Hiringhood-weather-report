import { GetImageEnum } from "../types/getImageTypes";

export const getImage = (name: string): string => {
  switch (name) {
    case GetImageEnum.CLOUDS:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1683970963/clouds_m52inv.png";
    case GetImageEnum.CLEAR:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1683970736/clear_thujux.png";
    case GetImageEnum.RAIN:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1683971038/rain_wfere4.png";
    case GetImageEnum.SNOW:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1683971050/snow_ncugah.png";
    case GetImageEnum.MIST:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1683971020/mist_ljptru.png";
    case GetImageEnum.HAZE:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1683970982/drizzle_ra2d9s.png";
    default:
      return "https://res.cloudinary.com/daflxmokq/image/upload/v1684040672/1497075_issr2r.png";
  }
};
