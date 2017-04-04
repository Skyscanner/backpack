import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><circle cx="12" cy="12" r="8" /><rect width="2" height="6" x="11" y="7" rx="1" ry="1" /><circle cx="12" cy="16" r="1" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}