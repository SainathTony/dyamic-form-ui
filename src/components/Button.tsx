type ButtonProps = {
    children: React.ReactNode,
    onClick?: (e: React.MouseEvent) => void,
    variant?: 'primary' | 'secondary' | 'success' | 'danger',
    size?: 'sm' | 'md' | 'lg',
    disabled?: boolean,
    loading?: boolean,
    className?: string,
    type?: 'button' | 'submit' | 'reset'
}
const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    type = 'button'
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5';

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
        >
            {loading && <p className="">Loading...</p>}
            {!loading && children}
        </button>
    );
};

export default Button;