import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-slate-300">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 transition duration-500 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={handleMenuClick}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <RxCross1 className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to="/dashboard"
                                    className="rounded-md px-3 py-2 text-sm font-medium transition duration-500 hover:bg-gray-700 hover:text-white"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/community"
                                    className="rounded-md px-3 py-2 text-sm font-medium transition duration-500 hover:bg-gray-700 hover:text-white"
                                >
                                    Community
                                </Link>
                                <Link
                                    to="/you"
                                    className="rounded-md px-3 py-2 text-sm font-medium transition duration-500 hover:bg-gray-700 hover:text-white"
                                >
                                    You
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link
                            to="/dashboard"
                            className="block rounded-md px-3 py-2 text-base font-medium transition duration-500 hover:bg-gray-700 hover:text-white"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/community"
                            className="block rounded-md px-3 py-2 text-base font-medium transition duration-500 hover:bg-gray-700 hover:text-white"
                        >
                            Community
                        </Link>
                        <Link
                            to="/you"
                            className="block rounded-md px-3 py-2 text-base font-medium transition duration-500 hover:bg-gray-700 hover:text-white"
                        >
                            You
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
