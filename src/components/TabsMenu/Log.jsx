function Log() {
  return (
    <section className="flex flex-col gap-2 justify-center items-center h-40 lg:w-100 mx-auto">
      <h2 className="text-base"> No conversions logged yet</h2>
      <p className="text-neutral-200 text-center">
        Every conversion is recorded here automatically when you tap Log
        conversion. Your log is private to this session and this browser
      </p>
    </section>
  );
}

export default Log;
