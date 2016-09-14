import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M15.5 4h-13c-1.3 0-2 1.5-1.1 2.4l6.5 7.1c.6.7 1.6.7 2.2 0l6.5-7.1c.9-.9.2-2.4-1.1-2.4z" /></svg>;
  }

}