import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M7.6 12c-1.2 0-2-1.2-1.4-2.2l4.5-7.2c.6-.9 2-.9 2.5 0l4.5 7.2c.6 1-.2 2.2-1.4 2.2H14v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8H7.6z" /></svg>;
  }

}