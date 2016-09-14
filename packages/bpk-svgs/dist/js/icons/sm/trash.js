import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M4 6v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6H4zm.938-3.001h8.125c1.105 0 2.002.896 2.002 2.002H2.936c0-1.106.896-2.002 2.002-2.002zM7 2c0-.55.45-1 1-1h2c.55 0 1 .45 1 1" /></svg>;
  }

}