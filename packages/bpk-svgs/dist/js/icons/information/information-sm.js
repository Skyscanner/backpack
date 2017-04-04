import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0-13c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-1 5c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1v-4z" /><use width="48" height="48" y="-48" overflow="visible" transform="scale(.5 -.5)" xlinkHref="#material_x5F_system_x5F_icon_x5F_border" /><use width="48" height="48" y="-48" opacity=".15" overflow="visible" transform="scale(.5 -.5)" xlinkHref="#material_x5F_system_x5F_icon_x5F_grid" /><use width="48" height="48" y="-48" overflow="visible" transform="scale(.5 -.5)" xlinkHref="#material_x5F_system_x5F_icon_x5F_keylines" /><path d="M20.627 1.96l1.414 1.413L3.373 22.041 1.96 20.627z" /><path d="M20.626 1.894l.708.707L2.666 21.268l-.708-.707z" /></svg>;
  }

}