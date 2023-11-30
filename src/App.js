import { Component } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cocktails: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((drinks) =>
        this.setState(() => {
          return { cocktails: drinks };
        })
      );
  }

  onSearchEvent = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { cocktails, searchField } = this.state;
    const { onSearchEvent } = this;

    const filterCocktails = cocktails.filter((drink) => {
      return drink.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox
          onSearchEventHandler={onSearchEvent}
          placeholder="Search cocktails"
          className="cocktails-search-box"
        />
        <CardList cocktails={filterCocktails} />
      </div>
    );
  }
}

export default App;
