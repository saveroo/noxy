import { NowResponse } from "@now/node"

export default async (_, res: NowResponse) => {
    res.json({
        test: "Hellow World"
    })
}
