function ToggleBar() {
  return (
    <section>
      <div>
        <select
          name="toggle"
          id="toggle"
          className="w-full bg-neutral-700 rounded-xl text-center px-1 py-2"
        >
          <option value="Compare">Compare</option>
          <option value="History">History</option>
          <option value="Favorites">Favorites</option>
          <option value="Log">Log</option>
        </select>
      </div>
    </section>
  );
}

export default ToggleBar;
