import React from "react";
import ReactDOM from "react-dom";

export default function Portal(props: any) {
  const el = React.useMemo(() => document.createElement("div"), []);
  React.useEffect(() => {
    const target = props.parent && props.parent.appendChild ? props.parent : document.body;
    const classList = ["portal-container"];
    if (props.className) props.className.split(" ").forEach((item: any) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el, props.parent, props.className]);
  return ReactDOM.createPortal(props.children, el);
}
