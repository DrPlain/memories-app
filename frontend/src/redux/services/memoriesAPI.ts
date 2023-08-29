import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IPostMessageDocument, IPostMessage} from '../../../../server/src/models/PostMessage';
import {IUser, IUserDocument} from '../../../../server/src/models/User';


const memoriesAPI = createApi({
    reducerPath: 'memoriesAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/v1'}),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
            getPosts: builder.query<IPostMessageDocument[], void>({query: () => '/posts', providesTags: ['Posts']}),
            getPost: builder.query<IPostMessageDocument, string>({query: (id: string) => `/posts/${id}`}),
            createPost: builder.mutation({
                query: (post: IPostMessage) => ({
                    url: '/posts',
                    method: 'POST',
                    body: post
                }),
                invalidatesTags: ['Posts']
            }),
            deletePost: builder.mutation({
                query: (id: string) => ({
                    url: `/posts/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['Posts']
            }),
            updatePost: builder.mutation({
                query: (id: string) => ({
                    url: `/posts/${id}`,
                    method: 'PATCH'
                }),
                invalidatesTags: ['Posts']
            }),

            getUser: builder.query<IUserDocument, string>({query: (id: string) => `/users/${id}`}),
            createUser: builder.mutation({
                query: (post: IUser) => ({
                    url: '/users',
                    method: 'POST',
                    body: post
                })
            }),
            deleteUser: builder.mutation({
                query: (id: string) => ({
                    url: `/users/${id}`,
                    method: 'DELETE'
                }),
            })

        }
    )
})

export const {useGetPostsQuery, useCreatePostMutation, useGetPostQuery, useDeletePostMutation, useUpdatePostMutation, useCreateUserMutation, useDeleteUserMutation, useGetUserQuery} = memoriesAPI;
export default memoriesAPI;