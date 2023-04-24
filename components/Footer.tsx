import { FC } from "react";
import Form from "./Form";
import { Transition } from "react-transition-group";

interface FooterProps {
  show: boolean;
}

const duration = 300;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: "translateY(100%)",
};

const transitionStyles: Record<string, React.CSSProperties> = {
  entering: { transform: "translateY(100%)" },
  entered: { transform: "translateY(0)" },
  exiting: { transform: "translateY(100%)" },
  exited: { transform: "translateY(100%)" },
};

export const Footer: FC<FooterProps> = ({ show }) => {
  return (
    <Transition in={show} timeout={duration} unmountOnExit>
      {(state) => (
        <div
          className="flex flex-col min-h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="hidden sm:flex"></div>
          <h1 className="text-2xl font-bold">Get updates</h1>
          <p className="text-sm text-gray-500 mb-4">new AI tools for Christians</p>
          <Form />
          <div className="flex space-x-4"></div>
        </div>
      )}
    </Transition>
  );
};
