import {LoaderFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {getUserInfo} from "~/auth/github";
import {commitSession, getSession} from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const code = searchParams.get("code");

    if (!code) {
        return Response.json({ error: "github-auth-failed-no-code" });
    }

    const accessTokenResponse = await getAccessToken(code) as any;
    const accessToken = accessTokenResponse.access_token;

    const userInfo = await getUserInfo(accessToken);

    const session = await getSession();
    session.set("user", userInfo);

    return redirect("/profile", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};

export const getAccessToken = async (code: string): Promise<string> => {
    const url = "https://github.com/login/oauth/access_token";
    const client_id = process.env.GITHUB_CLIENT_ID!;
    const client_secret = process.env.GITHUB_CLIENT_SECRET!;
    const params = new URLSearchParams({
        client_id,
        client_secret,
        code,
    });
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code,
        }),
    });
    const data = await response.json();
    return data;
}
