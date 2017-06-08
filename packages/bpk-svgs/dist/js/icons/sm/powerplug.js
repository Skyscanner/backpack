import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M20.707 7.716a.999.999 0 0 0-1.414 0l-3.182 3.182-2.828-2.828 3.182-3.182a.999.999 0 1 0-1.414-1.414l-3.182 3.182-1.414-1.414-4.244 4.241a4 4 0 0 0 0 5.657L3.36 17.991l2.828 2.828 2.851-2.851a4 4 0 0 0 5.657 0l4.243-4.243-1.414-1.414 3.182-3.182a.998.998 0 0 0 0-1.413z" /></svg>;
  }

}