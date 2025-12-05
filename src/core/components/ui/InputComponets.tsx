export const InputComponets = ({
    value,
    onChange,
    onKeyDown,
    onBlur,
    type,
    name,
    placeholder
}: {
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number' | 'email' | 'password';
    name?: string;
    placeholder?: string;
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
        </div>
    )
}   