import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M9.126 7.137a12.91 12.91 0 011.404-.527c-.073.022-.369-1.287-.761-1.23-.296.044-.651.993-.903 1.224a.173.173 0 00-.068.099.168.168 0 00.056.12z" /><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.552 8.887c-1.483.246-3.16.682-4.552.113l-2 .083c-.13.725-.544 1.022-1.104 1.5-.188.161-.66.342-.771.563a1.377 1.377 0 00-.23.732 4.283 4.283 0 00.804 2.259 1.99 1.99 0 002.16.706c.56-.217.376.064.974.115.445.038.479.329.625.75s.671.081.67.528a11.199 11.199 0 00.157 1.75c-.095.003-.189.014-.285.014a8 8 0 01-.015-16 1.521 1.521 0 00-.497 1.496 1.96 1.96 0 01.188.583c.004.78-1.538.805-1.529 1.585a1.663 1.663 0 01.022.36c-.102.483-.97.177-1.276.564l-.054.968a1.696 1.696 0 001.63-.166 10.505 10.505 0 011.473-.871.423.423 0 01.391.001c.155.114.11.35.134.54.065.498.672.726 1.174.706a4.407 4.407 0 011.495-.032c.48.15.811.842.416 1.153zm.451 1.84a.407.407 0 01-.022-.266.43.43 0 01.267-.207l1.264-.514a9.275 9.275 0 00.852 2.181.685.685 0 00.247.295.715.715 0 00.48.016l.618-.124a7.933 7.933 0 01-.514 1.367 4.928 4.928 0 01-3.192-2.747z" /></svg>);