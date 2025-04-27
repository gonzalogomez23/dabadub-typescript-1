import { useEffect, useState, useRef } from "react";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@components/PrimaryButton";
import { useStateContext } from "@contexts/ContextProvider";

const PostForm = () => {
    const navigate = useNavigate();
    const imageRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const contentRef = useRef();
    const publishedRef = useRef();

    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()
    const [loading, setLoading] = useState(false);

    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
        published: true,
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (file) => {
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("content", contentRef.current.value);
        formData.append("published", publishedRef.current.checked);

        if (image) {
            formData.append("image", image);
        }

        let formValues = Object.fromEntries(formData);

        setErrors(null);
        setLoading(true);

        axiosClient
        .post("/posts", formValues, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(() => {
            setNotification("Post was successfully created")
            navigate("/posts");
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors || { general: [response.data.message] });
            } else {
            console.error("Unexpected error:", response.data);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-2xl border border-primary/15 px-6 py-12">
                <div className="w-full max-w-xl mx-auto">
                    <h1 className="text-4xl text-primary font-semibold font-headings px-1 mb-5">
                    Create new post
                    </h1>
                    <div className="card animated fadeInDown">
                    {loading && <div className="text-center">Loading...</div>}
                    {!loading && (
                        <form
                        className="max-w-full flex flex-col items-start gap-5"
                        onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="imageUpload">Upload Image</label>
                                <div
                                    id="imageUpload"
                                    className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() => document.getElementById("fileInput").click()}
                                    aria-describedby="imageHelp"
                                >
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-40 object-contain rounded-lg" />
                                ) : (
                                    <p className="text-gray-500">Drag & Drop an image or click to upload</p>
                                )}
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    accept="image/jpg, image/png, image/jpeg, image/webp"
                                    onChange={(e) => handleFileChange(e.target.files[0])}
                                />
                                <p id="imageHelp" className="text-gray-500 text-sm">
                                    Accepted formats: jpg, jpeg, png, webp
                                </p>
                            </div>


                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="title">Title</label>
                                <input
                                id="title"
                                name="title"
                                ref={titleRef}
                                placeholder="Title"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="description">Description</label>
                                <textarea
                                id="description"
                                name="description"
                                ref={descriptionRef}
                                placeholder="Description"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="content">Content</label>
                                <textarea
                                id="content"
                                name="content"
                                ref={contentRef}
                                placeholder="Content"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="published"
                                    name="published"
                                    type="checkbox"
                                    ref={publishedRef}
                                    defaultChecked={true}
                                />
                                <label htmlFor="published">Published</label>
                            </div>

                            {errors && (
                                <div className="text-red-700">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                                </div>
                            )}

                            <PrimaryButton className="btn-add" type="submit">
                                Create
                            </PrimaryButton>
                        </form>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
