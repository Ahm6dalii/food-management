
export const imageURL="https://upskilling-egypt.com:3006/" //used in image Url
export const baseURL="https://upskilling-egypt.com:3006/api/v1/"


export const USER_URL={
   LOGIN:"Users/Login" ,
   REGISTER:"Users/Register",
   FORGET_PASSWORD:"Users/Reset/Request",
   RESET_PASSWORD:"Users/Reset",
   VERIFY_ACCOUNT:"Users/verify",
   CHANGE_PASSWORD:"Users/ChangePassword",
   GET_CURRENT_USER:"Users/currentUser",
   GET_USERS:(pageSize,pageNumber,groups=1,userName='',email='',country='')=>`Users/?pageSize=${pageSize}&pageNumber=${pageNumber}&groups=${groups}&userName=${userName}&email=${email}&country=${country}`,
   GET_USER_BY_ID:(id)=>`User/${id}`,
   UPDATE_USER_PROFILE:(id)=>`Users/`,
   DELETE_USER:(id)=>`Users/${id}`

}
export const RECEIPE_URL={
   GET_RECIPE:"Recipe/?pageSize=10&pageNumber=1",
   GET_RECIPE_BY_ID:(id)=>`Recipe/${id}`,
   DELETE_RECIPE:(id)=>`Recipe/${id}`,
   UPDATE_RECIPE:(id)=>`Recipe/${id}`,
   ADD_RECIPE:"Recipe/",
}
export const CATEGORY_URL={
   GET_CATOGERY:"Category/?pageSize=10&pageNumber=1",
   GET_CATEGORY_BY_ID:(id)=>`Category/${id}`,
   DELETE_CATOGERY:(id)=>`Category/${id}`,
   UPDATE_CATOGERY:(id)=>`Category/${id}`,
   ADD_CATEGORY:"Category",
}

export const USER_RECEIPE_URL={
   GET_USER_RECIPE:"userRecipe",
   DELETE_USER_RECIPE:(id)=>`userRecipe/${id}`,
   ADD_USER_RECIPE:"userRecipe",
}

export const TAG_URL={
GET_TAG:"tag",
}