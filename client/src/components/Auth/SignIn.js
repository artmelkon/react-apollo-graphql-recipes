import React from "react";
import { withRouter } from 'react-router-dom';
import { Mutation } from "@apollo/client/react/components";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButton/CustomButton.component";
import Error from "../Error";
import { SIGNIN_USER } from "../../queries/index";

const initialState = {
  username: "",
  password: "",
};

class SignIn extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event, signinUser) => {
    event.preventDefault();

    signinUser().then(async ({ data }) => {
      // console.log('login user ', data);
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch()
      this.clearState();
      this.props.history.push('/')
    })

  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2 className="App">Sign In</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, signinUser)}
              >
                <FormInput
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  required
                  onChange={this.handleChange}
                />
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={this.handleChange}
                />
                <CustomButton
                  type="submit"
                  disabled={loading || this.validateForm()}
                >
                  sign in
                </CustomButton>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignIn);
