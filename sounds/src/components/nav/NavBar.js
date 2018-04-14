import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

export default class NavBar extends Component {
	render() {
		return (
			<div className="Nav-holder">
				<div className="Nav-container">
					<div className="Nav-link-box">
						<Link to={"/library"}>
							<div className="Nav-links">Library</div>
						</Link>
						<Link to={"/discover"}>
							<div className="Nav-links">Discover</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
