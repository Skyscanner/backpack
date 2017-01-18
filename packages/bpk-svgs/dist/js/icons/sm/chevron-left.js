import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M4.9 9l4.8-5.4c.4-.5 1.1-.5 1.6-.1s.5 1.1.1 1.6L7.9 9l3.5 3.9c.4.5.4 1.2-.1 1.6s-1.2.4-1.6-.1L4.9 9z" /></svg>;
  }

}