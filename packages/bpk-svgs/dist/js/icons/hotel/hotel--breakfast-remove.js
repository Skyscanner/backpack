import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M18 4.59V4H6v10.1a2.87 2.87 0 0 0 .66 1.82zM2.91 19.67L4.59 18H2a2 2 0 0 0 .91 1.67zM20.37 5l-2 2H20v2.8a2.26 2.26 0 0 1-2 2.2V7.41L8.46 17a2.87 2.87 0 0 0 .44 0h6.2a2.9 2.9 0 0 0 2.9-2.9V14a4.19 4.19 0 0 0 4-4.2V7a2 2 0 0 0-1.63-2zM5.41 20H20a2 2 0 0 0 2-2H7.41zM20.595 2.004l.707.707L2.705 21.308l-.707-.708z" /></svg>;
  }

}