export default function Loading() {
  return (
    <div className="flex md:min-h-screen w-full flex-row bg-bg-primary">
      <main className="w-full flex flex-col">
        <header className="flex flex-row justify-between items-center p-4 w-full bg-bg-secondary h-[69px]">
          <div className="h-8 bg-gray-600 rounded w-1/4 animate-pulse"></div>
          <div className="h-10 bg-button opacity-50 rounded-2xl w-32 animate-pulse"></div>
        </header>
        <div className="p-4 flex flex-row animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col justify-start mr-6 w-72">
              <div className="flex flex-row items-center mb-6">
                <div className="h-4 w-4 rounded-full mr-2 bg-gray-600"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              </div>
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="bg-bg-secondary p-4 rounded-md mb-4 h-24"
                >
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
