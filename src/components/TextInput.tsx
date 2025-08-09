
type TextInputProps = {
    type?: string,
    value: string,
    onChange?: (value: string) => void,
    placeholder: string,
    label: string,
    required: boolean,
    className?: string
}
const TextInput: React.FC<TextInputProps> = ({
    type='text',
    value='',
    onChange=()=>{},
    placeholder='', 
    label='',
    required=false,
    className=''
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg 
                 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none 
                 transition-colors bg-white dark:bg-gray-800 
                 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
        </div>
    );
}

export default TextInput;