import React from "react";
import { ApolloConsumer } from "@apollo/client";

import FormInput from "../FormInput/FormInput.component";
import SearchItem from './SearchItem';
import { SEARCH_RECIPES } from "../../queries";

class Search extends React.Component {
  state = {
    searchResults: [],
  };
  handleChange = ({ searchRecipes }) => {
    this.setState({ searchResults: searchRecipes }, () =>
      console.log(searchRecipes)
    );
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {(client) => (
          <div className="App">
            <FormInput
              type="search"
              onChange={async (event) => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value },
                });
                this.handleChange(data);
              }}
              placeholder="Search for recipoes"
            />
            <ul>
              {searchResults.map((recipe) => (
                <SearchItem key={recipe._id} {...recipe} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
