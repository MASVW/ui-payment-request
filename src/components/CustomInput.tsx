import { Label, Textarea, TextInput, Select, Datepicker } from "flowbite-react";

interface OptionItem {
  value: string;
  label: string;
}

interface CustomInputInterface {
  id: string;
  disable?: boolean;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  data?: OptionItem[];
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function CustomInput({ id, disable = false, label, type, placeholder, required = false, data = [], value, onChange }: CustomInputInterface) {
  let inputComponent;

  if (type === "textArea") {
    inputComponent = (
      <Textarea name={id} disabled={disable} id={id} placeholder={placeholder} required={required} rows={4} value={value} onChange={onChange} />
    );
  } else if (type === "select") {
    inputComponent = (
      <Select name={id} disabled={disable} id={id} required={required} value={value} onChange={onChange}>
        <option value="">Please select an option</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    );
  } else if (type === "date") {
    inputComponent = (
      <Datepicker showClearButton={true} showTodayButton={true} />
    )
  }
  else if (type === "twoInput") {
    inputComponent = (
      <div className="flex flex-row gap-x-5">
        <div className="flex-1/3">
          {Array.isArray(data) && data.length > 0 ? (
            <Select name={`${id}Select`} id={id} required={required} value={value} onChange={onChange}>
              <option value="">{placeholder}</option>
              {data.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          ) : (
            <TextInput
              name={`${id}Select`}
              id={id}
              type="text"
              placeholder={placeholder}
              required={required}
              value={value}
              onChange={onChange}
            />
          )}
        </div>
        <div className="flex-2/3">
          <TextInput
            name={`${id}Input`}
            id={id}
            type="text"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
  else {
    inputComponent = (
      <TextInput
        name={id} disabled={disable} id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {inputComponent}
    </div>
  );
}
