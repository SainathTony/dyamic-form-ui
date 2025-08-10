import { useParams, useNavigate } from 'react-router-dom';

const RecordsView = () => {
    const { formId } = useParams<{ formId: string }>();
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Records for Form ID: {formId}</h2>
                <button 
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    Go Back
                </button>
            </div>
            {/* Add your records table/component here */}
        </div>
    );
};

export default RecordsView;
