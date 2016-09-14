import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...this.props}><path d="M20.2 6H3.8C2.3 6 1.4 7.7 2.5 8.9l8.2 8.6c.7.8 2 .8 2.7 0l8.2-8.6c1-1.2.1-2.9-1.4-2.9z" /></svg>;
  }

}