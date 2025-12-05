export interface IColumn {
    id: string;
    label: string;
    align?: string;
    width?: string;
    sort?: boolean;
    isShow?: boolean;
}

export const dataColumn: IColumn[] = [
    {
        id: 'id',
        label: '#',
        align: 'center',
        width: '5%',
        sort: true,
        isShow: true
    },
    {
        id: 'profile',
        label: '',
        align: 'center',
        width: '5%',
        sort: true,
        isShow: true
    },
    {
        id: 'name',
        label: 'Nombre',
        align: 'center',
        width: '20%',
        sort: true,
        isShow: true
    },
    {
        id: 'descriptions',
        label: 'Descripción',
        align: 'center',
        width: '20%',
        sort: true,
        isShow: true
    },
    {
        id: 'actions',
        label: 'Acciones',
        align: 'center',
        width: '20%',
        sort: true,
        isShow: true
    },
]