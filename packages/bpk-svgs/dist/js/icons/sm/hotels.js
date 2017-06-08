import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M8 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m11-3.9h-6c-1.1 0-2 .9-2 2V12h10v-1.9c0-1.1-.9-2-2-2m3 5.9c0-.6-.4-1-1-1H5V5.5C5 4.7 4.3 4 3.5 4S2 4.7 2 5.5v13c0 .8.7 1.5 1.5 1.5S5 19.3 5 18.5V16h14v2.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V14z" /></svg>;
  }

}