import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M22 12c0 .6-.5 1-1 1v1.5c0 .8-.7 1.5-1.5 1.5-.2 0-.3 0-.5-.1V8.1c.2-.1.3-.1.5-.1.8 0 1.5.7 1.5 1.5V11c.5 0 1 .4 1 1zM3 9.5V11c-.5 0-1 .4-1 1s.5 1 1 1v1.5c0 .8.7 1.5 1.5 1.5.2 0 .3 0 .5-.1V8.1C4.8 8 4.7 8 4.5 8 3.7 8 3 8.7 3 9.5zM16 6c-1.1 0-2 .9-2 2v3h-4V8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-3h4v3c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z" /></svg>;
  }

}