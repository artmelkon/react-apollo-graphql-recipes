import { gql } from "@apollo/client";

export const recipeFragments = {
  recipe: gql`
    fragment CompleteRecipe on Recipe {
      _id
      name
      category
      description
      instructions
      likes
      username
    }
  `,
  like: gql`
    fragment LikeRecipe on Recipe {
      _id
      likes
    }
  `,
  token: gql`
    fragment TokenUser on Token {
      token
    }
  `,
};
