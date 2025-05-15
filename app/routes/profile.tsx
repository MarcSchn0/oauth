import {LoaderFunction, json, redirect} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {getSession} from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const user = session.get("user");

    if (!user) {
        return redirect("/login");
    }

    return json(user);
};

export default function ProfilePage() {
    const user = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
                <img
                    src={user.avatar_url}
                    alt="Avatar"
                    className="rounded-full w-32 h-32 mx-auto shadow-lg border-4 border-white -mt-20"
                />
                <h1 className="text-3xl font-extrabold mt-6">{user.name || user.login}</h1>
                <p className="text-gray-500 text-sm">@{user.login}</p>

                {user.bio && <p className="mt-4 text-gray-700">{user.bio}</p>}
                {user.location && (
                    <p className="mt-2 text-sm text-gray-600">
                        📍 <span className="font-medium">{user.location}</span>
                    </p>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                        View GitHub
                    </a>
                    <a
                        href="/logout"
                        className="inline-block border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition"
                    >
                        Logout
                    </a>
                </div>
            </div>
        </div>
    );
}
