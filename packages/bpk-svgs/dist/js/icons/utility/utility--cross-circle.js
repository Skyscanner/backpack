import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.807 12.946a.657.657 0 0 1 0 .93l-.93.93a.657.657 0 0 1-.93 0L10 11.861l-2.946 2.946a.657.657 0 0 1-.93 0l-.93-.93a.657.657 0 0 1 0-.93L8.139 10 5.193 7.054a.657.657 0 0 1 0-.93l.93-.93a.657.657 0 0 1 .93 0L10 8.139l2.946-2.946a.657.657 0 0 1 .93 0l.93.93a.657.657 0 0 1 0 .93L11.861 10l2.946 2.946z" /></svg>;
  }

}