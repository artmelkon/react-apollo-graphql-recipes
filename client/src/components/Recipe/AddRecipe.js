import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "@apollo/client/react/components";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButton/CustomButton.component";
import Error from "../Error";
import withAuth from "../Auth/withAuth";

import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";

const initialState = {
  name: "",
  instructions: "",
  category: "Breakfast",
  description: "",
  username: "",
};

class AddRecipe extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    console.log(this.props.session.getCurrentUser.username);
    this.setState({ username: this.props.session.getCurrentUser.username });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      this.clearState();
      this.props.history.push("/");
    });
  };

  updateCache = async (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    console.log("get query ", getAllRecipes);
    console.log("from cache ", addRecipe);

    try {
      cache.writeQuery({
        query: GET_ALL_RECIPES,
        data: {
          getAllRecipes: [addRecipe, ...getAllRecipes],
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  validateForm = () => {
    const { name, description, instructions } = this.state;

    const isValid = !name || !description || !instructions;
    return isValid;
  };

  render() {
    const { name, category, description, instructions, username } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          category,
          description,
          instructions,
          username,
        }}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Errpr!</p>;
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, addRecipe)}
              >
                <FormInput
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  placeholder="Recipe Name"
                />
                <select name="category" onChange={this.handleChange}>
                  <option value="Breakfest">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <FormInput
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Description"
                />
                <textarea
                  name="instructions"
                  value={instructions}
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                ></textarea>
                <CustomButton
                  type="submit"
                  disabled={loading || this.validateForm()}
                  className="button-primary"
                >
                  Submit
                </CustomButton>
                {error && <Error error={error.message} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));
// export default withRouter(AddRecipe);
