import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M3 21v-3.1c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5V21H3zM16 7c0-2.2-1.8-4-4-4S8 4.8 8 7s1.8 4 4 4 4-1.8 4-4z" /></svg>;
  }

}