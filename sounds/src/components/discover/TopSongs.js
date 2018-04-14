import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

export default class TopSongs extends Component {
	constructor() {
		super();
	}
	render() {
		const { songInfo } = this.props;
		return (
			<div className="Top-songs-info">
				<Link to={`/discover/${songInfo.trackId}`}>
					<img
						src={songInfo.artworkUrl100}
						className="Top-songs-image"
					/>
					<div className="Top-songs-text">
						<div className="Top-songs-artist">
							{songInfo.artistName}
						</div>
						<div>{songInfo.trackName}</div>
					</div>
				</Link>
			</div>
		);
	}
}
