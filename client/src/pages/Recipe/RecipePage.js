import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "@apollo/client/react/components";

import { GET_RECIPE } from "../../queries";
import LikeRecipe from "../../components/Recipe/LikeRecipe";
import withAuth from '../../components/Auth/withAuth';

const RecipePage = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Losding...</p>;
        if (error) return <p>Error</p>;
        return (
          <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description: {data.getRecipe.description}</p>
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created by: {data.getRecipe.username}</p>
            <LikeRecipe _id={_id} />
          </div>
        );
      }}
    </Query>
  );
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(RecipePage));
