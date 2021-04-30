import React, {useRef, useEffect} from "react";

// npm install tableau-api

const {tableau} = window;

function TableauEmbed() {

    const ref = useRef(null)

    const url =
    "https://public.tableau.com/views/FINALDOW30_92_16191475300580/HistoryoftheDOW30?:language=en&:display_count=y&:origin=viz_share_link";

    const options = {
        device: "desktop"
    }

    function initViz(){
        new tableau.Viz(ref.current, url, options)
    }

    useEffect(() => {
        initViz();
    },[]);


    return (

        <div>

            <div ref={ref}></div>

        </div>


    );
}

export default TableauEmbed;