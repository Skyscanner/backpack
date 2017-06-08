import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM9 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 9 7zm11 10.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V12l3.833 3.833L6.667 17h1l.667-.667 6.166-6.166a1.333 1.333 0 0 1 1.886 0L20 13.783V17.3z" /></svg>;
  }

}