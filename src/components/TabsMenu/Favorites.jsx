function Favorites() {
  return (
    <section className="flex flex-col gap-2 justify-center items-center h-40 w-100 mx-auto">
      <h2 className="text-base">No pinned pairs yet</h2>
      <p className="text-neutral-200 text-center">
        Pin a pair to track its rate here. Tap the star icon on any conversion
        or comparison row.
      </p>
    </section>
  );
}

export default Favorites;
