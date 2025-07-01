import { Button } from "flowbite-react";

interface CustomButtonProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function CustomButton({ name, size }: CustomButtonProps) {
  return (
    <div className="flex flex-wrap items-start gap-2">
      <Button size={size}>{name}</Button>
    </div>
  );
}
