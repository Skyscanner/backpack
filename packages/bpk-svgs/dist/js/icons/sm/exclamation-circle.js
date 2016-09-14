import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M9 17c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zM8 4.6c0-.3.3-.6.6-.6h.7c.4 0 .7.3.7.6v4.7c0 .4-.3.7-.6.7h-.8c-.3 0-.6-.3-.6-.6V4.6zm0 8.1c0-.4.3-.7.7-.7h.7c.3 0 .6.3.6.7v.7c0 .3-.3.6-.7.6h-.6c-.4 0-.7-.3-.7-.7v-.6z" /></svg>;
  }

}