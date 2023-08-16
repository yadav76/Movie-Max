import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import '../style.scss'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

    const [endPoint, setEndPoint] = useState("day");  // for API Call

    const { data, loading, error } = useFetch(`/trending/all/${endPoint}`);  // calling API

    // console.log(data, loading, error)
    const onTabChange = (tab) => {
        // for calling API on basis of "tab" like "Day" Or "Week"
        setEndPoint(tab === "Day" ? "day" : tab === "Week" ? "week" : "month");
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending