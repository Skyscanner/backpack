import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M7.5 2.5V9H5.3c-1 0-1.6 1-1.1 1.7L8 16.4c.5.7 1.6.7 2.1 0l3.8-5.7c.4-.7-.2-1.7-1.2-1.7h-2.2V2.5C10.5 1.7 9.8 1 9 1s-1.5.7-1.5 1.5z" /></svg>;
  }

}