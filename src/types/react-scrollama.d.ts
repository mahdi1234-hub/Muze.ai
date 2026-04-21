declare module "react-scrollama" {
  import * as React from "react";

  export interface StepProps<T = unknown> {
    data?: T;
    children?: React.ReactNode;
  }

  export interface CallbackResponse<T = unknown> {
    data: T;
    direction: "up" | "down";
    entry: IntersectionObserverEntry;
    element: HTMLElement;
  }

  export interface ScrollamaProps {
    children?: React.ReactNode;
    offset?: number | string;
    threshold?: number;
    debug?: boolean;
    onStepEnter?: (response: CallbackResponse<number>) => void;
    onStepExit?: (response: CallbackResponse<number>) => void;
    onStepProgress?: (response: CallbackResponse<number> & { progress: number }) => void;
    rootMargin?: string;
  }

  export const Scrollama: React.FC<ScrollamaProps>;
  export function Step<T = unknown>(props: StepProps<T>): React.ReactElement;
}
