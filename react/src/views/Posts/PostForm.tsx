import { useState } from "react";
import PrimaryButton from "@components/PrimaryButton";
import {type PostCategory as CategoryType, type Post as PostType} from "@/types";

interface PostFormProps {
    initialValues: PostType;
    onSubmit: (data: FormData | object) => void;
    isUpdateMode?: boolean;
    categories: CategoryType[];
}

interface PostFormData {
    title: string;
    description: string;
    content: string;
    category_id: number | string | null;
    published: boolean;
    image?: string;
    _method?: 'PUT';
}

const PostForm = ({initialValues, onSubmit, isUpdateMode, categories}: PostFormProps) => {

    const [postData, setPostData] = useState<PostFormData>({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        content: initialValues.content ?? "",
        category_id: initialValues.category?.id ?? "",
        published: initialValues.published ?? true,
        ...(isUpdateMode && { _method: "PUT" })
    });

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileSelect = (
        event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();

        const file =
            (event as React.ChangeEvent<HTMLInputElement>).target?.files?.[0] ||
            (event as React.DragEvent<HTMLDivElement>).dataTransfer?.files?.[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
        setPostData(prevData => ({ ...prevData, image: file }));
    };


    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value === "0" ? null : parseInt(e.target.value);
        setPostData((prev) => ({
            ...prev,
            category_id: selectedValue,
        }));
    }

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        
        if (!image) return onSubmit(postData);
    
        const formData = new FormData();
        Object.entries(postData).forEach(([key, value]) => formData.append(key, value));
        formData.append("image", image);
    
        return onSubmit(formData);
    };

    return (
        <form
            className="max-w-full flex flex-col items-start gap-5"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 w-full">
                {initialValues.image && (
                    <div className="mb-4">
                        <p className="mb-2">Current image:</p>
                        <div className="">
                            <img src={initialValues.image} alt="Current image" className=" rounded-lg aspect-video object-cover max-w-80 w-full" />
                        </div>
                    </div>
                )}
                <label htmlFor="fileInput">Upload new image</label>
                <div
                    id="imageUpload"
                    className="w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                    onDrop={handleFileSelect}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById("fileInput").click()}
                    aria-describedby="imageHelp"
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className=" max-w-80 w-full aspect-video object-cover rounded-lg" />
                    ) : (
                        <p className="text-gray-500">Drag & Drop an image or click to upload</p>
                    )}
                </div>
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/jpg, image/png, image/jpeg, image/webp"
                    onChange={handleFileSelect}
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
                    defaultValue={postData.title}
                    onBlur={handleBlur}
                    placeholder="Title"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={postData.description}
                    onBlur={handleBlur}
                    placeholder="Description"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="content">Content</label>
                <textarea
                id="content"
                name="content"
                defaultValue={postData.content}
                onBlur={handleBlur}
                placeholder="Content"
                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={postData.category_id}
                    onChange={handleCategory}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-primary bg-white"
                >
                    <option value="0">
                        None
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <PrimaryButton className="btn-add" type="submit">
                Save
            </PrimaryButton>
        </form>
    );
};

export default PostForm;
