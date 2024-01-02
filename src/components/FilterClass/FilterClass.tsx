"use client";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import Image from "next/image";

export default function FilterClass({
  title,
  onClick,
}: {
  title: string;
  onClick: (event: any) => void;
}) {
  const [pressedButton, setPressedButton] = useState(false);

  const toggleButton = () => {
    setPressedButton(!pressedButton);
    onClick({ target: { value: title } }); // Appel de la fonction onClick avec le titre en paramètre
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
}
