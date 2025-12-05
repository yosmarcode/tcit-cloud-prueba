export const AlertComponents = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col p-4 bg-red-500/10 rounded-md">
            <p className="text-white font-semibold">{message}</p>
        </div>
    )
}