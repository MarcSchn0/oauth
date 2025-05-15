import { Form, useSearchParams } from "@remix-run/react";

export default function Login() {
    const [searchParams] = useSearchParams();
    const error = searchParams.get("error");
    
    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
        "github-auth-failed": "Authentication with GitHub failed. Please try again.",
        "github-auth-failed-no-code": "No authorization code received from GitHub. Please try again.",
        "github-auth-failed-no-token": "Could not retrieve access token from GitHub. Please try again."
    };
    
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="p-6 max-w-sm mx-auto bg-red-500 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <p className="mb-4">Please log in with your GitHub account:</p>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{errorMessages[error] || "An unknown error occurred."}</p>
                    </div>
                )}

                <Form action="/auth/github/">
                    <button 
                        type="submit"
                        className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0 0 10 0z" clipRule="evenodd" />
                        </svg>
                        Login with GitHub
                    </button>
                </Form>
            </div>
        </div>
    );
}