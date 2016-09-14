import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M1 6.5c0 .4.2.8.5 1.1l5.2 4.5c1.3 1.1 3.3 1.1 4.6 0l5.2-4.5c.6-.5.7-1.5.1-2.1-.5-.6-1.5-.7-2.1-.1L9.3 9.9c-.1.1-.5.1-.6 0L3.5 5.4c-.6-.6-1.6-.5-2.1.1-.3.3-.4.6-.4 1z" /></svg>;
  }

}