import { GameProvider } from "./context/GameContext";
import GameView from "./views/GameView";
import "./App.css";

function App() {
  return (
    <GameProvider>
      <GameView />
    </GameProvider>
  );
}

export default App;