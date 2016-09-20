import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M2 9c0 .5.2 1.1.7 1.5L9.1 16c1.6 1.4 4.2 1.4 5.9 0l6.4-5.5c.8-.7.9-2 .2-2.8-.7-.8-2-.9-2.8-.2L12.3 13c-.1.1-.5.1-.6 0L5.3 7.5c-.8-.7-2.1-.6-2.8.2C2.2 8 2 8.5 2 9z" /></svg>;
  }

}