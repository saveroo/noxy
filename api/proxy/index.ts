import {NowRequest, NowResponse} from "@now/node"
import {proxy} from "../../utils/proxy"

export default async (req: NowRequest, res: NowResponse) => {
    if (req.query.url === undefined) res.send('No URL Parameters')
    let isRaw: boolean = !!req.query.raw;
    const data = await (async (req) => {
        try {
            return await proxy(req.query.url);
        } catch (e) {
            return e
        }
    })(req);

    res.setHeader('content-type', await data.headers.get('content-type'))
    res.setHeader('content-length', await data.headers.get('content-length'))
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Server', "Darwin")
    const result = {
        status: data.status,
        statusText: data.statusText,
        body: req.body,
        query: req.query,
        info: "To pipe content > noxy.io/proxy?raw=true&url=[URL]",
        raw: await data.text()
    }
    res.setHeader('Cache-Control', 's-maxage=5400, stale-while-revalidate')
    isRaw ? res.json(result) : res.send(result.raw);
}
