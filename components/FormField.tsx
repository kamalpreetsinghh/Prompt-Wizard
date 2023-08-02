"use client";

import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type FormFieldProps = {
  type?: string;
  title?: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  isRequired?: boolean;
  autocapitalize?: boolean;
  errorMessage?: string;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  errorMessage,
  isRequired = false,
  autocapitalize = false,
  setState,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-start flex-col w-full gap-4">
      {title && <label className="w-full">{title}</label>}
      {errorMessage && <span className=" text-red-600">{errorMessage}</span>}

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          required={isRequired}
          value={state}
          className="form_field-input"
          rows={5}
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <>
          {type === "password" ? (
            <div className="w-full flex items-center relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                required={isRequired}
                value={state}
                autoCapitalize={autocapitalize ? "words" : "off"}
                className={`form_field-input`}
                onChange={(e) => setState(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-0 mx-3"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {state &&
                  (showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />)}
              </button>
            </div>
          ) : (
            <input
              type={type || "text"}
              placeholder={placeholder}
              required={isRequired}
              value={state}
              autoCapitalize={autocapitalize ? "words" : "off"}
              className={`form_field-input ${autocapitalize && "capitalize"}`}
              onChange={(e) => setState(e.target.value)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FormField;
