import React, { useState, useEffect } from "react"
import "../assets/styles/components/card.scss"

const Card = ({ cards, onMoves, onFinish }) => {
	const [openCards, setOpenCards] = useState([])
	const [matchedCards, setMatchedCards] = useState([])

	const handleCardClick = (index) => {
		if (openCards.length === 1) {
			setOpenCards((prev) => [...prev, index])
			onMoves()
		} else {
			setOpenCards([index])
		}
	}

	// Compare cards
	const compare = () => {
		const [first, second] = openCards

		if (cards[first] === cards[second]) {
			setMatchedCards((prev) => [...prev, cards[first]])
		}

		setTimeout(() => {
			setOpenCards([])
		}, 800)
	}

	useEffect(() => {
		/* eslint-disable */
		if (openCards.length === 2) {
			compare()
		}
	}, [openCards])

	useEffect(() => {
		setOpenCards([])
		setMatchedCards([])
	}, [cards])

	useEffect(() => {
		if (matchedCards.length === cards.length / 2) {
			onFinish()
		}
	}, [matchedCards])

	return (
		<div className="container">
			{cards.map((data, index) => (
				<div
					key={index}
					className={`card ${
						openCards.includes(index)
							? "isOpen"
							: matchedCards.includes(data)
							? "isMatch"
							: ""
					}`}
					onClick={() => handleCardClick(index)}
					style={openCards.length === 2 ? { pointerEvents: "none" } : null}
				>
					<div className="card-face card-front-face">
						<img src={require("../assets/images/garena.png").default} alt="" />
					</div>
					<div className="card-face card-back-face">
						<img src={require(`../assets/images/${data}.png`).default} alt="" />
					</div>
				</div>
			))}
		</div>
	)
}

export default Card
