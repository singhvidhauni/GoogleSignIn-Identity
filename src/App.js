// src/index.js or src/App.js

import React from "react";
import GoogleLogin from "./GoogleLogin";

const App = () => {
  return (
    <div className="ui container hidden divider">
      <h3 className="ui header">React Google SignIn App</h3>
      <GoogleLogin />
    </div>
  );
};

export default App;
