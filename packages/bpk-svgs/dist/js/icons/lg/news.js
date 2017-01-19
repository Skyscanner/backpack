import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M21 7v10.1c0 .7-.3.9-.9.9V5H3.7c-.9 0-1.6.7-1.6 1.6V19h18.4c.8 0 1.5-.7 1.5-1.5V7h-1zm-10 9H4v-5h7v5zm6-2h-5v-1h5v1zm0-2h-5v-1h5v1zm1-3H4V7h14v2z" /></svg>;
  }

}