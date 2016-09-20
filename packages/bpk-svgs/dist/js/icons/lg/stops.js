import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M21.5 11l-6.1-4.3c-.6-.4-1.4.1-1.4 1v2.8h-2.4C11.1 9.6 10.1 9 9 9s-2.1.6-2.6 1.5H3.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h2.9c.5.9 1.5 1.5 2.6 1.5s2.1-.6 2.6-1.5H14v2.8c0 .9.8 1.5 1.4 1l6.1-4.3c.7-.4.7-1.6 0-2zM9 13c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" /></svg>;
  }

}