import React, { useState, useEffect, useCallback } from "react";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";

import withSession from "../withSession";
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from "../../queries";

const LikeRecipe = (props) => {
  const [currentState, setCurrentState] = useState({
    liked: false,
    username: "",
  });

  useEffect(() => {
    if (props.session.getCurrentUser) {
      const { username, favorites } = props.session.getCurrentUser;
      const { _id } = props;
      // console.log("current user: ", username);
      // console.log("current favorites: ", favorites);
      const prevLiked =
        _.findIndex(favorites, (favorite) => favorite._id === _id) > -1;
      setCurrentState({ liked: prevLiked, username });
    }
  }, [props]);

  const handleLike = (likeRecipe, unlikeRecipe) => {
    const { liked } = currentState;
    if (!liked) {
      likeRecipe()
        .then(async ({ data }) => {
          await props.refetch();
        })
        .catch((err) => console.error(err));
    } else {
      unlikeRecipe().then(async ({ data }) => {
        await props.refetch();
      });
    }
    setCurrentState({ ...currentState, liked: !currentState.liked });
  };

  const updateLike = (client, { data: { likeRecipe } }) => {
    const { _id } = props;
    const { getRecipe } = client.readQuery({
      query: GET_RECIPE,
      variables: { _id },
    });

    client.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
      },
    });
  };

  const updateUnlike = (client, { data: { unlikeRecipe } }) => {
    const { _id } = props;
    const { getRecipe } = client.readQuery({
      query: GET_RECIPE,
      variables: { _id },
    });

    client.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: { getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 } },
    });
  };

  const { liked, username } = currentState;
  const { _id } = props;
  return (
    <Mutation
      mutation={UNLIKE_RECIPE}
      variables={{ _id, username }}
      update={updateUnlike}
    >
      {(unlikeRecipe) => (
        <Mutation
          mutation={LIKE_RECIPE}
          variables={{ _id, username }}
          update={updateLike}
        >
          {(likeRecipe) =>
            username && (
              <button onClick={() => handleLike(likeRecipe, unlikeRecipe)}>
                {liked ? "Unlike" : "Like"}
              </button>
            )
          }
        </Mutation>
      )}
    </Mutation>
  );
};

export default withSession(LikeRecipe);
