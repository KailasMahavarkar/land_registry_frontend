import { ChangeEvent } from "react";
import { singleDocument } from "../types/type";
import produce from "immer";
import axios from "axios";
import customToast from "../toast";

const ImageTable = ({ documents, setDocuments }: {
    documents: singleDocument[],
    setDocuments: React.Dispatch<React.SetStateAction<singleDocument[]>>
}) => {

    const handleSingleUpload = async (doc: singleDocument, index: number) => {
        if (!doc.preview) {
            return;
        }

        const formData = new FormData();
        formData.append('file', doc.preview);

        try {
            const result = await axios.post('/cloudinary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            const data = result.data.data;

            setDocuments(
                produce((draft) => {
                    draft[index].docId = data.publicId;
                    draft[index].link = data.secureUrl;
                    draft[index].hash = data.hash;
                    draft[index].verified = false;
                })
            )

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
    }

    return (
        <div className="flex flex-col">
            <button
                className="self-end my-2 btn btn-primary btn-sm"
                onClick={(e) => {
                    e.preventDefault();

                    setDocuments(
                        produce(documents, (draft: any) => {
                            draft.push({
                                name: "",
                                link: "",
                                hash: "",
                                verified: false,
                                preview: new File([], ""),
                            })
                        })
                    )
                }}
            >
                Add Document +
            </button>
            {
                documents.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Upload </th>
                                    <th>Preview</th>
                                    <th>Upload</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(documents).map(
                                    (doc: any, index: any) => {
                                        const target = documents.findIndex(
                                            (d: any) => d.name === documents[doc].name
                                        );

                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="input input-bordered w-full max-w-xs"
                                                        value={
                                                            documents[doc].name
                                                        }
                                                        onChange={(e) => {
                                                            setDocuments(
                                                                produce((draft) => {
                                                                    draft[doc].name = e.target.value;
                                                                })
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        className="file-input file-input-bordered  "
                                                        disabled={
                                                            documents[doc].link !== ""
                                                        }
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                            setDocuments(
                                                                produce((draft) => {
                                                                    if (!e.target.files) {
                                                                        return;
                                                                    }
                                                                    const file = e.target.files[0];

                                                                    if (file && file.type.includes("image")) {
                                                                        draft[doc].preview = file;
                                                                        draft[doc].link = "";
                                                                        draft[doc].hash = "";
                                                                        draft[doc].docId = "";
                                                                        draft[doc].verified = false;
                                                                    }

                                                                })
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    {documents[doc] ? (
                                                        <img
                                                            className="w-[150px] h-[150px] border-2 "
                                                            src={
                                                                documents[doc].link ||
                                                                    documents[doc].preview ?
                                                                    URL.createObjectURL(
                                                                        documents[doc].preview
                                                                    ) :
                                                                    ""
                                                            }
                                                        />
                                                    ) : (
                                                        <p>
                                                            No file selected
                                                        </p>
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            handleSingleUpload(documents[doc], doc)
                                                        }}
                                                        disabled={
                                                            documents[doc].link !== ""
                                                        }
                                                    >
                                                        Upload
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-error"
                                                        onClick={async (e) => {
                                                            e.preventDefault();

                                                            if (documents[doc].docId === "") {
                                                                try {
                                                                    await axios.delete(`/cloudinary?publicId=${documents[doc].docId}`)
                                                                    customToast({
                                                                        icon: "success",
                                                                        message: "File Deleted Successfully",
                                                                    })
                                                                } catch (error) {
                                                                    console.log(error);
                                                                    customToast({
                                                                        icon: "error",
                                                                        message: "File Delete Failed",
                                                                    })
                                                                }
                                                            }

                                                            // remove the document from the array
                                                            setDocuments(produce(documents, (draft: any) => {
                                                                draft.splice(target, 1);
                                                            }))
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                )
            }

        </div>

    )
}

export default ImageTable