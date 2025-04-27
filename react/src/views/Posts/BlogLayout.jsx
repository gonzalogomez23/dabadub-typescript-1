import { useState, useEffect } from "react";
import axiosClient from "@/axios-client.js";
import AsideLink from '/src/components/AsideLink';
import { ArrowRightStartOnRectangleIcon, UserIcon, UserCircleIcon, NewspaperIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Outlet } from "react-router-dom";

const Posts = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const getCategories = () => {
        setLoadingCategories(true);
        axiosClient.get('/categories')
            .then(({data}) => {
                setCategories(data.categories)
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors || { general: [response.data.message] });
                } else {
                  console.error("Unexpected error:", response.data.error);
                }
              })
            .finally(() => {
            setLoadingCategories(false);
            });
    }
    
    useEffect(() => {
        getCategories()
    }, [])
    
    return (
        <div className="min-h-100 flex gap-3 p-3">
            <aside className="min-w-80 w-80 max-w-full">
                <div className="w-full flex flex-col gap-6 rounded-xl bg-white border border-primary/15 p-2">
                    <div className="w-full flex flex-col gap-2">
                        <AsideLink to="/posts">
                            All posts
                        </AsideLink>
                        {categories.map(category => (
                            <AsideLink
                                to={`/posts/${category.slug}`}
                                key={category.id}
                                category={category}
                            >
                                {category.title}
                            </AsideLink>
                        ))}
                        {/* <AsideLink>
                            <UserGroupIcon className="size-6 min-w-6"/>
                            Comunity
                        </AsideLink> */}
                    </div>
                </div>
            </aside>
            <div className="content grow">
                {/* <div className="flex justify-between items-end py-4 px-2">
                    <h1 className="text-4xl text-primary font-semibold font-headings px-2">Posts</h1>
                </div> */}
                <div className="rounded-xl bg-white border border-primary/15 overflow-hidden">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Posts
