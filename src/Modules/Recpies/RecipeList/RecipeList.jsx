import React, { useEffect, useRef, useState } from 'react'
import SubHeader from './../../shared/SubHeader/SubHeader';
import Header from './../../shared/Header/Header';
import logo from './../../../assets/recipe-img.png';
import NoData from '../../shared/NoData/NoData';
import ConfirmationDelete from '../../shared/ConfirmationDelete/ConfirmationDelete';
import { toastify } from '../../../service/toastifiy';
import LoadingScreen from '../../shared/LoadingScreen/LoadingScreen';
import noDataImg from '../../../assets/nodata.png';
import { CATEGORY_URL, imageURL, RECEIPE_URL, TAG_URL } from '../../../service/api/apiConfig';
import { axiosInstancePrivate } from '../../../service/api/apiInstance';
import { useNavigate } from 'react-router-dom';
import Paginations from '../../shared/Pagination/Pagination';
import RecipeViewModal from '../RecipeViewModal';

export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesIds, setCategoriesIds] = useState('');
  const [tagId, setTagId] = useState('')
  const [seachValue, setSearchvalue] = useState('')
  const [viewModalShow, setViewModalShow] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const recipeId = useRef()
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate('/dashboard/recipies-data/new-recipe', { state: 'Add' })
  }
  const handleUpdateRecipe = (id) => {
    navigate(`/dashboard/recipies-data/${id}`, { state: 'Update' })
  }

  const getRecipes = async ( pageNumber = 1, pageSize = 8,tagId, categoryIds, name) => {
    console.log(pageNumber, pageSize, tagId, categoryIds, name);

    setIsLoading(true)
    try {
      const res = await axiosInstancePrivate.get(RECEIPE_URL.GET_RECIPE, {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          categoryId: categoryIds,
          tagId: tagId,
          name: name
        }
      });
      console.log(res);
      setRecipes(res?.data);
    } catch (error) {
      setRecipes([]);
      console.log(error || "Faild to get data");
    } finally {
      setIsLoading(false)
    }
  }


  const deleteRecipes = async () => {
    try {
      const res = await axiosInstancePrivate.delete(RECEIPE_URL.DELETE_RECIPE(recipeId.current));
      // console.log(res?.data);
      getRecipes();
      toastify('success', 'Reciepe Deleted successfuly')
    } catch (error) {
      toastify('error', 'falid to delete!')
      // console.log(error);
    }

  }



  const handleSearch = (e) => {
    setSearchvalue(e.target.value)
  }

  const handleTagSearch = (e) => {
    setTagId(e.target.value)
  }
  const handleCategorySearch = (e) => {
    setCategoriesIds(e.target.value)
  }

  const handleViewRecipe = (recipe) => {
    setCurrentRecipe(recipe)
    setViewModalShow(true)
  }

  useEffect(() => {

    // Fetch Tags
    const getTags = async () => {
      try {
        const res = await axiosInstancePrivate.get(TAG_URL.GET_TAG);
        setTags(res?.data);
      } catch (error) {
        toastify("error", error?.response?.data?.message || "Failed to get tags");
      }
    };

    // Fetch Categories
    const getCategories = async () => {
      try {
        const res = await axiosInstancePrivate.get(CATEGORY_URL.GET_CATOGERY, {
          params: {
            pageNumber: 1,
            pageSize: 100
          }
        });
        setCategories(res?.data?.data);
      } catch (error) {
        toastify("error", error?.response?.data?.message || "Failed to get categories");
      }
    };
    getTags();
    getCategories();
  }, [])

  useEffect(() => {
    getRecipes(1,8,tagId, categoriesIds, seachValue)
  }, [categoriesIds, tagId, seachValue])




  return (
    <div className='overflow-hidden'>

      <Header title="Recipes Items" discribtion="You can now add your items that any user can order it from the Application and you can edit" logo={logo} />
      <SubHeader title="Recipe Table Details" discribtion="You can check all details" btnName="Add New Item" handleBtnAction={handleAddRecipe} />

      <div className='searchSection container-fluid my-3'>
        <div className="row">
          {/* Search bar */}
          <div className="col-md-8 search-tag-box d-flex align-content-center gap-2">
            <div className="search-bar btn-group  w-75">
              <div className="input-group rounded  border-1 border ">
                <span className="input-group-text border-0  bg-transparent" id="search-addon">
                  <i className="fas fa-search"></i>
                </span>
                <input type="search" onChange={handleSearch} className="form-control border-0 rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              </div>
            </div>

            {/* Select Tag */}
            <div className="select-tag w-25">
              <select onChange={handleTagSearch} className="form-select" aria-label="Default select example">
                <option selected value=''>Tags</option>
                {tags && tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}

              </select>
            </div>

          </div>

          {/* Select Category */}
          <div className="col-md-3 select-category ">
            <select onChange={handleCategorySearch} className="form-select" aria-label="Default select example">
              <option selected value=''>Category</option>
              {categories && categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}

            </select>
          </div>

        </div>
      </div>

      <div className="container mt-4">

        <table className="table table-striped table-hover text-center align-middle overflow-x-auto">

          <thead className="table-secondary  overflow-visible">
            <tr>
              <th scope="col" className="px-1 py-4 rounded-start-3 text-nowrap">Item Name</th>
              <th scope="col" className="px-1 py-4 ">Image</th>
              <th scope="col" className="px-1 py-4 ">Price</th>
              <th scope="col" className="px-1 py-4 ">Description</th>
              <th scope="col" className="px-1 py-4 ">Tag</th>
              <th scope="col" className="px-1 py-4 ">Category</th>
              <th scope="col" className="px-1 py-4 rounded-end-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {recipes?.data?.length > 0 && !isLoading ? recipes?.data?.map((recipe) => (
              <tr key={recipe?.id}>
                <td data-label="Item Name">{recipe?.name}</td>
                <td data-label="Image"><img src={` ${recipe?.imagePath ? imageURL + recipe?.imagePath : noDataImg}`} loading='lazy' alt="Food Image" className="img-fluid rounded w-100 d-block" style={{ maxWidth: 80 }} /></td>
                <td data-label="Price">{recipe?.price} $</td>
                <td data-label="Description" className="text-wrap">{recipe?.description}</td>
                <td data-label="Tag">{recipe?.tag?.name}</td>
                <td data-label="Category" className={`${recipe?.category[0]?.name ?? 'text-danger'}`}>{recipe?.category[0]?.name ?? "none"}</td>
                <td data-label="Action" className='dropup-center dropup'>
                  <i className="fa fa-ellipsis text-secondary dropup-center dropup cursor-pointer" data-bs-toggle="dropdown" />
                  <ul className="dropdown-menu">
                    <li onClick={() => handleViewRecipe(recipe)}><a className="dropdown-item d-flex align-content-center gap-2 cursor-pointer" ><i className='fa-solid fa-eye text-success'></i> View</a></li>
                    <li onClick={() => handleUpdateRecipe(recipe?.id)}><a className="dropdown-item  cursor-pointer d-flex align-content-center gap-2" ><i className="fa-solid fa-pen-to-square text-success"></i> Edit</a></li>
                    <li onClick={() => recipeId.current = recipe?.id}><a className="dropdown-item cursor-pointer d-flex align-content-center gap-2" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-solid fa-trash-can text-success"></i>delete</a></li>
                  </ul>
                </td>
              </tr>
            )) : (<tr >
              <td className='text-center ' colSpan={7}>{isLoading ? <LoadingScreen /> : <NoData />}</td>
            </tr>)}
          </tbody>

        </table>
        {/* Pagination */}
        {recipes?.data?.length > 0 && <Paginations pageNumber={recipes?.pageNumber} pageSize={recipes?.pageSize} totalNumberOfPages={recipes?.totalNumberOfPages} totalNumberOfRecords={recipes?.totalNumberOfRecords} getNewPage={getRecipes} />}


        <ConfirmationDelete id={recipeId?.current} handleDelete={deleteRecipes} title={"Recipe"} />
        <RecipeViewModal show={viewModalShow} onHide={() => setViewModalShow(false)} data={currentRecipe} />

      </div>

    </div>
  )
}
