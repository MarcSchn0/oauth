import {  redirect } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { getSession, destroySession } from "~/session.server";

export async function loader({ request }: { request: Request }) {
    const session = await getSession(request.headers.get("Cookie"));
    const user = session.get("user");

    if (!user) {
        return redirect("/login");
    }

    return Response.json({ user });
}

export async function action({ request }: { request: Request }) {
    const session = await getSession(request.headers.get("Cookie"));
    
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session)
        }
    });
}

export default function Index() {
  const { user } = useLoaderData<{ user: UserSession }>();
  
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 max-w-sm mx-auto bg-red-500 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Remix GitHub OAuth Demo</h1>
        
        {user ? (
          <div className="user-profile">
            <div className="flex items-center space-x-4 mb-4">
              {user.avatar && (
                <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
              )}
              <div>
                <h2 className="text-xl font-semibold">{user.displayName}</h2>
                <p className="text-gray-600">@{user.username}</p>
                {user.email && <p className="text-gray-600">{user.email}</p>}
              </div>
            </div>
            
            <Form method="post">
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Logout
              </button>
            </Form>
          </div>
        ) : (
          <Link to="." className="block text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Login with GitHub
          </Link>
        )}
      </div>
    </div>
  );
}

