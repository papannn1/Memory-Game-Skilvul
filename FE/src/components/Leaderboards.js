import React from "react"
import "../assets/styles/components/leaderboards.scss"

const Leaderboards = ({ leaderboardsList }) => {
	return (
		<div className="leaderboards">
			<ol>
				<div className="header">
					<div className="title-nickname">Nickname</div>
					<div className="title-score">Moves</div>
				</div>
				{leaderboardsList.map((data, index) => {
					return (
						<li key={index}>
							<div className="nickname">{data.nickname}</div>
							<div className="score">{data.time}</div>
						</li>
					)
				})}
			</ol>
		</div>
	)
}

export default Leaderboards
