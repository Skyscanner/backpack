import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6 12.8L8 15c1.1-.9 2.5-1.5 4-1.5s2.9.6 4 1.5l2-2.2c-1.6-1.4-3.7-2.3-6-2.3s-4.4.9-6 2.3zm4 4.5l2 2.2 2-2.2c-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8zm2-12.8c-3.8 0-7.3 1.4-10 3.8l2 2.2c2.1-1.9 4.9-3 8-3s5.9 1.2 8 3l2-2.2c-2.7-2.4-6.2-3.8-10-3.8z" /></svg>;
  }

}