import { LogObject } from "../models/Log";
import { User } from "../models/User";


async function fetchData (input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

interface modifyCredentails {
    userId: string,
    monthIndex: number,
    newValue?: number
}

export async function modifyMonthTotals(credentials: modifyCredentails): Promise<User>{
    const response = await fetchData("/users/modify-month-totals", {
        method: "PATCH", 
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json();
}

export async function getMonthTotals(): Promise<number[]>{
    const response = await fetchData("/users/month-totals", {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();
    const currDate = new Date();
    const currMonth = currDate.getMonth();
    return data.monthTotals.slice(0,currMonth+1);
}

export async function getMonthLogs(): Promise<LogObject[]> {
    const response = await fetchData("/logs/currentMonth", {
        method: "GET",
        credentials: "include"
    });
    return response.json();
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
