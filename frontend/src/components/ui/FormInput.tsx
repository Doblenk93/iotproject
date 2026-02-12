import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ComponentType } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  className?: string; 
  placeholder: string;
  type: string;
  icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  className = "",
  ...props
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon kiri */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-slate-300 
            ${Icon ? "pl-10" : "pl-3"} 
            ${isPassword ? "pr-10" : "pr-3"} 
            py-2 focus:border-blue-500 focus:ring-blue-500 
            ${className}`}
          {...props}
        />

        {/* Toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default FormInput;