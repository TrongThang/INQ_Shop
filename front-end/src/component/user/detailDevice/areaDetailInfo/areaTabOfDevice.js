import ContentTab from "./contentTab";
import NavTab from "./navTab";

export default function AreaTabOfDevice({ device }) {
    if(device)
    console.log('Area Tab Of Device: ', device)
    return (
        <>
            <NavTab />
            <ContentTab device={device} />
        </>
    );
}