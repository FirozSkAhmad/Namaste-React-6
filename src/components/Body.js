import { useState, useEffect } from 'react'
import ResCard from "./ResCard"
import ShimmerUI from './ShimmerUI.JS'

const Body = () => {
    const [searchName, setSearchName] = useState("")

    const [data, setData] = useState([])
    const [dataF, setDataF] = useState([])

    function clickSearchHandler() {
        const filteredData = data.filter((resData) => resData.data.name.toLowerCase().includes(searchName.toLowerCase()))

        setDataF(() => {
            return searchName ? filteredData.length === 0 ? [] : filteredData : data
        })
    }

    function clickTopRatedHandler() {
        const filteredData = data.filter((resData) => resData.data.avgRating > 4).sort((a, b) => b.data.avgRating - a.data.avgRating)

        setDataF(() => {
            return filteredData
        })
    }

    useEffect(() => { getResData() }, [])

    async function getResData() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json()
        setData(json?.data?.cards[2]?.data?.data?.cards)
        setDataF(json?.data?.cards[2]?.data?.data?.cards)
    }

    return (data.length === 0) ? <ShimmerUI /> : (
        <div className="body-container">
            <div className='input-con'>

                <div className='searchContainer'>
                    <div>
                        <input type='text' placeholder='Resturant Name' onChange={(event) => setSearchName(event.target.value)}></input>
                        <button onClick={() => clickSearchHandler(searchName)}>
                            Search
                        </button>
                    </div>

                    <button onClick={() => clickTopRatedHandler(searchName)}>
                        Top Rated
                    </button>
                </div>

                {/* JS Expression
                {(a = 10, console.log(a))} */}
            </div>
            <div className="res-con">
                {dataF.length > 0 ? dataF.map((singleResData) => <ResCard resData={singleResData} key={singleResData.data.id} />) : <h1>No such restruant</h1>}
            </div>
        </div>
    )
}

export default Body