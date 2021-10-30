import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "@apollo/client/react/components";
import _ from "lodash";

import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
} from "../../queries";

const UserRecipes = ({ username }) => {
  const handleDelete = (deleteUserRecipe) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmDelete) {
      deleteUserRecipe()
    }
  };
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        // console.log(data);
        return (
          <div>
            <h3>Your Recipes</h3>
            <ul>
              {_.map(data.getUserRecipes, (recipe) => (
                <li key={recipe._id}>
                  <Link to={`/recipe/${recipe._id}`}>
                    <h5>{recipe.name}</h5>
                  </Link>
                  <p>Likes: {recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPES},
                      { query: GET_CURRENT_USER, variables: { username }  },
                    ]}
                    update={(client, { data: { deleteUserRecipe } }) => {
                      // console.log(client, data);
                      const { getUserRecipes } = client.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                      });

                      client.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            (recipe) => recipe._id !== deleteUserRecipe._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs) => {
                      return (
                        <p
                          className="delete-button"
                          onClick={handleDelete.bind(null, deleteUserRecipe)}
                        >
                          {attrs.loading ? "deleting..." : "X"}
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
