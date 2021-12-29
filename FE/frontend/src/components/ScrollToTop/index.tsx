import React, { FC, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import {
  useComponentDidMount,
  useComponentWillUnmount,
} from "../../utils/customHooks";

import "./styles.css";

const ScrollToTop: FC<{}> = ({}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const listenerFunc = () => {
    if (!visible) {
      const winScroll =
        document.body.scrollTop ||
        document.querySelector(".vehicle-container")!.scrollTop;

      const height =
        document.querySelector(".vehicle-container")!.scrollHeight -
        document.querySelector(".vehicle-container")!.clientHeight;

      const scrolled = (winScroll / height) * 1000;

      if (scrolled > 2) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  };

  useComponentDidMount(() => {
    document
      .querySelector(".vehicle-container")!
      .addEventListener("scroll", listenerFunc);
  });

  useComponentWillUnmount(() => {
    document
      .querySelector(".vehicle-container")!
      .removeEventListener("scroll", listenerFunc);
  });

  // This function will scroll the window to the top
  const scrollToTop = () => {
    document.querySelector(".vehicle-container")!.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        className="scroll-to-top"
        style={{ display: visible ? "block" : "none" }}
      >
        <FaArrowCircleUp size={50} />
      </div>
    </>
  );
};

export default ScrollToTop;
