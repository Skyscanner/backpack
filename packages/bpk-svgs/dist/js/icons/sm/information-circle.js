import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9 1C4.6 1 1 4.6 1 9s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12.4c0 .3-.3.6-.6.6h-.8c-.3 0-.6-.3-.6-.6V8.6c0-.3.3-.6.6-.6h.7c.4 0 .7.3.7.6v4.8zm0-8.1c0 .4-.3.7-.7.7h-.6c-.4 0-.7-.3-.7-.7v-.6c0-.4.3-.7.7-.7h.7c.3 0 .6.3.6.7v.6z" /></svg>;
  }

}