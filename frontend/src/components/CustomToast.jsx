import { CheckCircle, XCircle, Info } from "lucide-react";

function CustomToast({
  title,
  message,
  type = "success",
}) {
  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      icon: (
        <CheckCircle className="text-green-500" size={32} />
      ),
    },

    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      icon: (
        <XCircle className="text-red-500" size={32} />
      ),
    },

    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      icon: (
        <Info className="text-blue-500" size={32} />
      ),
    },
  };

  const current = styles[type];

  return (
    <div
      className={`${current.bg} border-l-4 ${current.border} shadow-2xl rounded-2xl p-4 flex gap-4 items-center w-[360px] backdrop-blur-lg`}
    >
      {current.icon}

      <div>
        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <p className="text-gray-600 text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}

export default CustomToast;