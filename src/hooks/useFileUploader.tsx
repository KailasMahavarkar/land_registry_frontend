import axios from "axios";
import { useState, ChangeEvent } from "react";
import customToast from "../toast";
import { singleDocument } from "../types/type";



const useFileUpload = () => {
    const [file, setFile] = useState<File>();
    const [document, setDocument] = useState<singleDocument>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await axios.post('/cloudinary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            const data = result.data.data;

            setDocument({
                docId: data.publicId,
                name: file.name,
                link: data.secureUrl,
                hash: data.hash,
                verified: false,
                preview: file
            })

            customToast({
                icon: "success",
                message: "File Uploaded Successfully",
            })

        } catch (error) {
            console.log(error);
            customToast({
                icon: "error",
                message: "File Upload Failed",
            })
        }

    };

    return {
        file,
        document,
        handleFileChange,
        handleUploadClick
    }
}

export default useFileUpload