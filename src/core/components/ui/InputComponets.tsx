export const InputComponets = ({
    value,
    onChange,
    onKeyDown,
    onBlur,
    type,
    name,
    placeholder,
    isError,
    message
}: {
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number' | 'email' | 'password';
    name?: string;
    placeholder?: string;
    isError?: boolean;
    message?: string;
}) => {
    return (
        <div className="flex flex-col w-full">
            <input type={type || 'text'}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                placeholder={placeholder}
                className="
            bg-gray-50 
            border-gray-300
            rounded-md w-full
            p-2 font-normal text-gray-900
            focus:ring-green-500
            focus:border-green-500"
            />
            {(isError && value.toString().length === 0) && (
                <div className="flex justify-start">
                    <p className="text-red-500 text-xs mt-1 text-xs font-semibold">{message}</p>
                </div>
            )}
        </div>
    )
}   