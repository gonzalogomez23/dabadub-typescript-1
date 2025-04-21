import { useEffect, useState } from "react";
import PrimaryButton from "components/PrimaryButton";
import { useParams, useNavigate } from "react-router-dom"
import { useStateContext } from "contexts/ContextProvider";
import axiosClient from "../../axios-client"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "components/Modal";

const Post = () => {

    const {slug} = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {token, setNotification} = useStateContext()
    const [isDeleting, setIsDeleting] = useState(false)

    const [post, setPost] = useState(null);

    if (slug) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/posts/${slug}`)
                .then(({data}) => {
                    setLoading(false)
                    setPost(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
                .finally(() => {
                    setLoading(false);
                  });
        }, [])
    }

    const onDelete = (post) => {
        axiosClient.delete(`/posts/${post.slug}`)
            .then(() => {
                setNotification("Post deleted successfully");
                navigate("/posts");
            })
            .catch((err) => {
                const response = err.response;
                if (response?.status === 422) {
                    setErrors(response.data.errors || { general: [response.data.message] });
                } else {
                    console.error("Unexpected error:", response?.data || err.message);
                }
            })
    }

    if(loading){
        return(
            <div className="w-full flex items-center justify-center p-12">Loading...</div>
        )
    }

    if(!post){
        return(
            <>
                <div>Post not found</div>
            </>
        )
    }

    return (
        <>
            <div className="relative">
                {post.image && (
                    <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
                )}
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-12">
                    {post.category &&
                        <div className="flex">
                            <span className="flex w-fit rounded-full items-center justify-center text-primary text-sm font-headings bg-secondary/10 px-3 py-1">
                                {post.category.title}
                            </span>
                        </div>
                    }
                    <h2 className="font-headings text-primary text-4xl font-medium">{post.title}</h2>
                    <p className="text-2xl font-serif text-zinc-700">{post.description}</p>
                    <hr />
                    <p>{post.content}</p>
                </div>
                {token &&
                    <div className="absolute flex right-0 top-0 p-8 gap-4 items-center">
                        <PrimaryButton  to={`/update-post/${post.slug}`}  variant="secondary">
                            Edit post
                            <PencilIcon className='size-4' />
                        </PrimaryButton>
                        <PrimaryButton onClick={() => setIsDeleting(true)}  variant="danger">
                            Delete
                            <TrashIcon className='size-4' />
                        </PrimaryButton>
                    </div>
                }
            </div>
            {token && isDeleting && 
                <Modal>
                    <p className="text-lg">Are you sure you want to delete this post?</p>
                    <div className="flex justify-center gap-4">
                        <PrimaryButton variant="secondary" onClick={() => setIsDeleting(false)}>
                            No
                        </PrimaryButton>
                        <PrimaryButton onClick={() => onDelete(post)} className="bg-red-600 text-white hover:!bg-red-500">
                            Yes, delete
                            <TrashIcon className='size-4' />
                        </PrimaryButton>
                    </div>
                </Modal>
            }
        </>
    )
}

export default Post
