"use client";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function NavLinks() {
    const path = usePathname();
    const [showNav, setshowNav] = useState(false);

    return (
        <>
            {showNav ? (
                <box-icon
                    size="md"
                    onClick={() => setshowNav(false)}
                    color="white"
                    name="x"
                    className="navClose"
                ></box-icon>
            ) : (
                <box-icon
                    size="md"
                    className="navOpen"
                    onClick={() => setshowNav(true)}
                    color="white"
                    name="menu-alt-right"
                ></box-icon>
            )}

            <ul className={showNav ? "show" : ""}>
                <li>
                    <Link className={path === "/" ? "active" : ""} href={"/"}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className={path === "/search" ? "active" : ""}
                        href={"/search"}
                    >
                        Advance Search
                    </Link>
                </li>
                <li>
                    <Link
                        className={path === "/contact" ? "active" : ""}
                        href={"/contact"}
                    >
                        Chat
                    </Link>
                </li>
                <li>
                    <Link
                        className={path === "/login" ? "active" : ""}
                        href={"/login"}
                    >
                        Other
                    </Link>
                </li>
            </ul>
        </>
    );
}