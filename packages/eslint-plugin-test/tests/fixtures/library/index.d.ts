import React from "react";

export interface ImageProps {
  readonly src: string;
  readonly alt: string;
}

export interface DialogProps {
  readonly title?: string | ImageProps;
}

export const Dialog: React.FC<DialogProps>;