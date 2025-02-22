import React from 'react'

const SubHeader = ({title,discribtion,btnName,handleBtnAction ,recipes}) => {
    const highlighRecipes = (title) => {
        return title.split(/(Recipes)/g).map((word, index) =>
          word === "Recipes" ? <span key={index} className="text-success">{word}</span> : word
        );
      };
  return (
    <>
    <div className="sub-header container-fluid  rounded-3 ">
      {recipes?<div className='row mt-4  py-4  sub-header-bg  '> 
        <div className=" col-lg-7">
        <h5 className='h5 '>{recipes? highlighRecipes(title):title}</h5>
        <p className=' w-75 text-black'>{discribtion}</p>
        </div>
        <div className=' col-lg-5  flex align-content-center justify-content-center'>
          <button onClick={handleBtnAction} className="btn btn-success d-block mx-auto flex gap-4 align-content-center px-5">{btnName} {recipes&& <i className='fa fa-long-arrow-alt-right ms-3'></i> }</button>
          
        </div>
       </div>:
         <div className='d-block d-md-flex justify-content-between align-content-center mt-2 py-1 '> 
         <div className="lh-1">
         <h5 className='h5 '>{title}</h5>
         <p className='fs-6 '>{discribtion}</p>
         </div>
         <div className=' mt-3  '>
           <button onClick={handleBtnAction} className="btn btn-success d-block mx-auto d-flex gap-4 align-content-center px-4">{btnName} {recipes&& <i className='fa fa-long-arrow-alt-right ms-3'></i> }</button>       
         </div>
        </div>}
  
    </div>
    </>
  )
}

export default SubHeader