import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20.61 20.6a1.71 1.71 0 0 1-2.2 0l-4.5-4.5-.1-.2a7 7 0 0 1-2.37.94 5 5 0 0 0-.67-1.91A5 5 0 0 0 10 5a5 5 0 0 0-5 5 5 5 0 0 0 .72 2.58 5 5 0 0 0-1.91.72A7 7 0 0 1 3 10a7 7 0 1 1 14 0 7 7 0 0 1-1.1 3.8c.1 0 .1 0 .2.1l4.5 4.5a1.8 1.8 0 0 1 .01 2.2zM10 17.5A3.5 3.5 0 1 1 6.51 14 3.5 3.5 0 0 1 10 17.5zM9 18v-1H7v-2H6v2H4v1h2v2h1v-2z" /></svg>;
  }

}