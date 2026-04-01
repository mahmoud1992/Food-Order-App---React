import React from "react";

function Button({ children, textOnly, className, ...rest }) {
  const cssClasses = textOnly ? `text-button ${className}` : `button`;

  return (
    <button className={cssClasses} {...rest}>
      {children}
    </button>
  );
}

export default Button;
