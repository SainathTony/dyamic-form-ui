type TextAreaProps = {
    value: string,
    onChange?: (value: string) => void,
    placeholder: string,
    rows?: number,
    label: string,
    required: boolean,
    className?: string
}
const TextArea: React.FC<TextAreaProps> = ({
    value,
    onChange=()=>{},    
    placeholder='',
    rows = 4,
    label='',
    required = false,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                required={required}
                className="w-full p-4 border-2 border-gray-200 rounded-lg 
                   focus:border-blue-500 focus:outline-none 
                   transition-colors resize-vertical bg-white 
                   text-gray-900 placeholder-gray-500"
            />
        </div>
    );
};

export default TextArea;