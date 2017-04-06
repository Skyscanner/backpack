import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.81 12.95c.26.26.26.67 0 .93l-.93.93c-.26.26-.67.26-.93 0L12 13.86l-2.95 2.95c-.26.26-.67.26-.93 0l-.93-.93a.652.652 0 0 1 0-.93L10.14 12 7.19 9.05a.652.652 0 0 1 0-.93l.93-.93c.26-.26.67-.26.93 0L12 10.14l2.95-2.95c.26-.26.67-.26.93 0l.93.93c.26.26.26.67 0 .93L13.86 12l2.95 2.95z" /></svg>;
  }

}