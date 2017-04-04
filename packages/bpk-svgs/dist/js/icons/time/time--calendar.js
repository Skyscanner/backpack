import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M19 4v2h-4V4H9v2H5V4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zM8 5H6V3h2zm10 0h-2V3h2z" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}