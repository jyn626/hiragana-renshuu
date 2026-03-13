function Page({ children }) {
  return (
    <>
      <main className="flex justify-center p-6">
        <div className="py-2 w-[880px] flex flex-col items-start ">
          {children}
        </div>
      </main>
    </>
  );
}

export default Page;
