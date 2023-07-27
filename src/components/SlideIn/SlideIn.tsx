import { ReactNode } from "react";
import { useSpring, animated } from "react-spring";

type Props = {
  children: ReactNode;
};

export const SlideIn: React.FC<Props> = ({ children }) => {
  const animatedProps = useSpring({
    opacity: 1,
    marginTop: 5,
    from: { marginTop: -50, opacity: 0 },
    config: { mass: 1, tension: 50 },
  });

  return <animated.div style={{ ...animatedProps }}>{children}</animated.div>;
};
