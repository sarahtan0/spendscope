import { LogObject } from "../models/log";

const baseUrl = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:2000"; // fallback for local dev

async function fetchData (input: RequestInfo, init?: RequestInit){
    const url: RequestInfo = baseUrl + input;
    console.log(url);
    const response = await fetch(url, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
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