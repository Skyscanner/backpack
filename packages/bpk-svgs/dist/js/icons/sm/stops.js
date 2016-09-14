import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M16.6 8.7L11.8 6c-.4-.2-.8.1-.8.5v1.9H9.3c-.3-.6-1-1-1.7-1s-1.4.4-1.7 1H2c-.6 0-1 .4-1 1s.4 1 1 1h3.9c.3.6 1 1 1.7 1s1.4-.4 1.7-1H11v1.9c0 .4.4.7.8.5l4.8-2.7c.5-.3.5-1.1 0-1.4zm-9 1.7c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" /></svg>;
  }

}