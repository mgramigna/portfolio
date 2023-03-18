import { Menu, Transition } from "@headlessui/react";
import { IconMenu2 } from "@tabler/icons-react";
import { ROUTES } from "../constants/routes";
import { Fragment } from "react";

export default function NavMenu() {
  return (
    <Menu as="div" className="relative z-50 flex items-center">
      <Menu.Button className="hover:text-slate-200">
        <IconMenu2 />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-0 mt-6 w-56 rounded-md bg-stone-900 shadow-xl">
          <div>
            {ROUTES.map((r) => (
              <Menu.Item key={r.href} as={Fragment}>
                {({ active }) => (
                  <a
                    href={r.href}
                    className={`flex w-full items-center rounded-md px-2 py-2 text-sm ${
                      active && "bg-stone-700"
                    }`}
                  >
                    {r.display}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
