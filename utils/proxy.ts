import unfetch from "isomorphic-unfetch"
import { Response } from "node-fetch"
import retry from "@zeit/fetch-retry"

const fetch = retry(unfetch);

export const proxy = async (url: string[] | string): Promise<Response> => {
    const headers = {
        pragma: "no-cache",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "document",
        "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
        dnt: "1",
        accept: "*/*",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-Mode": "navigate",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8,ms;q=0.7",
        "Accept-Encoding": "gzip, deflate, br"
    };
    return fetch(url, {headers}) as Promise<Response>;
}
