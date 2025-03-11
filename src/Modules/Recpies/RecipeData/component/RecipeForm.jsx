import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toastify } from "../../../../service/toastifiy";
import { CATEGORY_URL, imageURL, RECEIPE_URL, TAG_URL } from "../../../../service/api/apiConfig";
import { axiosInstancePrivate, axiosInstancePrivateFormData } from "../../../../service/api/apiInstance";

const RecipeForm = ({ mode }) => {
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fileName, setFileName] = useState(""); 
    const [tagValue, setTagValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');

    const { 
        register, 
        formState: { errors, isSubmitting }, 
        reset, 
        handleSubmit,
        setValue
    } = useForm({ mode: "onChange" });

    const navigate = useNavigate();

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
            const res = await axiosInstancePrivate.get(CATEGORY_URL.GET_CATOGERY);
            setCategories(res?.data?.data);
        } catch (error) {
            toastify("error", error?.response?.data?.message || "Failed to get categories");
        }
    };

    // Handle File Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setValue("recipeImage", file); 
        }
    };

    // Form Submission
    const onSubmit = async (data) => {
        console.log(data);
       
        try {
            if (mode === "Update") {
                await axiosInstancePrivateFormData.put(RECEIPE_URL.UPDATE_RECIPE(data?.id), data);
                toastify("success", "Recipe updated successfully!");
            } else {
                await axiosInstancePrivateFormData.post(RECEIPE_URL.ADD_RECIPE, data);
                toastify("success", "Recipe added successfully!");
            }

            reset();
            navigate("/dashboard/recipies");
        } catch (error) {
            toastify("error", error?.response?.data?.message || "Failed to process recipe");
        }
    };

    useEffect(() => {
        getTags();
        getCategories();
    }, []);
    
    useEffect(() => {
        if (mode === "Update") {
            const storedRecipe = JSON.parse(localStorage.getItem("currentRecipe"));
            if (storedRecipe) {
                reset(storedRecipe);
                setFileName(storedRecipe?.imagePath || "");
                setTagValue(storedRecipe?.tag?.id || "");    
                setCategoryValue(storedRecipe?.category?.[0]?.id || "");
                setValue("tagId", tagValue|| "");
                setValue("categoriesIds", categoryValue|| "");
            }
        }
    }, [mode, reset]);

    return (
        <div className="mt-4">
            <p className="text-muted fs-6">{mode?mode:"Add"} New Recipe</p>
            <form onSubmit={handleSubmit(onSubmit)} className="text-secondary mt-5 px-5 pb-5">
                
                {/* Recipe Name */}
                <div className="mb-3">
                    <input 
                        {...register("name", { required: "Name is required" })} 
                        autoComplete="true" 
                        type="text" 
                        className="form-control border-0 bg-secondary-custom" 
                        placeholder="Recipe Name" 
                    />
                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                </div>

                {/* Tags Selection */}
                <div className="mb-3">
                    <select 
                        {...register("tagId", { required: "Tag is required" })} 
                        className="form-control border-0 bg-secondary-custom"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                    >
                        <option value="">Select Tag</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                    {errors.tagId && <div className="text-danger">{errors.tagId.message}</div>}
                </div>

                {/* Price Input */}
                <div className="mb-3">
                    <div className="input-group mb-3 bg-secondary-custom">
                        <input 
                            {...register("price", { required: "Price is required" })} 
                            type="number" 
                            className="form-control bg-secondary-custom border-0" 
                            placeholder="Recipe Price" 
                        />
                        <div className="input-group-append">
                            <span className="input-group-text border-0">EGP</span>
                        </div>
                    </div>
                    {errors.price && <div className="text-danger">{errors.price.message}</div>}
                </div>

                {/* Categories Selection */}
                <div className="mb-3">
                    <select 
                        {...register("categoriesIds", { required: "Categories are required" })} 
                        className="form-control bg-secondary-custom"
                        value={categoryValue}
                        onChange={(e) => setCategoryValue(e.target.value)}
                    >
                        <option value="">Select Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.categoriesIds && <div className="text-danger">{errors.categoriesIds.message}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                    <textarea 
                        {...register("description", { required: "Description is required" })} 
                        className="form-control textarea-resize border-0 bg-secondary-custom" 
                        placeholder="Description" 
                    />
                    {errors.description && <div className="text-danger">{errors.description.message}</div>}
                </div>

              
                {/* File Upload */}
                <label htmlFor="recipeImage" className="form-label file-image-input recipeImage py-3 bg-success w-100 bg-opacity-10 fw-semibold">
                    <div className="d-flex align-items-center justify-content-center flex-column w-100">
                        <i className="fa-solid fa-arrow-up-from-bracket text-secondary"></i>
                        <input 
                            {...register("recipeImage")} 
                            type="file" 
                            className="form-control d-none"
                            id="recipeImage"
                            onChange={handleFileChange} 
                        />
                        <p>
                            {fileName ? (
                                <span className="text-success">
                                    {fileName} 
                                    <span className="text-danger ms-2" onClick={() => setFileName("")}>×</span>
                                </span>
                            ) : (
                                <>Drag & Drop or <span className="text-success">Choose an Image</span> to Upload</>
                            )}
                        </p>
                    </div>
                    
                </label>
                {mode=="Update" && <div className="d-flex justify-content-center align-items-center"><img width={200} src={imageURL+fileName} alt="Selected" /></div>}
                {errors.recipeImage && <div className="text-danger">{errors.recipeImage.message}</div>}

                {/* Action Buttons */}
                <div className="mt-5 d-flex justify-content-end gap-3">
                    <button type="button" onClick={() => navigate("/dashboard/recipies")} className="btn btn-outline-success px-5 py-2">Cancel</button>
                    <button disabled={isSubmitting} type="submit" className="btn btn-main w-full fw-semibold px-5 py-2">
                        {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : mode?mode:"Add"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default RecipeForm;
