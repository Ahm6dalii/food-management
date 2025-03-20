import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { imageURL, USER_RECEIPE_URL } from '../../service/api/apiConfig';
import notfound from '../../assets/nodata.png';
import { axiosInstancePrivate } from '../../service/api/apiInstance';
import { toastify } from '../../service/toastifiy';
const RecipeViewModal = ({ show, onHide, data }) => {
    const [loading, setLoading] = React.useState(false);

    const addToFavorites = async(id) => {
        setLoading(true);
       try {
                const res = await axiosInstancePrivate.post(USER_RECEIPE_URL.ADD_USER_RECIPE, {   recipeId:id  });
                console.log(res?.data);
              toastify("success", "Recipe added to favorites");
              onHide();
            } catch (error) {
                toastify("error", error?.response?.data?.message || "Failed to get tags");
            }finally{
                setLoading(false);
            }
    }


    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header className='border-0' closeButton>
                <Modal.Title>Recipe Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data && (
                    <div>
                        <div className="text-center mb-3">
                            <img
                                src={`${data?.imagePath?imageURL+data?.imagePath:notfound}`}

                                alt={data?.name}
                                className="rounded-3 img-width"
                            />
                        </div>
                        <p><strong>Name:</strong> {data?.name}</p>
                        <p><strong>Description:</strong> {data?.description}</p>
                        <p><strong>Price:</strong> ${data?.price}</p>
                        <p><strong>Category:</strong> {data?.category?.map(cat => cat.name).join(', ')}</p>
                        <p><strong>Tag:</strong> {data?.tag?.name}</p>
                        <p><strong>Created At:</strong> {new Date(data?.creationDate).toLocaleString()}</p>
                        <p><strong>Last Modified:</strong> {new Date(data?.modificationDate).toLocaleString()}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className='border-0'>
                <Button variant="secondary" disabled={loading} onClick={()=>addToFavorites(data?.id)}>{loading ? <i className="fa fa-spinner fa-spin"></i> : "Add to Favorites"}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RecipeViewModal;
