import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../img/lazyLoadImage.jsx"
import PosterFallback from "../../assets/no-poster.png";
import './style.scss'
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
CircleRating

const Carousel = ({ data, loading, endPoint, title }) => {

    const carouselContainer = useRef();  //Binding useRef() hook with carouselContainer variable

    //console.log(carouselContainer);         //printing whole <div> as project
    //console.log(carouselContainer.current); //printing current div bind with carouselContainer variable

    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        // for moving Carousel left & right and adding another 5 movies or shows to Carousel section

        const container = carouselContainer.current;

        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        // console.log(container.scrollLeft, container.offsetWidth, scrollAmount)

        container.scrollTo({
            left: scrollAmount,
            behviour: "smooth"
        })
    }

    // console.log(data);

    //for Before loading Images of movies blur effect of Images
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {
                    !loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {
                                data?.map(item => {

                                    const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;  //for movie Image if present if not then show PosterFallBack

                                    // console.log(item);
                                    return (
                                        <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                                            <div className="posterBlock">
                                                <Img src={posterUrl} />
                                                <CircleRating rating={item.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {item.title || item.name}
                                                </span>
                                                <span className="date">
                                                    {dayjs(item.release_Date).format(
                                                        "MMM D, YYYY"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div >
    )
}

export default Carousel