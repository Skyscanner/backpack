import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12.025 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 15a7.983 7.983 0 0 1-6.241-3.008c.609-1.218 1.524-2.256 2.691-3.105l.005-.003A4.629 4.629 0 0 1 11.202 13h1.642c.981 0 1.938.311 2.732.888 1.167.849 2.083 1.886 2.691 3.104A7.985 7.985 0 0 1 12.025 20z" /></svg>;
  }

}