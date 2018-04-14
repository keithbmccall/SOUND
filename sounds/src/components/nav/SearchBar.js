import React, { Component } from "react";

export default class SearchBar extends Component {
	constructor() {
		super();
		this.state = {
			searchTerm: ""
		};
	}
	changeHandler = e => {
		this.setState(
			{
				searchTerm: e.target.value
			},
			this.props.search(this.state.searchTerm)
		);
	};
	submitHandler = e => {
		e.preventDefault();
		this.props.search(this.state.searchTerm);
	};

	render() {
		return (
			<div className="Search-holder">
				<div className="Searchbar-container">
					<form onSubmit={this.submitHandler}>
						<input
							className="Searchbar"
							type="text"
							name="searchTerm"
							placeholder="Search ..."
							onChange={this.changeHandler}
						/>
					</form>
				</div>
			</div>
		);
	}
}
