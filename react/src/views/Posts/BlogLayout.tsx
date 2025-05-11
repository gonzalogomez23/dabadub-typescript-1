import { useState, useEffect } from "react";
import axiosClient from "@/axios-client";
import AsideLink from '@components/AsideLink';
import { Outlet } from "react-router-dom";
import { type PostCategory as CategoryType } from "@/types";

const Posts = () => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
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
                  console.error(response.data.errors || { general: [response.data.message] });
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
                            >
                                {category.title}
                            </AsideLink>
                        ))}
                    </div>
                </div>
            </aside>
            <div className="content grow">
                <div className="rounded-xl bg-white border border-primary/15 overflow-hidden">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Posts
