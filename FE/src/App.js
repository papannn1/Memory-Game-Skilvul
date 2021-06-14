import { useState, useEffect } from "react"
import "./App.scss"

// Components
import Card from "./components/Card"
import Leaderboards from "./components/Leaderboards"

function App() {
	const cards_list = ["kelly", "andrew", "hayato", "paloma", "laura", "alok"]
	const [moves, setMoves] = useState(0)
	const [bestScore, setBestScore] = useState(
		JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
	)
	const [leaderboards, setLeaderboards] = useState([])

	// Random Cards
	const shuffleCards = () => {
		let data = cards_list.concat(cards_list)
		return data.sort(() => Math.random() - 0.5)
	}
	const [randomizedCards, setRandomizedCards] = useState(shuffleCards())

	// Reset Cards
	const handleRestart = () => {
		setRandomizedCards(shuffleCards())
		setMoves(0)
	}

	// Set Best Score
	const handleFinish = () => {
		const highscore = Math.min(moves, bestScore)
		setBestScore(highscore)
		localStorage.setItem("bestScore", highscore)

		setTimeout(() => {
			let nickname = prompt(
				`Selamat, kamu telah menyelesaikan permainan dalam ${moves} gerakan.\n Ayo isi nama kamu untuk masuk dalam leaderboards.`
			)
			if (nickname !== null) {
				post_highscore(nickname)
				handleRestart()
			}
		}, 800)
	}

	const get_highscore = () => {
		fetch("https://api-memorygame.garena.co.id/api/high_score/")
			.then((res) => res.json())
			.then((result) => {
				setLeaderboards(result)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const post_highscore = (nickname) => {
		fetch("https://api-memorygame.garena.co.id/api/high_score/", {
			method: "POST",
			body: JSON.stringify({ nickname, finish_time: moves }),
		})
			.then((res) => {
				res.json()
			})
			.then((result) => {
				get_highscore()
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		get_highscore()
	}, [])

	return (
		<div className="App">
			<div className="gameWrapper">
				<div className="header">
					<h1>Garena x Skilvul - Memory Game</h1>
					<span>Temukan dua kartu dengan gambar yang sama</span>
				</div>

				<Card
					cards={randomizedCards}
					onMoves={() => setMoves((moves) => moves + 1)}
					onFinish={handleFinish}
				/>

				<div className="footer">
					<div className="score">
						<div className="moves">
							<span className="bold">Moves:</span> {moves}
						</div>
						{localStorage.getItem("bestScore") && (
							<div className="high-score">
								<span className="bold">Personal Best Score:</span> {bestScore}
							</div>
						)}
					</div>
					<div className="btn btn-restart">
						<button onClick={handleRestart}>Restart</button>
					</div>
				</div>
			</div>

			<Leaderboards leaderboardsList={leaderboards} />
		</div>
	)
}

export default App
