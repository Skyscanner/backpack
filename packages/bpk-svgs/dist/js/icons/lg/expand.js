import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M3 14.672l.112 4.458a1.799 1.799 0 0 0 1.757 1.758L9.328 21a1.213 1.213 0 0 0 .06-2.425l-2.193-.055 3.928-3.928a1.214 1.214 0 0 0-1.715-1.715L5.48 16.805l-.055-2.193a1.213 1.213 0 0 0-2.425.06zm18-5.344l-.113-4.458a1.799 1.799 0 0 0-1.757-1.758L14.672 3a1.213 1.213 0 0 0-.06 2.425l2.193.055-3.928 3.928a1.214 1.214 0 0 0 1.715 1.715l3.928-3.928.055 2.193A1.213 1.213 0 0 0 21 9.328z" /></svg>;
  }

}