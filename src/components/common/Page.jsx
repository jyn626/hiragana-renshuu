function Page({ children }) {
  return (
    <>
      <main className="flex flex-col items-center justify-between min-h-[100vh] p-2 ">
        <div className="py-2 w-full max-w-[880px] flex flex-col items-start border border-slate-200 px-2 bg-white ">
          {children}
        </div>
        <footer className="bg-amber-200/40">
          <small className="text-amber-700 mb-2 font-light">
            this project is currently working in progress,
            contributions/contributors are always welcome!
          </small>{" "}
        </footer>
      </main>
    </>
  );
}

export default Page;
