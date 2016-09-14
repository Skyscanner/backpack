import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15.1 4H2.9C1.9 4 1 4.9 1 5.9v7.2c0 1 .9 1.9 1.9 1.9h12.2c1.1 0 1.9-.9 1.9-1.9V5.9c0-1-.9-1.9-1.9-1.9zm.9 9.1c0 .5-.4.9-.9.9H2.9c-.5 0-.9-.4-.9-.9V9h14v4.1zM2 7V5.9c0-.5.4-.9.9-.9h12.2c.5 0 .9.4.9.9V7H2zm1 4h2v2H3v-2z" /></svg>;
  }

}