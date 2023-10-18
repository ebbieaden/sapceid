"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="w-full px-0 border-b-gray-700 py-2 flex justify-between items-corner">
            <Link href="/" className="hover:underline">
                Home
            </Link>
            <ConnectButton />
        </div>
    )
}