import { Component } from "solid-js";
import Calculator from "../components/Calculator";

const Home: Component = () => {
  return (
    <>
      <main class="bg-gray-50 min-h-screen w-full">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Calculator />
        </div>
      </main>
    </>
  );
};

export default Home;
