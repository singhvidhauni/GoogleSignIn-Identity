import React, { Component } from "react";
import axios from "axios";

class GoogleLogin extends Component {
  state = {
    isAuthenticated: false,
    profileImage: null,
    name: "",
  };
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = this.signInWithGoogle;
    document.body.appendChild(script);
  }
  signInWithGoogle = () => {
    const SCOPES = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" ");
    let params = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: this.handleCredentialResponse,
      scope: SCOPES,
      ux_mode: "popup",
      error_callback: this.handleErrorResponse,
    };
    const client = window.google.accounts.oauth2.initTokenClient(params);
    window.google.accounts.id.initialize(params);
    client.requestAccessToken();
  };

  handleCredentialResponse = (credentialResponse) => {
    this.getUserInfo(credentialResponse.access_token);
  };
  getUserInfo = async (accessToken) => {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const { name, picture } = response.data;
    this.setState({
      isAuthenticated: true,
      profileImage: picture,
      name: `<strong>${name}</strong> Signed In!`,
    });
  };
  handleErrorResponse = (error) => {
    if (error.type.toLowerCase() === "popup_closed") {
      //console.log("popup window closed");
    }
  };
  handleSignOutClick = () => {
    window.google.accounts.id.disableAutoSelect();
    window.google.accounts.id.prompt();
    this.setState({
      isAuthenticated: false,
      profileImage: null,
      name: "",
    });
  };

  render() {
    return (
      <div>
        {this.state.profileImage && this.state.name ? (
          <img
            className="ui avatar image"
            src={this.state.profileImage}
            data-src={this.state.profileImage}
            alt="display profile"
          />
        ) : null}

        <span dangerouslySetInnerHTML={{ __html: this.state.name }} />
        <div className="ui divider hidden">
          <button
            onClick={this.signInWithGoogle}
            disabled={this.state.isAuthenticated}
          >
            Google SignIn
          </button>
          <button onClick={this.handleSignOutClick}>Sign Out</button>
        </div>
      </div>
    );
  }
}
export default GoogleLogin;
