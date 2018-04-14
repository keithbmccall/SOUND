import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

export default class DiscoverTrack extends Component {
	componentDidMount() {
		this.props.getTrack(this.props.match.params.trackId);
	}
	render() {
		const { track } = this.props;
		if (this.props.trackLoaded) {
			return (
				<div className="Discover">
					<img src={track.artworkUrl100} className="Discover-image" />
					<div>ahahh</div>
				</div>
			);
		} else {
			return <div>LOADINGGGG</div>;
		}
	}
}
