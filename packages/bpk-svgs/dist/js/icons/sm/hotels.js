import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M5.5 9C4.7 9 4 8.3 4 7.5S4.7 6 5.5 6 7 6.7 7 7.5 6.3 9 5.5 9M14 6h-4C8.9 6 8 7 8 8.1V9h8v-.9C16 7 15.1 6 14 6m3 8v-3c0-.6-.4-1-1-1H3V4c0-.5-.4-1-1-1-.5 0-1 .4-1 1v10c0 .6.4 1 1 1s1-.4 1-1v-2h12v2c0 .6.4 1 1 1s1-.4 1-1z" /></svg>;
  }

}