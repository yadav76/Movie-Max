import React from 'react'
import './style.scss'
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './detailsBanner/cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);  //for all videos of Movie Or Tv
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`); //for Credits
    // data ? console.log(data, credits) : "";

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>

    )
}

export default Details