import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiArrowLeft } from 'react-icons/fi';
import type { FormRecord } from '../services/types';
import { getFormRecords } from '../services/formService';
import { debounce } from '../utils/debounce';

const RecordsView = () => {
    const { formId } = useParams<{ formId: string }>();
    const navigate = useNavigate();
    const [recordsLoading, setRecordsLoading] = useState(false);
    const [records, setRecords] = useState<FormRecord[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    type DebouncedSearch = {
        (search: string): void;
        cancel: () => void;
    };

    const debouncedSearchRef = useRef<DebouncedSearch | null>(null);

    const fetchRecords = useCallback(async (search: string = '') => {
        setRecordsLoading(true);
        try {
            const res = await getFormRecords(Number(formId), search);
            if (typeof res === 'string') {
                console.error('Error fetching records:', res);
                return;
            }
            const recordsArray = Array.isArray(res) ? res : [res];
            setRecords(recordsArray);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            setRecordsLoading(false);
        }
    }, [formId]);

    useEffect(() => {
        // Initialize debounced search
        const debouncedSearch = debounce((search: string) => {
            fetchRecords(search);
        }, 500);

        debouncedSearchRef.current = debouncedSearch;

        // Initial fetch
        fetchRecords('');

        // Cleanup debounce on unmount
        return () => {
            debouncedSearch.cancel();
        };
    }, [fetchRecords]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearchRef.current?.(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        fetchRecords('');
    };

    return (
        <div className="p-8">
            <div className="flex items-center mb-6 gap-1">
                <FiArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" size={24}/>
                <h2 className="text-2xl font-bold">Submissions for: {records[0]?.form_name || 'Form'}</h2>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search submissions..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={clearSearch}
                        >
                            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            {recordsLoading ? (
                <div className="text-center py-8">Loading submissions...</div>
            ) : records.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No submissions found for this form.</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submission ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submitted At
                                </th>
                                {Object.keys(records[0]?.form_data || {}).map((key) => (
                                    <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((record) => (
                                <tr key={record.submission_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.submission_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(record.submitted_at).toLocaleString()}
                                    </td>
                                    {Object.entries(record.form_data).map(([key, value]) => (
                                        <td key={key} className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs break-words">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RecordsView;
