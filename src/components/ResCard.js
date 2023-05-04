import { CDN_URL } from "../../utils/constants"

const ResCard=(props)=>{

    const {resData}=props

    const {name,costForTwo,minDeliveryTime,cuisines,cloudinaryImageId,avgRating}=resData.data

    return(
        <div className="res-card">
            <img alt='res-img' src={CDN_URL+cloudinaryImageId}/>
            <h2>{name}</h2>
            <h3>{cuisines.join(", ")}</h3>
            <h3>{costForTwo/100} for two</h3>
            <h3>{avgRating}</h3>
            <h3>{minDeliveryTime}mins</h3>
        </div>
    )
}

export default ResCard