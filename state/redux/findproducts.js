import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const header = {
    'Content-type':'application/json'
}
const requestUrl = (url) =>({url , headers:header})
const baseUrl = '/api'
export  const  productApi = createApi({
    reducerPath:'productApi',
   baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) =>({
        getproduct:builder.query({
            query:()=>requestUrl('/addproduct')
        })
    })
})


export const {useGetproductQuery} = productApi;