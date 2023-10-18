import Link from "next/link";
export default function Footer() {
    return (
        <div className="w-full px-6 border-t border-t-gray-700 py-2 text-center">
            Build with { " "}
            <Link href="https://ebbieaden.kodashub.com/"
                target="_blank"
                className="text-blue-500 hover:text-blue-600"
            >
                Ebbie Aden
            </Link>
            !
        </div>
    );
}