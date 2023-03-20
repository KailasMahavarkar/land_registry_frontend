import { ChangeEvent, useContext, useEffect, useState } from "react";
import CustomContext from "../context/custom.context";
import axios from 'axios';
import useFileUpload from "../hooks/useFileUploader";
import ImageTable from "../components/ImageTable";
import { singleDocument } from "../types/type";

function TestPage() {

    const [documents, setDocuments] = useState<singleDocument[]>([]);


    return (
        <ImageTable
            documents={documents}
            setDocuments={setDocuments}
        />
    );
}
export default TestPage;
