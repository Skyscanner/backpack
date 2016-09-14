import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...this.props}><path d="M18 3.8v16.3c0 1.6-1.7 2.4-2.9 1.4l-8.6-8.2c-.8-.7-.8-2 0-2.7l8.6-8.2c1.2-1 2.9-.1 2.9 1.4z" /></svg>;
  }

}