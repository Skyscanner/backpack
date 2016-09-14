import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M13.566 3.076A6.047 6.047 0 0 0 9 1a6.047 6.047 0 0 0-4.566 2.076c-2.103 2.406-1.844 5.878.457 8.425l3.58 4.281a.751.751 0 0 0 1.057-.001l3.58-4.281c2.302-2.546 2.561-6.018.458-8.424zM9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-7C7.346 4 6 5.346 6 7s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 9 8.5z" /></svg>;
  }

}