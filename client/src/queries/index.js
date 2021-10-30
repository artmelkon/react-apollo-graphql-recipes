import { gql } from "apollo-boost";
import { recipeFragments } from "./fragments";

/* Recipes Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      description
      likes
      username
    }
  }
`;
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      favorites {
        _id
        name
      }
      joinDate
    }
  }
`;
export const GET_USER_RECIPES = gql`
  query GetUserRecipes($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
      createdDate
    }
  }
`;
export const GET_RECIPE = gql`
  query GetRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;
export const SEARCH_RECIPES = gql`
  query SearchRecipe($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;

/* Recipes Mutation */
export const ADD_RECIPE = gql`
  mutation (
    $name: String!
    $description: String!
    $category: String
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;
export const LIKE_RECIPE = gql`
  mutation LikeRecipe($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      ...LikeRecipe
    }
  }
  ${recipeFragments.like}
`;
export const UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      ...LikeRecipe
    }
  }
  ${recipeFragments.like}
`;
export const DELETE_USER_RECIPE = gql`
  mutation DeletUserRecipe($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

/* User Query */
/* User Mutation */
export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      ...TokenUser
    }
  }
  ${recipeFragments.token}
`;
export const SIGNIN_USER = gql`
  mutation SigninUser($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      ...TokenUser
    }
  }
  ${recipeFragments.token}
`;

