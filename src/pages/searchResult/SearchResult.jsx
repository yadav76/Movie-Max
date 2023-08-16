import React, { useState, useEffect } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResults from "../../assets/no-results.png"
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'


const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();  // Getting from URL

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(res => { //we get Data in pageNo form
            setData(res)
            setPageNum(prev => prev + 1)
            setLoading(false)
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(res => {
            if (data?.results) {
                //first present previous Data then Current data in setData()
                setData({
                    ...data, results: [...data?.results, ...res.results]
                })
            } else {
                setData(res);  //No Data already Present
            }
            // increase PageCount
            setPageNum(prev => prev + 1)
        })
    }

    useEffect(() => {
        setPageNum(1);  //for Every time "query" changes setPageNum to 1 else It will not fetch Data
        fetchInitialData();
    }, [query]);  //Whenever query changes fetchInitialData

    return (
        <div className='searchResultsPage'>
            {loading &&
                <Spinner initial={true} />
            }
            {!loading && (
                <ContentWrapper>
                    {data?.results.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results?.length || []}  //Initially Data is Empty so pass []
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {
                                    data?.results?.map((item, index) => {
                                        if (item.media_type === "person") return;
                                        return (
                                            //sending Data to <MovieCard> component
                                            <MovieCard key={index} data={item} fromSearch={true} />
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotfound">
                            Sorry, Results Not Found
                        </span>
                    )}
                </ContentWrapper>
            )
            }
        </div >
    )
}

export default SearchResult