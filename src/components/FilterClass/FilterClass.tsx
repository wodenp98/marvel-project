"use client";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import Image from "next/image";

export const FilterClassWrapper = ({
  title,
  onClick,
  isSelected,
}: {
  title: string;
  onClick: (event: any) => void;
  isSelected: boolean;
}) => {
  const [pressedButton, setPressedButton] = useState(isSelected);

  useEffect(() => {
    setPressedButton(isSelected);
  }, [isSelected]);

  const toggleButton = () => {
    setPressedButton(!pressedButton);
    onClick({ target: { value: title } });
  };

  return (
    <Toggle
      aria-label="Toggle"
      pressed={pressedButton}
      onPressedChange={toggleButton}
    >
      {pressedButton ? (
        <Image
          src={`/assets/${title}-colored.svg`}
          alt={title}
          width={30}
          height={30}
        />
      ) : (
        <Image
          src={`/assets/${title}.svg`}
          alt={title}
          width={30}
          height={30}
        />
      )}
    </Toggle>
  );
};
