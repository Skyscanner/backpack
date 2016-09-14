import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M15 11V8c0-3.3-2.7-6-6-6S3 4.7 3 8v3c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2V8c0-2.2 1.8-4 4-4s4 1.8 4 4v8h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1zm-8.5 0c-.3 0-.5.2-.5.5v4c0 .3.2.5.5.5s.5-.2.5-.5v-4c0-.3-.2-.5-.5-.5zm5 0c-.3 0-.5.2-.5.5v4c0 .3.2.5.5.5s.5-.2.5-.5v-4c0-.3-.2-.5-.5-.5z" /></svg>;
  }

}