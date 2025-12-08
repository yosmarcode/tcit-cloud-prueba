export const ButtonComponets = ({
    type,
    typeButton,
    handleClick,
    // children,
    title
}: {
    type: 'submit' | 'button' | 'reset';
    typeButton: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
    handleClick: () => void;
    //children?: React.ReactNode;
    title: React.ReactNode | string;
}) => {
    return (
        <button type={type || 'button'}
            onClick={() => handleClick()}
            className={`
            ${typeButton === 'primary' ? 'bg-blue-500' : typeButton === 'secondary' ? 'bg-gray-500' : typeButton === 'danger' ? 'bg-red-500' : typeButton === 'warning' ? 'bg-yellow-500' : typeButton === 'info' ? 'bg-blue-500' : typeButton === 'success' ? 'bg-green-500' : 'bg-blue-500'}
         text-white
         h-10
         px-4 py-2
         rounded
         hover:scale-110
         transition
         duration-300
         cursor-pointer
         uppercase
         font-medium`}>
            {title}
        </button>
    )
}