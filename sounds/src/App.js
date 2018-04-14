import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import "./App.css";
//
import NavBar from "./components/nav/NavBar";
import SearchBar from "./components/nav/SearchBar";
import Library from "./components/library/Library";
import Discover from "./components/discover/Discover";
import Account from "./components/account/Account";
import DiscoverTrack from "./components/discover/DiscoverTrack";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: "",
      navOpen: true,
      songsLoaded: false,
      //
      discoverTrack: "",
      discoverTrackLoaded: false,
      //
      discover: {
        one: "",
        two: "",
        three: "",
        four: ""
      }
    };
  }
  //axios calls
  landingSearch = () => {
    let bruno = axios({
      method: "get",
      url:
        "https://itunes.apple.com/search?term=bruno+mars&limit=4&entity=song&sort=recent"
    });
    let kendrick = axios({
      method: "get",
      url:
        "https://itunes.apple.com/search?term=kendrick+lamar&limit=4&entity=song&sort=recent"
    });
    let cara = axios({
      method: "get",
      url:
        "https://itunes.apple.com/search?term=alessia+cara&limit=4&entity=song&sort=recent"
    });
    let lorde = axios({
      method: "get",
      url:
        "https://itunes.apple.com/search?term=lorde&limit=4&entity=song&sort=recent"
    });
    Promise.all([bruno, kendrick, cara, lorde])
      .then(response => {
        console.log(response[0].data.results);
        this.setState({
          discover: {
            one: response[0].data.results,
            two: response[1].data.results,
            three: response[2].data.results,
            four: response[3].data.results
          },
          songsLoaded: true
        });
      })
      .catch(err => {
        console.log("Error encountered in sounds.search:", err);
      });
  };
  search = term => {
    axios({
      method: "get",
      url: `https://itunes.apple.com/search?term=${term}&limit=200`
    })
      .then(response => {
        console.log(response.data.results);
        this.setState({
          searchResults: response.data.results
        });
      })
      .catch(err => {
        console.log("Error encountered in sounds.search:", err);
      });
  };
  getTrack = trackId => {
    axios({
      method: "get",
      url: `https://itunes.apple.com/search?term=${trackId}`
    })
      .then(response => {
        console.log(response.data.results[0]);
        this.setState({
          discoverTrack: response.data.results[0],
          discoverTrackLoaded: true
        });
      })
      .catch(err => {
        console.log("Error encountered in sounds.getTrack:", err);
      });
  };
  //methods
  toggleNavBar = () => {
    this.setState({
      navOpen: !this.state.navOpen
    });
  };
  componentDidMount() {
    this.landingSearch();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <SearchBar search={this.search} toggleNavBar={this.toggleNavBar} />
          <div className="Main-container">
            <NavBar navOpen={this.state.navOpen} />
            <div className="Content-container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/discover" />}
                />
                <Route
                  exact
                  path="/discover"
                  render={props => (
                    <Discover
                      discover={this.state.discover}
                      songsLoaded={this.state.songsLoaded}
                      {...props}
                    />
                  )}
                />
                <Route
                  path="/library"
                  render={props => <Library {...props} />}
                />
                <Route
                  path="/account"
                  render={props => <Account {...props} />}
                />
                <Route
                  path="/discover/:trackId"
                  render={props => (
                    <DiscoverTrack
                      getTrack={this.getTrack}
                      track={this.state.discoverTrack}
                      trackLoaded={this.state.discoverTrackLoaded}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
