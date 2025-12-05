import React, { Suspense } from 'react';
import './App.css'
import TableComponents from './core/components/TableComponents'
import { ButtonComponets } from './core/components/ui/ButtonComponts'
import { InputComponets } from './core/components/ui/InputComponets'
import webApiServices from './core/services/webApiServices';
import { TitleComponents } from './core/components/TitleComponents';
import { LoadingComponents } from './core/components/Loading';
import { useAppDispatch, useAppSelector, type RootState } from './stores/Stores';
import { setDataContactStore } from './stores/contact';
import ImgProfile from './assets/default-avatar-profile-icon-social-600nw-1906669723.webp';
export interface IColumn {
  id: string;
  label: string;
  align?: string;
  width?: string;
  sort?: boolean;
  isShow?: boolean;
}

const dataColumn: IColumn[] = [
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

function App() {
  const dispatch = useAppDispatch()
  const { dataContacts } = useAppSelector((state: RootState) => state.contactStore)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [textSearch, setTextSearch] = React.useState<string>('')
  const [isLoad, setIsLoad] = React.useState<number>(-1)

  const fetchData = async () => {
    setLoading(true)
    setIsLoad(1)
    try {
      const response = await webApiServices.getListContactServices()
      const data = await response.json()
      dispatch(setDataContactStore(data))
      setIsLoad(1)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    isLoad === -1 && fetchData()
  }, [])

  const handleSearchContactByName = async () => {
    setLoading(true)
    try {
      const response = await webApiServices.getContactByNameServices(textSearch)
      const data = await response.json()
      dispatch(setDataContactStore(data))
      // si el array esta vacio, se vuelve a cargar la lista
      if (data.length === 0 || textSearch === '') {
        fetchData()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <Suspense fallback={<div><LoadingComponents /></div>}>
      {loading && <LoadingComponents />}
      <div className='flex flex-col gap-4'>
        <div className='bg-white p-4 rounded-2xl h-auto overflow-y-auto'>
          <div className='flex flex-col lg:flex-row lg:justify-between ml-2 p-2 border-b border-gray-200'>
            <TitleComponents title="Lista de contactos" />
          </div>
          <div className='flex flex-col lg:flex-row lg:justify-between p-4 border-b border-gray-200'>

            <div className='flex flex-row lg:gap-2 gap-3 lg:w-lg'>
              <InputComponets
                value={textSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextSearch(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleSearchContactByName() }}
                onBlur={() => { if (textSearch === '') fetchData() }}
                type="text"
                placeholder="Buscar nombre"
              />
              <ButtonComponets
                type="button"
                handleClick={handleSearchContactByName}
                title="Buscar"
              />
            </div>

            <div className='flex justify-start pt-6 lg:pt-1 lg:justify-end'>
              <ButtonComponets
                type="button"
                handleClick={() => { }}
                title="Agregar"
              />
            </div>
          </div>

          <div className='overflow-x-auto'>
            <TableComponents columns={dataColumn ?? []} dataSource={dataContacts.map((item: any) => ({
              ...item,
              profile: (<img src={ImgProfile} alt="profile" className="w-10 h-10 rounded-full" />),
              actions: <button type="button" onClick={() => { alert('Editar') }} title="Editar" className="
              bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 cursor-pointer">Editar</button>
            })) ?? []} />
          </div>
        </div>

      </div>
    </Suspense>
  )
}

export default App
