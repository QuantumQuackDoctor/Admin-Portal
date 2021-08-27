import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Masonry from "react-masonry-component";
import "./Widgets.css";
/**
 *  Provides a common theme and a toggleDisplay method to child components
 * @param {*} param0
 * @returns
 */
export const Widget = ({ children, title, rows, columns }) => {
  const [display, setDisplay] = useState(true);
  const toggleDisplay = () => {
    setDisplay(!display);
  };
  return (
    <div
      className="Widgets-widget"
      style={{ gridColumn: columns || "auto", gridRow: rows || "auto" }}
    >
      <div
        data-testid="title-bar"
        className="Widgets-title-bar"
        onClick={toggleDisplay}
      >
        {title}
        {display ? (
          <FaAngleUp className="Widgets-display-icon" />
        ) : (
          <FaAngleDown className="Widgets-display-icon" />
        )}
      </div>
      <div
        className="Widgets-children-container"
        data-testid="widget-children"
        style={{
          display: display ? "block" : "none",
        }}
      >
        {[children].flat()}
      </div>
    </div>
  );
};

/**
 *  provides a grid for placing widgets
 * @returns
 */
export const WidgetContainer = ({ children }) => {
  return (
    <Masonry enableResizableChildren={true} options={{ columnWidth: 1 }}>
      {[children].flat()}
    </Masonry>
  );
};
