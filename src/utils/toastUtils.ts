import { ToastContainerProps, ToastPosition, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ToastEnum } from "../types/toastTypes";

interface Props {
  type: string;
  msg: string;
  position?: ToastPosition;
  duration?: number;
  bodyStyle?: string;
}

export const toastify = (props: Props) => {
  const { type, msg, position = "bottom-center", duration = 5000 } = props;
  const toastParam: ToastContainerProps = {
    position: position,
    autoClose: duration,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    newestOnTop: true,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
  };

  switch (type) {
    case ToastEnum.INFO:
      return toast.info(msg, {
        ...toastParam,
        className:
          "border border-solid border-blue-600 bg-blue-100 text-blue-600 rounded",
      });
    case ToastEnum.SUCCESS:
      return toast.success(msg, {
        ...toastParam,
        className:
          "border border-solid border-green-600 bg-green-100 text-green-600 rounded",
      });
    case ToastEnum.WARNING:
      return toast.warning(msg, {
        ...toastParam,
        className:
          "border border-solid border-yellow-600 bg-yellow-100 text-yellow-600 rounded",
      });
    case ToastEnum.ERROR:
      return toast.error(msg, {
        ...toastParam,
        className:
          "border border-solid border-red-600 bg-red-100 text-red-600 rounded",
      });
    default:
      return toast.info(msg, {
        ...toastParam,
        className:
          "border border-solid border-blue-600 bg-blue-100 text-blue-600 rounded",
      });
  }
};

export const SuccessToast = (msg: string) => {
  toastify({ type: ToastEnum.SUCCESS, msg: msg });
};

export const ErrorToast = (msg: string) =>
  toastify({ type: ToastEnum.ERROR, msg: msg });

export const WarningToast = (msg: string) =>
  toastify({ type: ToastEnum.WARNING, msg: msg });

export const InfoToast = (msg: string) =>
  toastify({ type: ToastEnum.INFO, msg: msg });
