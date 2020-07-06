import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12.011 2c.784.009 1.565.096 2.33.26a.781.781 0 0 1 .622.665l.182 1.566c.082.72.715 1.264 1.468 1.264.203 0 .404-.04.59-.12l1.497-.63a.825.825 0 0 1 .907.178 9.96 9.96 0 0 1 2.355 3.89.752.752 0 0 1-.29.847l-1.326.938c-.378.267-.602.69-.602 1.141 0 .451.224.875.603 1.143l1.327.938a.752.752 0 0 1 .29.848 9.965 9.965 0 0 1-2.354 3.889.825.825 0 0 1-.906.179l-1.503-.632a1.53 1.53 0 0 0-1.329.07 1.415 1.415 0 0 0-.728 1.071l-.18 1.566a.78.78 0 0 1-.611.664c-1.548.353-3.16.353-4.707 0a.78.78 0 0 1-.61-.664l-.18-1.563a1.416 1.416 0 0 0-.73-1.068 1.53 1.53 0 0 0-1.327-.071L5.296 19a.825.825 0 0 1-.906-.18 9.964 9.964 0 0 1-2.354-3.893.752.752 0 0 1 .29-.847l1.328-.94c.378-.266.602-.69.602-1.14a1.4 1.4 0 0 0-.602-1.142L2.326 9.92a.752.752 0 0 1-.29-.848 9.96 9.96 0 0 1 2.355-3.889.825.825 0 0 1 .907-.178l1.496.63c.43.182.925.155 1.333-.074a1.42 1.42 0 0 0 .729-1.072l.182-1.565a.781.781 0 0 1 .622-.666c.766-.163 1.548-.25 2.351-.259zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" /></svg>);