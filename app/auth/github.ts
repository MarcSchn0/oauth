

export function getAuthorizationUrl () {

    const url = "https://github.com/login/oauth/authorize";
    const GITHUB_CLIENT_ID="Ov23linuaeDKpIEdVv3i";

    const params = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        //redirect_uri: process.env.GITHUB_REDIRECT_URI || '',
        scope: "user:email",
        //state: "random_string", // Replace with a secure
    });

    return `${url}?${params.toString()}`;
}

export async function getUserInfo(accessToken: string) {
    const url = "https://api.github.com/user";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept": "application/json",
        },
    });

    return await response.json();
}