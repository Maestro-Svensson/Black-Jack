import './App.css'
import { useState } from 'react'

// Kortfärger och symboler
const suits = [
  { symbol: "♠", color: "black" },
  { symbol: "♥", color: "red" },
  { symbol: "♦", color: "red" },
  { symbol: "♣", color: "black" }
]

// Generera ett kort
function generateCard() {
  const value = Math.floor(Math.random() * 10) + 1
  const suit = suits[Math.floor(Math.random() * suits.length)]
  return { value, suit }
}

function App() {
  const [cards, setCards] = useState([])
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState("Tryck för att dra ett kort!")
  const [stopped, setStopped] = useState(false)

  const [aiCards, setAiCards] = useState([])
  const [aiTotal, setAiTotal] = useState(0)

  // Spelaren drar kort
  function drawCard() {
    if (total > 21 || stopped) return

    const newCard = generateCard()
    const newCards = [...cards, newCard]
    const newTotal = total + newCard.value

    setCards(newCards)
    setTotal(newTotal)

    if (newTotal === 21) {
      setMessage("🎉 Du fick 21! Du vann!")
    } else if (newTotal > 21) {
      setMessage("💀 Du gick över 21! Du förlorade!")
    } else {
      setMessage(`Du drog ${newCard.value} ${newCard.suit.symbol}. Total: ${newTotal}`)
    }
  }

  // AI spelar
  function aiTurn() {
    let currentTotal = 0
    let currentCards = []

    while (currentTotal < 17) {
      const card = generateCard()
      currentCards.push(card)
      currentTotal += card.value
    }

    setAiCards(currentCards)
    setAiTotal(currentTotal)

    if (currentTotal > 21) {
      setMessage(`AI drog över 21 (${currentTotal}) – du vann!`)
    } else if (currentTotal === 21) {
      setMessage(`AI fick 21 – AI vann!`)
    } else {
      if (currentTotal > total) {
        setMessage(`AI fick ${currentTotal} och slog dig!`)
      } else if (currentTotal < total) {
        setMessage(`AI fick ${currentTotal} – du vann!`)
      } else {
        setMessage(`AI fick ${currentTotal} – oavgjort!`)
      }
    }
  }

  function stopGame() {
    setStopped(true)
    setMessage("Du har stannat! AI spelar...")
    setTimeout(aiTurn, 1000)
  }

  function resetGame() {
    setCards([])
    setTotal(0)
    setStopped(false)
    setMessage("Nytt spel! Dra ett kort.")

    setAiCards([])
    setAiTotal(0)
  }

  return (
    <main>
      <h1>Card Game</h1>

      <p>{message}</p>

      <button onClick={drawCard} disabled={total > 21 || stopped}>
        Dra ett kort
      </button>

      <button onClick={stopGame} style={{ marginLeft: "10px" }}>
        Stanna
      </button>

      <button onClick={resetGame} style={{ marginLeft: "10px" }}>
        Starta om
      </button>

      {/* Pokerbord */}
      <div className="poker-table">

        {/* AI:s kort */}
        <div className="cards-row ai-cards">
          {aiCards.map((c, i) => (
            <div key={i} className="poker-card">
              <div className={`corner ${c.suit.color}`}>
                {c.value}<br />{c.suit.symbol}
              </div>
              <span className={c.suit.color}>{c.suit.symbol}</span>
            </div>
          ))}
        </div>

        {/* Spelarens kort */}
        <div className="cards-row player-cards">
          {cards.map((c, i) => (
            <div key={i} className="poker-card">
              <div className={`corner ${c.suit.color}`}>
                {c.value}<br />{c.suit.symbol}
              </div>
              <span className={c.suit.color}>{c.suit.symbol}</span>
            </div>
          ))}
        </div>

      </div>

      <h3>Total: {total}</h3>
      <h3>AI Total: {aiTotal}</h3>
    </main>
  )
}

export default App
