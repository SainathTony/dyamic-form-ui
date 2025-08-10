
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full p-3 border-2 border-gray-200 rounded-lg 
                 focus:border-blue-500 focus:outline-none 
                 transition-colors bg-white 
                 text-gray-900 placeholder-gray-500"
            />
        </div>
    );
}

export default TextInput;