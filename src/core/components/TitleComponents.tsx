export const TitleComponents = ({ title }: { title: string }) => {
    return (
        <div className="text-3xl font-bold text-gray-900 mb-2">{title ?? ''}</div>
    )
}