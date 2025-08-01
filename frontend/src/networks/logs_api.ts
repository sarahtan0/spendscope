import { LogObject } from "../models/Log";
import { User } from "../models/User";

async function fetchData (input: RequestInfo, init?: RequestInit){
    console.log("CALLING: ", input, init)
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/users/", {
        method: "GET",
        credentials: "include",
    });
    return response.json();
}

export interface SignUpCredentials {
    username?: string,
    email?: string,
    password?: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password?: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    await fetchData("/users/logout", {
        method: "POST",
        credentials: "include"
    });
}

export async function getLogs():Promise<LogObject[]> {
    const response = await fetchData("/logs", {
        method: "GET",
        credentials: "include",
    });
    return response.json();
}

export async function deleteLog(logId: string) {
    await fetchData("/logs/" + logId, 
        {
            method: 'DELETE',
            credentials: "include"
    });
}

export interface LogInput {
    title: string,
    cost: number,
    section: string,
}

export async function createLog(log: LogInput): Promise<LogObject> {
    const response = await fetchData("/logs", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(log),
    });
    return response.json();
}

export async function updateLog(logId: string, log: LogInput): Promise<LogObject> {
    const response = await fetchData("/logs/" + logId, 
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(log)
    });
    return response.json();
}
