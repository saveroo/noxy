import data from "./simpleicon.json"
import { NowRequest, NowResponse } from "@now/node";

interface IAttribs {
    class: string;
    style: string;
}

interface ISimpleIcon {
    id?: number;
    name?: string;
    title?: string;
    isDark?: boolean;
    color?: string;
    attribs?: IAttribs;
}

interface ISimpleIcons extends Array<ISimpleIcon> {}

const icon = (name: string | string[]): ISimpleIcon => {
    const icons: ISimpleIcons = data.filter(item => (item.name).split(".")[0] === name);
    return icons[0]
}

export default async (req: NowRequest, res: NowResponse) => {
    res.json(icon(req.query.name))
}