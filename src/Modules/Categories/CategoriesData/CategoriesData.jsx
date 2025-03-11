import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toastify } from '../../../service/toastifiy';
import { axiosInstancePrivate } from '../../../service/api/apiInstance';
import { CATEGORY_URL } from '../../../service/api/apiConfig';

const CategoriesData = ({ getAllCategories, show, handleClose, mode, value }) => {
  console.log(value, 'sdsdsds');

  const { register, formState: { errors, isSubmitting },handleSubmit, reset } = useForm({
    defaultValues: { name: value?.name || '' },
    mode: "onChange"
  });

  // Update defaultValues when `value` changes
  useEffect(() => {
    if (mode=="Update"){
      reset({ name: value?.name || '' });
    }else{
      reset({ name: '' });
    }                                 
  }, [value, reset,mode]);
  

  const onSubmit = async (data) => {
    
    try {
      if(mode=="Update"){
        const res = await axiosInstancePrivate.put(CATEGORY_URL.UPDATE_CATOGERY(value?.id), data);
        toastify('success', "Category Updated Successfully");
      }else{
        const res = await axiosInstancePrivate.post(CATEGORY_URL.ADD_CATEGORY, data);
        toastify('success', "Category Added Successfully");
      }
      getAllCategories();
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      toastify('error', error?.response?.data?.message||"Faild to Send");
    }
  };

  return (
    <div className='modal'>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='border-0'>
          <Modal.Title>{mode} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="text-secondary ">
            <div className={`input-group ${errors?.name ? ' mb-1' : 'mb-3'}`}>
              <div className="form-floating">
                <input
                  {...register('name')}
                  autoComplete="true"
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Category name"
                />
                <label htmlFor="name">Category Name</label>
              </div>
            </div>
            {errors?.name && <div className="text-danger mb-3">{errors?.name?.message}</div>}

            <button disabled={isSubmitting} type='submit' className="btn btn-main d-block ms-auto mt-5 fw-semibold">
              {isSubmitting ? <i className='fa fa-spinner fa-spin'></i> : mode}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoriesData;
