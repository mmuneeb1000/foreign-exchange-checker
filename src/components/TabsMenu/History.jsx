function History() {
  return (
    <section className="flex flex-col gap-2 justify-center items-center h-40 w-100 mx-auto">
      <h2 className="text-base">No chart data available</h2>
      <p className="text-neutral-200 text-center">
        We couldn't load rate history for 'pair' right now. This usually clears
        up in a minute.
      </p>
    </section>
  );
}

export default History;
