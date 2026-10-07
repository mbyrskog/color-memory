import { Game } from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="gameWrapper">
      <h1>Color Memory</h1>
      <div className="dots">
        <div className="dot red" />
        <div className="dot green" />
        <div className="dot blue" />
      </div>
      <p>
        Flip two cards to find matching colors. A match is +1 point, a mismatch
        is −1.
      </p>
      <Game />
    </div>
  );
}

export default App;
