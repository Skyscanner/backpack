import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm2 16.5h-4v-2h4v2zm3-6h-3v3h-4v-3H7c-.4 0-.6-.5-.4-.8l5-6.7c.2-.3.6-.3.8 0l5 6.7c.2.3 0 .8-.4.8z" /></svg>;
  }

}