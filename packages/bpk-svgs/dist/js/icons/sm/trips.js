import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M20.97 6.91l-1.564 8.864a1.99 1.99 0 0 1-.534 1.045L17.31 7.966a3.497 3.497 0 0 0-4.054-2.84l-5.339.942.25-1.415a2 2 0 0 1 2.317-1.622l8.863 1.562a2 2 0 0 1 1.622 2.317zm-3.574 10.18a2 2 0 0 1-1.622 2.316L6.91 20.97a2 2 0 0 1-2.317-1.622l-1.562-8.863a2 2 0 0 1 1.622-2.317l8.863-1.563a2 2 0 0 1 2.317 1.622zm-6.43-1.918l-.348-1.97-4.924.869.347 1.97zm3.244-4.634l-.347-1.97-8.864 1.563.348 1.97z" /></svg>);