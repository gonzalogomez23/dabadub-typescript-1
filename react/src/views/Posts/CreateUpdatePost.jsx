import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axiosClient from "../../axios-client";
import { useNavigate, Navigate } from "react-router-dom";
import PrimaryButton from "@components/PrimaryButton";
import { useStateContext } from "@contexts/ContextProvider";
import PostFormNew from "@views/Posts/PostFormNew";

const CreateUpdatePost = () => {
    const { slug } = useParams();
    const isUpdateMode = !!slug;
    const navigate = useNavigate();
    const { token, setNotification } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    
    const [post, setPost] = useState({});
    const [categories, setCategories] = useState([]);

    if (!token) {
        return <Navigate to="/"/>
    }

    useEffect(() => {
        if (!isUpdateMode) return;
    
        setLoading(true);
        axiosClient.get(`/posts/${slug}`)
            .then(({ data }) => {
                setPost(data?.data)
            })
            .catch(({error}) => {
                setErrors(error.response?.data?.errors || "Unknown error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    
    const onSubmit = (data) => {
        setErrors(null);
        setLoading(true);

        axiosClient.post(isUpdateMode ? `/posts/${slug}` :  "/posts", data)
            .then(() => {
                setNotification(isUpdateMode ? "Post updated successfully" : "Post created successfully");
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
            .finally(() => setLoading(false));
    };


    useEffect(() => {
        axiosClient.get(`/categories`)
            .then(({ data }) => {
                setCategories(data?.categories)
            })
            .catch(({error}) => {
                setErrors(error.response?.data?.errors || "Unknown error");
            })
    }, []);
    

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-2xl border border-primary/15 px-6 py-12">
                <div className="w-full max-w-xl mx-auto">
                    <h1 className="text-4xl text-primary font-semibold font-headings px-1 mb-5">
                        {isUpdateMode ? "Update Post" : "Create Post"}
                    </h1>
                    <div className="card animated fadeInDown">
                        {loading ? (
                            <div className="text-center text-primary">Loading...</div>
                        ) : (
                            <PostFormNew
                                initialValues={post}
                                onSubmit={onSubmit}
                                isUpdateMode={isUpdateMode}
                                categories={categories}
                            />
                        )}
                        {errors && (
                            <div className="text-red-700 mt-4">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUpdatePost;
