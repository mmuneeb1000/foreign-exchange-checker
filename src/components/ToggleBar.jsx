import Compare from "./ToggleMenu/Compare";
import History from "./ToggleMenu/History";
import Log from "./ToggleMenu/Log";
import Favorites from "./ToggleMenu/Favorites";

function ToggleBar() {
  return (
    <section>
      <div>
        <select
          name="toggle"
          id="toggle"
          className="w-full bg-neutral-700 border 
          border-neutral-300 rounded-xl px-2 py-2"
        >
          <option value="History">History</option>
          <option value="Compare">Compare</option>
          <option value="Favorites">Favorites</option>
          <option value="Log">Log</option>
        </select>
      </div>
    </section>
  );
}

export default ToggleBar;
