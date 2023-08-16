import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Img from '../../../components/img/lazyLoadImage';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");   // for HomeBackGround Image
    const [query, setQuery] = useState("");   // for Search
    const navigate = useNavigate();

    // Now get Images to set Home Background from redux-store
    const { url } = useSelector(state => state.home);

    // for getting homeScreen Image from API using useFetch() hook
    const { data, loading } = useFetch("/movie/upcoming")

    //console.log(data);
    // Now set background Image from above (data) we are getting from useFetch() hook
    useEffect(() => {
        // By Default I am getting 20 Data so I have to pick randome image out of 20 images
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

        // now set background Image
        setBackground(bg);
    }, [data])


    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            // if pressed key is "Enter" then go to search pages
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className="heroBanner">

            {
                !loading &&
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            }

            <div className="opacity-layer">

            </div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input type="text"
                            placeholder='Search for a Movie or TV Show....'
                            onChange={e => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            name="" id="" />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner