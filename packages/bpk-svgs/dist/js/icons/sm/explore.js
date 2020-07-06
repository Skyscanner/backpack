import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5zm3.415-14.66a.577.577 0 0 1 .745.745l-3.19 8.295a.577.577 0 0 1-.978.167.562.562 0 0 1-.086-.158l-1.019-2.59a2.1 2.1 0 0 0-1.186-1.186l-2.59-1.019a.562.562 0 0 1-.158-.086.577.577 0 0 1 .167-.978l8.295-3.19z" clipRule="evenodd" /></svg>);