function TabsBar() {
  return (
    <section className="py-2">
      <div className="lg:hidden">
        <select
          name="toggle"
          id="toggle"
          className=" w-full bg-neutral-700 border 
          border-neutral-300 rounded-xl px-2 py-2"
        >
          <option value="History">History</option>
          <option value="Compare">Compare</option>
          <option value="Favorites">Favorites</option>
          <option value="Log">Log</option>
        </select>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex gap-4">
          <li>History </li>
          <li>Compare</li>
          <li>Favorites</li>
          <li>Log</li>
        </ul>
      </div>
    </section>
  );
}

export default TabsBar;
