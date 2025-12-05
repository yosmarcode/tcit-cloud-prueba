export const InputComponets = ({
    value,
    onChange,
    type,
    placeholder
}: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
}) => {
    return (
        <div className="flex flex-col w-full">
            <input type={type || 'text'}
                value={value}
                onChange={onChange}
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