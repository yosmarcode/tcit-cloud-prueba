import type { IColumn } from '../../App'

const TableComponents = ({ columns, dataSource }: { columns: IColumn[], dataSource: any[] }) => {
    return (
        <div className="relative overflow-x-auto shadow-lg rounded-xl bg-white pt-8">
            <table className="w-full text-sm text-left rtl:text-right text-body table-auto">
                <thead className="text-sm text-sm border-b border-gray-200">
                    {columns.map((column, index) => (
                        <th className="px-6 py-3 font-bold" key={index}>{column.label}</th>
                    ))}
                </thead>
                <tbody className="text-sm text-body">
                    {dataSource.map((item, index) => (
                        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50" key={index}>
                            {columns.map((column, index) => (
                                <td className="px-6 py-3 font-normal" key={index}>{item[column.id]}</td>
                            ))}
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TableComponents