import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12.52 11.29a1 1 0 0 0 1.41 0L19 6.23V9a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.4l-4.88 4.88a1 1 0 0 0 0 1.41zm-1 1.41a1 1 0 0 0-1.41 0L5 17.77V15a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H6.6l4.88-4.88a1 1 0 0 0 0-1.41z" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}