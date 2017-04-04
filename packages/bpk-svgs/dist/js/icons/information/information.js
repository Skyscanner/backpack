import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12 22A10 10 0 1 0 2 12a10 10 0 0 0 10 10zm0-16a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-1 5a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0z" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}