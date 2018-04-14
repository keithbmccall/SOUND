import React, { Component } from "react";
import TopSongs from "./TopSongs";

export default class Discover extends Component {
	constructor(props) {
		super(props);
	}
	renderTopSongs = song => {
		return <TopSongs songInfo={song} />;
	};
	render() {
		if (this.props.songsLoaded) {
			const songsOne = this.props.discover.one.map(this.renderTopSongs);
			const songsTwo = this.props.discover.two.map(this.renderTopSongs);
			const songsThree = this.props.discover.three.map(
				this.renderTopSongs
			);
			const songsFour = this.props.discover.four.map(this.renderTopSongs);
			return (
				<div className="Discover-holder">
					<div className="Discover-container">
						<div className="Big-title">
							<div>Discover Sounds</div>
						</div>
						<div className="Top-songs-container">
							<div>{songsOne}</div>
							<div>{songsTwo}</div>
							<div>{songsThree}</div>
							<div>{songsFour}</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <div>loading</div>;
		}
	}
}
