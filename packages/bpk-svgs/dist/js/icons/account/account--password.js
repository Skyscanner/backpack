import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M11.58 9a5 5 0 1 0 0 4H16v3h2v-3h2v3h2V9zM7 12.83a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}