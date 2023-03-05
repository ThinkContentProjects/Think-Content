import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const NavbarDropdown = () => {
const [isOpen, setIsOpen] = useState(false);

return (
<div className="relative inline-block md:hidden">
<button
type="button"
className="inline-flex items-center justify-center p-2 bg-white rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
onClick={() => setIsOpen(!isOpen)}
>
<span className="sr-only">Open dropdown menu</span>
<svg
       className="block w-6 h-6"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       aria-hidden="true"
     >
<path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M4 6h16M4 12h16M4 18h16"
       />
</svg>
</button>
  <Transition
    show={isOpen}
    enter="transition ease-out duration-100 transform"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="transition ease-in duration-75 transform"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-lg -right-32 ring-1 ring-black ring-opacity-5">
      <a
        href="/workspace"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Workspace
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Team
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Billing
      </a>
      <a
        href="/pricing"
        className="block px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600"
      >
        Upgrade
      </a>
    </div>
  </Transition>
</div>
);
};

export default NavbarDropdown;