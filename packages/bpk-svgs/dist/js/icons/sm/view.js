import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M16.7 8.1C15.1 5.6 12.2 4 9 4S2.9 5.6 1.3 8.1c-.4.6-.4 1.3 0 1.8C2.9 12.4 5.8 14 9 14s6.1-1.6 7.7-4.1c.4-.5.4-1.3 0-1.8zM9 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm1.5-3c0 .8-.7 1.5-1.5 1.5S7.5 9.8 7.5 9 8.2 7.5 9 7.5s1.5.7 1.5 1.5z" /></svg>;
  }

}