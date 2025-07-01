import { Button } from "flowbite-react";

interface CustomButtonProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: string
}

export function CustomButton({ name, size, type}: CustomButtonProps) {
  return (
    <>
      {
        type === "submit" ?
        (
          <div className="flex flex-wrap items-start gap-2">
            <Button size={size} type="submit">{name}</Button>
          </div> 
        )
        :
        (
          <div className="flex flex-wrap items-start gap-2">
            <Button size={size}>{name}</Button>
          </div>
        )
      } 
      
    </>
  );
}
