import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15.3 3h-2.5c-.4 0-.8.2-1 .5L2 15h9.9L16 4c.1-.5-.2-1-.7-1z" /></svg>;
  }

}