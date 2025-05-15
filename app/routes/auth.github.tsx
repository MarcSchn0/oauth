import {ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {getAuthorizationUrl} from "~/auth/github";

export const loader: LoaderFunction = async ( args : LoaderFunctionArgs) => {
    return redirect(getAuthorizationUrl());
}

export const action: ActionFunction = (args: ActionFunctionArgs) => {
    return redirect(getAuthorizationUrl());
}