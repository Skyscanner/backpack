import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M22 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6zm-5.21-.78l-2.29 2.35 1.23 5.2a.44.44 0 0 1-.11.45l-.34.34a.51.51 0 0 1-.78-.11l-1.79-4-2.07 2.07.45 1.29a.46.46 0 0 1-.11.45l-.73.84-.9-2.35L7 13.81l.84-.73a.44.44 0 0 1 .45-.08l1.29.45 2.07-2.07-4-1.79a.51.51 0 0 1-.11-.78l.34-.34a.44.44 0 0 1 .45-.11l5.09 1.12 2.35-2.29a.75.75 0 1 1 1.06 1.06z" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}