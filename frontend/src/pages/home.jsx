// home.jsx
// home page of the website

import * as React from "react";
import HomeTable from "../components/homeTable";
import HomeCarousel from "../components/homeCarousel";
import News from "@/components/news";

const Home = () => {
    return (
        <div>
            <HomeTable />
            <HomeCarousel />
            {/*<News />*/}
        </div>
    )
}

export default Home;