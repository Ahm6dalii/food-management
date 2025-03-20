import React, { useEffect, useState } from 'react'
import { axiosInstancePrivate } from '../../service/api/apiInstance';
import { imageURL, USER_RECEIPE_URL } from '../../service/api/apiConfig';
import ImgNotFound from '../../assets/nodata.png'
import { toastify } from '../../service/toastifiy';
import NoData from '../shared/NoData/NoData';
import LoadingScreen from '../shared/LoadingScreen/LoadingScreen';
const Favorites = () => {
    const [ Favorites, setFavorites ] = useState([])
        const [isLoading, setLoading] = useState(false);
    const getFavorites = async () => {
        setLoading(true);
        try {
            const res = await axiosInstancePrivate.get(USER_RECEIPE_URL.GET_USER_RECIPE);
            console.log(res?.data);
            setFavorites(res?.data);
        } catch (error) {
            toastify("error", error?.response?.data?.message | "Failed to get favorites");
        }finally{
            setLoading(false);
        }
    };

    const removeFromFavorites = async(id) => {
        setLoading(true);
        try {
            const res = await axiosInstancePrivate.delete(USER_RECEIPE_URL.DELETE_USER_RECIPE(id));
            console.log(res?.data);
            getFavorites();
            toastify("success", "Recipe removed from favorites");
        } catch (error) {
            toastify("error", error?.response?.data?.message || "Failed to get favorites");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        // Change the title of the document
        document.title = 'Favorites';
    }, [document.title]);

    useEffect(() => {
        getFavorites();
        console.log(localStorage.getItem('token'));
        
    }, []);


    if (!Favorites) {
        return <div>Loading...</div>
    }
    return (
        <div className='container-fluid'>
            <div className="row">

              { Favorites?.data?.length > 0 && !isLoading ? Favorites?.data?.map((item, index) =>(    
                   <div key={index} className="col-12 col-sm-6 col-md-4 ">
                   
                   <div className="card position-relative" >
                       <div className='rounded-bottom-2 overflow-hidden'>
                       <img src={item?.recipe?.imagePath ?imageURL+item?.recipe?.imagePath : ImgNotFound} className="card-img-top  aspect-1" alt="..." />

                       </div>
                       <div className="card-body">
                           <h5 className="card-title">{item?.recipe?.name}</h5>
                           <p className="card-text">{item?.recipe?.description}.</p>
                           <a onClick={() => removeFromFavorites(item?.id)} className="btn p-1 bg-white position-absolute top-0 end-0 m-2"><i className='fa fa-heart text-success'></i></a>
                       </div>
                   </div>
               </div>
             
             )
             ):  <div className='d-flex justify-content-center align-items-center vh-80 '>{isLoading ?<LoadingScreen />: <div className='text-center'><NoData /></div>} </div> }
            </div>
        </div>
    )
}

export default Favorites