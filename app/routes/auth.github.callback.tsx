import {LoaderFunction, LoaderFunctionArgs} from "@remix-run/node";
import {getUserInfo} from "~/auth/github";


export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
    const searchParams = new URLSearchParams(args.request.url.split("?")[1]);

    const code = searchParams.get("code");

    if(!code) {
        return Response.json({ error: "github-auth-failed-no-code"});
    }

    const accessTokenResponse = await getAccessToken(code) as string;

    const accessToken = accessTokenResponse.access_token;

    const userInfo = await getUserInfo(accessToken);

    return Response.json(userInfo);
}

export const getAccessToken = async (code: string): Promise<string> => {
    const url = "https://github.com/login/oauth/access_token";
    const client_id = "Ov23linuaeDKpIEdVv3i";
    const client_secret = "564527265109439b2f57ff0f866055ce4850fac5";
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