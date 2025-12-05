export const ButtonComponets = ({
    type,
    handleClick,
    // children,
    title
}: {
    type: 'submit' | 'button' | 'reset';
    handleClick: () => void;
    //children?: React.ReactNode;
    title: string;
}) => {
    return (
        <button type={type || 'button'}
            onClick={() => handleClick()}
            className="
            bg-blue-500
         text-white
         h-10
         px-4 py-2
         rounded
         hover:scale-110
         transition
         duration-300
         cursor-pointer
         uppercase
         font-medium">
            {title}
        </button>
    )
}