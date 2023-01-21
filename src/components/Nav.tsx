import { Component, createMemo, createSignal, For } from "solid-js";
import { Link, useRouter } from "solid-app-router";

const Nav: Component = () => {
  const router = useRouter();
  const currentLocation = createMemo(() => router[0].location);

  const links = [{ text: "Home", to: "/" }];
  const activeClass = "text-white bg-gray-900";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <nav class=" bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="block">
              <div class="ml-10 flex items-baseline space-x-4">
                <For each={links}>
                  {(link, index) => (
                    <Link
                      href={link.to}
                      class={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentLocation() === link.to
                          ? activeClass
                          : inactiveClass
                      } ${index() > 0 && "ml-4"}`}
                    >
                      {link.text}
                    </Link>
                  )}
                </For>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
