import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...this.props}><path d="M8 15H7v6h1c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm12 0v-4c0-4.4-3.6-8-8-8s-8 3.6-8 8v4c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h1c.6 0 1-.4 1-1v-9c0-3.3 2.7-6 6-6s6 2.7 6 6v9c0 .6.4 1 1 1h1c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-5 1v4c0 .5.5 1 1 1h1v-6h-1c-.6 0-1 .5-1 1z" /></svg>;
  }

}