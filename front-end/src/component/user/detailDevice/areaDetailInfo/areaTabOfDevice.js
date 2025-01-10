import ContentTab from "./contentTab";
import NavTab from "./navTab";

export default function AreaTabOfDevice({ device }) {
    
    return (
        <>
            <NavTab />
            <ContentTab device={device} />
        </>
    );
}