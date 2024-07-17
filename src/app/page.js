"use client";

import NavBar from "@/components/navBar";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-1 flex-col min-h-full">
        <NavBar />
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col px-6 pt-28 pb-20 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                To be done...
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
