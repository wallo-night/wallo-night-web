import { ColorType } from "@/types/profile.type";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface SizeInterface {
  [key: string]: string;
}

const sizeType: SizeInterface = {
  huge: "5",
  large: "4",
  normal: "3",
  medium: "2",
  small: "0.2",
};

const shapeType: SizeInterface = {
  round: "full",
  default: "md",
};

interface Props {
  ref?: (node?: Element | null) => void;
  className?: string;
  size?: "large" | "medium" | "normal" | "small" | "huge"
  loading: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  type: "button" | "submit";
  color: ColorType;
  shape?: "round" | "default";
  minW?: "fit" | "full";
  onClick?: () => void;
}

const ButtonInput: React.FC<Props> = ({
  ref,
  type,
  size,
  shape,
  color,
  icon,
  loading,
  children,
  className,
  onClick,
  minW,
}) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 15, color: "#ffff" }} spin />
  );
  return (
    <>
      <button
        ref={ref}
        type={loading ? "button" : type}
        onClick={onClick}
        disabled={loading ? true : false}
        className={
          className +
          `
           rounded-${shapeType[String(shape ?? "default")]}
           inline-flex 
           items-center 
           justify-center 
           min-w-${minW ?? "fit"}
           w-full
           px-4 
           py-${sizeType[String(size ?? "normal")]} 
           text-sm 
           font-semibold 
           leading-3
           text-center  
           text-white 
           transition-all 
           duration-200 
           bg-${loading ? "blue" : color}-${loading ? "200" : "600"}
           border-1
           border-transparent
           focus:outline-none 
           focus:ring-2 
           focus:ring-offset-2 
           focus:ring-${color}-500
           hover:bg-${color}-${loading ? "200" : "700"}
        `
        }
      >
        {loading ? (
          <Spin indicator={antIcon} className="mr-2 h-3 w-3" />
        ) : (
          <>
            {icon ? <span className="mr-1">{icon}</span> : null}
            {children}
          </>
        )}
      </button>
    </>
  );
};

export { ButtonInput };
