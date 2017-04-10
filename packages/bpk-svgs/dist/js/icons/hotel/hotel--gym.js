import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M22 12c0 .55-.45 1-1 1v1.5c0 .825-.675 1.5-1.5 1.5a1.46 1.46 0 0 1-.5-.093V8.093A1.46 1.46 0 0 1 19.5 8c.825 0 1.5.675 1.5 1.5V11c.55 0 1 .45 1 1zM3 9.5V11c-.55 0-1 .45-1 1s.45 1 1 1v1.5c0 .825.675 1.5 1.5 1.5.176 0 .343-.036.5-.093V8.093A1.46 1.46 0 0 0 4.5 8C3.675 8 3 8.675 3 9.5zM16 6c-1.1 0-2 .9-2 2v3h-4V8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-3h4v3c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z" /></svg>;
  }

}