import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const header = {
    'Content-type':'application/json'
}
const requestUrl = (url) =>({url , headers:header})
const baseUrl = '/api'
export  const  dataApi = createApi({
    reducerPath:'dataApi',
   baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) =>({
        getproductData:builder.query({
            query:()=>requestUrl('/geproduct')
        })
    })
})


export const {useGetproductDataQuery} = dataApi;