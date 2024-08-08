"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function NavBar({ title, centerLinks, rightLinks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <h2 className="text-xl font-bold leading-9 tracking-tight text-gray-900">
              Výzkum Odolnosti
              <span className="font-normal">
                {title ? `\u00A0\u00A0|\u00A0\u00A0${title}` : ""}
              </span>
            </h2>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-2">
          {centerLinks?.map((link, index) => (
            <Button
              key={`lc-${index}`}
              type={link.type}
              onClick={link.onClick}
              label={link.label}
              isActive={link.isActive}
            />
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-2">
          {rightLinks?.map((link, index) => (
            <Button
              key={`lr-${index}`}
              type={link.type}
              onClick={link.onClick}
              label={link.label}
            />
          ))}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <h2 className="text-xl font-bold leading-9 tracking-tight text-gray-900">
                Výzkum Odolnosti
              </h2>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {centerLinks?.map((link, index) => (
                  <Button
                    key={`lcm-${index}`}
                    type={link.type}
                    onClick={link.onClick}
                    label={link.label}
                    isActive={link.isActive}
                  />
                ))}
              </div>
              <div className="py-6 space-y-2">
                {rightLinks?.map((link, index) => (
                  <Button
                    key={`lrm-${index}`}
                    type={link.type}
                    onClick={link.onClick}
                    label={link.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
