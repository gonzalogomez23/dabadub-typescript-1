import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axiosClient from "/src/axios-client.js";
import PostItem from 'components/PostItem';
import PrimaryButton from "components/PrimaryButton";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { category } = useParams(); 

    const getPosts = () => {
        setPosts([]);
        setLoading(true);
        let url = "/posts";
        if (category) {
            url += `?category_slug=${category}`;
        }
        axiosClient.get(url)
            .then(({data}) => {
                setLoading(false)
                setPosts(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getPosts();
    }, [category])

    return (
        <div className='flex flex-col w-full max-w-[42rem] mx-auto py-4'>
            {loading && (
                [...Array(6)].map((_, index) => (
                <div className="animate-pulse border-b-2 border-primary/15 nth-last:border-none flex flex-col gap-4 px-4 py-6" key={index}>
                    <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
                </div>
                ))
            )}
            {posts && posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                ></PostItem>
            ))}
            {!loading && posts.length === 0 && (
                <div className="text-gray-500 text-center col-span-full py-6">
                    No posts found in this category
                </div>
            )}
            {/* <div>No founded posts</div> */}
        </div>
    )
  }
  
  export default Posts
  