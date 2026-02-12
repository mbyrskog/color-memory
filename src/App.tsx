import { Game } from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="gameWrapper">
      <h1>Color memory</h1>
      <div className="dots">
        <div className="dot red" />
        <div className="dot green" />
        <div className="dot blue" />
      </div>
      <p>
        Tre färger finns att matcha: röd, grön, blå. För varje match får du 1
        poäng. Fel match ger -1 poäng.
      </p>
      <Game />
    </div>
  );
}

export default App;
