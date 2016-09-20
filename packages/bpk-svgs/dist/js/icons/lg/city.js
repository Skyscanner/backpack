import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M9 7.5V20h7V7.5C16 5.6 14.4 4 12.5 4S9 5.6 9 7.5zM12 18h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm3 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm2-.5V20h2v-2h1v2h2V9.5C22 8.1 20.9 7 19.5 7S17 8.1 17 9.5zm3 5.5h-1v-2h1v2zm0-4h-1V9h1v2zM2 9v11h2v-2h2v2h2V9H2zm2 6H3v-1h1v1zm0-3H3v-1h1v1zm3 3H6v-1h1v1zm0-3H6v-1h1v1z" /></svg>;
  }

}