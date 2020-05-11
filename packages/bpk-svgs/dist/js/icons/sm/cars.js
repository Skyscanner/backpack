import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M6 14a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 016 14zm12 0a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0118 14zM9.854 7.5a8.552 8.552 0 012.872.45 15.534 15.534 0 013.602 2.466 13.077 13.077 0 014.842 1.1c.54.28.691 1.294.816 2.14.14.946-.812 1.406-1.466 1.638l-.037.017A2.5 2.5 0 1015.54 16H8.45a2.5 2.5 0 10-4.95-.5q0 .09.006.183c-.161-.043-.249-.076-.293-.09a1.815 1.815 0 01-1.185-2.101v-.003l.503-2.868h10.923c.601 0 .842-.595.271-.981a5.71 5.71 0 00-1.326-.72 7.612 7.612 0 00-2.546-.394 13.162 13.162 0 00-2.681.3c-1.157.243-2.692.69-3.658 1.002a.457.457 0 01-.552-.24l-.022-.054-.004-.01a.478.478 0 01.277-.608 27.517 27.517 0 013.76-1.095 14.094 14.094 0 012.88-.32z" /></svg>);