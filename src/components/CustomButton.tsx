import { Button } from "flowbite-react";

interface CustomButtonProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: string,
  onClick?: any
}

export function CustomButton({ name, size, type, onClick}: CustomButtonProps) {
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
            <Button size={size} onClick={onClick}>{name}</Button>
          </div>
        )
      } 
      
    </>
  );
}
