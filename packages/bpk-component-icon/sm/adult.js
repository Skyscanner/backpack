import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9 4c.8 0 1.5-.7 1.5-1.5S9.8 1 9 1s-1.5.7-1.5 1.5S8.2 4 9 4zm-2.4 7c0 .2.2.4.4.4h.4L8 17h2l.6-5.6h.4c.2 0 .4-.2.4-.4l.6-4.2c.1-1-.6-1.8-1.6-1.8H7.6c-.9 0-1.7.9-1.6 1.8l.6 4.2z" /></svg>;
  }

}