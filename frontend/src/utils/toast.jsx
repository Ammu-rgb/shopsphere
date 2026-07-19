import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast";

export const successToast = (title, message) => {
  toast.custom(() => (
    <CustomToast
      type="success"
      title={title}
      message={message}
    />
  ));
};

export const errorToast = (title, message) => {
  toast.custom(() => (
    <CustomToast
      type="error"
      title={title}
      message={message}
    />
  ));
};

export const infoToast = (title, message) => {
  toast.custom(() => (
    <CustomToast
      type="info"
      title={title}
      message={message}
    />
  ));
};