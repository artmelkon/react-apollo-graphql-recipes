import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "@apollo/client/react/components";

import { GET_USER_RECIPES, DELETE_USER_RECIPE } from "../../queries";

const UserRecipes = ({ username }) => {
  const handleDelet = (deleteUserRecipe) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmDelete) {
      deleteUserRecipe().then(({ data }) => console.log(data));
    }
  };
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        console.log(data);
        return (
          <div>
            <h3>Your Recipes</h3>
            <ul>
              {data.getUserRecipes.map((recipe) => (
                <li key={recipe._id}>
                  <Link to={`/recipe/${recipe._id}`}>
                    <h5>{recipe.name}</h5>
                  </Link>
                  <p>Likes: {recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                  >
                    {(deleteUserRecipe) => {
                      return (
                        <p
                          className="delete-button"
                          onClick={() => handleDelet(deleteUserRecipe)}
                        >
                          X
                        </p>
                      );
                    }}
                  </Mutation>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};
export default UserRecipes;
