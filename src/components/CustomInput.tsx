import { Label, Textarea, TextInput, Select } from "flowbite-react";

interface OptionItem {
    value: string;
    label: string;
  }

interface CustomInputInterface {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  data?: OptionItem[];
}

export function CustomInput({id, label, type, placeholder, required = false, data=[]}: CustomInputInterface) {
  let inputComponent;

  if (type === "textArea") {
    inputComponent = (
      <Textarea id={id} placeholder={placeholder} required={required} rows={4} />
    );
  } else if (type === "select") {
    inputComponent = (
        <Select id={id} required={required}>
        <option value="">Please select an option</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    );
  } else if (type === "twoInput") {
    inputComponent = (
      <div className="flex flex-row gap-x-5">
        <div className="flex-1/3">
            {Array.isArray(data) && data.length > 0 ? (
            <Select id={`${id}-select`} required={required}>
                <option value="">{placeholder}</option>
                {data.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
                ))}
            </Select>
            ) : (
            <TextInput
                id={`${id}-input-1`}
                type="text"
                placeholder={placeholder}
                required={required}
            />
            )}
        </div>
        
  
        <div className="flex-2/3">
            <TextInput
            id={`${id}-input-2`}
            type="text"
            placeholder={placeholder}
            required={required}
            />
        </div>
      </div>
    );
  } 
  else {
    inputComponent = (
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
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
