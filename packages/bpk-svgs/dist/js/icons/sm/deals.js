import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M19 7h-2.2c.1-.3.2-.7.2-1 0-1.7-1.4-3-3-3-.7 0-1.4.3-2 .8-1.2-1.1-3.1-1-4.2.3-.7.8-1 1.9-.6 2.9H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-5-2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM9 6c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm10 13H5V9h14v10zm-7-9l1.2 2.6 2.8.4-2 2 .5 2.9-2.5-1.3L9.5 18l.5-2.9-2-2 2.8-.4L12 10z" /></svg>;
  }

}