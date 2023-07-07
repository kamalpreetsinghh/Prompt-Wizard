type FormFieldProps = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  isRequired?: boolean;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  isRequired = false,
  setState,
}: FormFieldProps) => {
  return (
    <div className="flex-start flex-col w-full gap-4">
      <label className="w-full">{title}</label>

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
        <input
          type={type || "text"}
          placeholder={placeholder}
          required={isRequired}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
