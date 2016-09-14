import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M7.5 5.5C7.5 4.7 8.2 4 9 4s1.5.7 1.5 1.5S9.8 7 9 7s-1.5-.7-1.5-1.5zM7.8 8c-.7 0-1.3.6-1.3 1.3v3.2c0 .2.2.4.4.4h.4l.9 4.1h1.7l.8-4.2h.4c.2 0 .4-.2.4-.4V9.3c0-.7-.6-1.3-1.2-1.3H7.8z" /></svg>;
  }

}