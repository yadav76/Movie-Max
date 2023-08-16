import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import '../style.scss'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Popular = () => {

    const [endPoint, setEndPoint] = useState("movie");  // for API Call

    const { data, loading, error } = useFetch(`/${endPoint}/popular`);  // calling API

    console.log(data, loading, error)
    const onTabChange = (tab) => {
        // for calling API on basis of "tab" like "Day" Or "Week"
        setEndPoint(tab === "Movie" ? "movie" : "tv");
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={["Movie", "Tv Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default Popular