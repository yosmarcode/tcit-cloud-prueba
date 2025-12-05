import React, { Suspense } from 'react';
import './App.css'
import TableComponents from './core/components/TableComponents'
import { ButtonComponets } from './core/components/ui/ButtonComponts'
import { InputComponets } from './core/components/ui/InputComponets'
import webApiServices from './core/services/webApiServices';
import { TitleComponents } from './core/components/TitleComponents';
import { LoadingComponents } from './core/components/Loading';
import { useAppDispatch, useAppSelector, type RootState } from './stores/Stores';
import { setDataContactStore, type Contact } from './stores/contact';
import ImgProfile from './assets/default-avatar-profile-icon-social-600nw-1906669723.webp';
import logo from './assets/TCIT_blanco-isocolor.svg';
import { ModalComponents } from './core/components/ui/ModalComponents';
import { FormContact } from './core/components/FormContact';
import { dataColumn } from './core/const';
import { enqueueSnackbar } from 'notistack';
import { validateFormContact } from './core/helpers';


function App() {
  const dispatch = useAppDispatch()
  const { dataContacts } = useAppSelector((state: RootState) => state.contactStore)
  const [error, setError] = React.useState<{ isError: boolean, message: string }>({
    isError: false,
    message: '',
  })
  const [loading, setLoading] = React.useState<boolean>(false)
  const [textSearch, setTextSearch] = React.useState<string>('')
  const [isLoad, setIsLoad] = React.useState<number>(-1)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState<boolean>(false)
  const [formValue, setFormValue] = React.useState<Contact>({
    name: '',
    descriptions: '',
    id: 0,
  })

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
        enqueueSnackbar('No se encontraron resultados', { variant: 'info' })
        fetchData()
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Error al buscar el contacto', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleAddNewContact = () => {
    setIsOpenModal(true)
    setFormValue({
      name: '',
      descriptions: '',
      id: 0,
    })

  }

  const handleSaveContact = async () => {
    if (!validateFormContact(formValue, setError)) return
    let body = {
      name: formValue.name,
      descriptions: formValue.descriptions,
      id: formValue.id,
    } as Contact

    setLoading(true)
    try {
      const response = await webApiServices.createContactServices(body)
      const data = await response.json()
      console.log(data)
      // LLAMO A LA FUNCION fetchData() PARA ACTUALIZAR LA LISTA
      fetchData()
      // LIMPIO EL FORMULARIO
      setFormValue({
        name: '',
        descriptions: '',
        id: 0,
      })
      // CIERRO EL MODAL
      setIsOpenModal(false)
      enqueueSnackbar('Contacto guardado correctamente', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Error al guardar el contacto', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleEditContactSelected = (contact: Contact) => {
    setIsOpenModal(true)
    setFormValue({
      name: contact.name,
      descriptions: contact.descriptions,
      id: contact.id,
    })

  }
  const handleDeleteContactSelected = (contact: Contact) => {
    setIsOpenDeleteModal(true)
    setFormValue({
      name: contact.name,
      descriptions: contact.descriptions,
      id: contact.id,
    })

  }
  const handleUpdateContact = async () => {
    if (!formValue) return
    let body = {
      name: formValue.name,
      descriptions: formValue.descriptions,
      id: formValue.id,
    } as Contact

    setLoading(true)
    try {
      const response = await webApiServices.updateContactServices(body)
      const data = await response.json()
      console.log(data)
      // LLAMO A LA FUNCION fetchData() PARA ACTUALIZAR LA LISTA
      fetchData()
      // LIMPIO EL FORMULARIO
      setFormValue({
        name: '',
        descriptions: '',
        id: 0,
      })
      // CIERRO EL MODAL
      setIsOpenModal(false)
      enqueueSnackbar('Contacto actualizado correctamente', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Error al actualizar el contacto', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }
  const handleDeleteContact = async (id: number) => {
    setLoading(true)
    try {
      const response = await webApiServices.deleteContactServices(id)
      const data = await response.json()
      console.log(data)
      // LLAMO A LA FUNCION fetchData() PARA ACTUALIZAR LA LISTA
      fetchData()
      enqueueSnackbar('Contacto eliminado correctamente', { variant: 'success' })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Error al eliminar el contacto', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const onCloseModal = () => {
    setIsOpenModal(false)
    setFormValue({
      name: '',
      descriptions: '',
      id: 0,
    })
    setError({ isError: false, message: '' })
  }

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(false)
    setFormValue({
      name: '',
      descriptions: '',
      id: 0,
    })
    setError({ isError: false, message: '' })
  }

  return (
    <Suspense fallback={<div><LoadingComponents /></div>}>
      {loading && <LoadingComponents />}
      <div className='flex flex-col gap-4 animate-slideUp'>
        <div className='bg-white p-4 rounded-2xl h-auto overflow-y-auto'>
          <div className='flex flex-col lg:flex-row lg:justify-between ml-2 p-2 border-b border-gray-200'>
            <TitleComponents title="Lista de contactos" />
            <div className='flex justify-center bg-gray-200 rounded-lg p-2'>
              <img src={logo} alt="logo TCIT CLOUD" className="w-20 h-10" />
            </div>
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
                typeButton="primary"
                type="button"
                handleClick={handleSearchContactByName}
                title="Buscar"
              />
            </div>

            <div className='flex justify-start pt-6 lg:pt-1 lg:justify-end'>
              <ButtonComponets
                typeButton="secondary"
                type="button"
                handleClick={handleAddNewContact}
                title="Agregar"
              />
            </div>
          </div>

          <div className='overflow-x-auto'>
            <TableComponents columns={dataColumn ?? []} dataSource={dataContacts.map((item: Contact, index: number) => ({
              ...item,
              idd: index + 1, // Agregamos  un campo idd para mostrar el número de la fila
              profile: (<img src={ImgProfile} alt="profile" className="w-10 h-10 rounded-full" />),
              actions: <div className="flex gap-2">
                <button type="button" onClick={() => { handleEditContactSelected(item) }} title="Editar" className="
              bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 cursor-pointer">Editar</button>
                <button type="button" onClick={() => { handleDeleteContactSelected(item) }} title="Eliminar" className="
              bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 cursor-pointer">Eliminar</button>
              </div>
            })) ?? []} />
          </div>
        </div>
        {/* Modal de agregar y editar */}
        <ModalComponents
          isOpen={isOpenModal}
          onClose={() => onCloseModal()}
          title="Agregar contacto"
          children={<div><FormContact formValue={formValue} setFormValue={setFormValue} error={error} setError={setError} /></div>}
          childrenFooter={<div className='flex gap-2'>

            <ButtonComponets
              typeButton="primary"
              type="button"
              handleClick={() => { Number(formValue.id) > 0 ? handleUpdateContact() : handleSaveContact() }}
              title="Guardar"
            />

          </div>}

        />

        {/* Modal de eliminar */}
        <ModalComponents
          isOpen={isOpenDeleteModal}
          onClose={() => onCloseDeleteModal()}
          title="Eliminar contacto"
          children={<div className='flex flex-col gap-4 bg-gray-50 p-4 rounded-2xl'>
            <p className='text-gray-500 p-2 text-lg font-semibold'>¿Estas seguro de eliminar el contacto?</p>
            <p className='text-gray-500 p-3 bg-gray-100 rounded text-sm text-start m-2' >{formValue.name}</p>
            <p className='text-gray-500 p-3 bg-gray-100 rounded text-sm text-start m-2'>{formValue.descriptions}</p>
          </div>}
          childrenFooter={<div className='flex  gap-2'>
            <ButtonComponets
              typeButton="primary"
              type="button"
              handleClick={() => onCloseDeleteModal()}
              title="Cancelar"
            />
            <ButtonComponets
              typeButton="danger"
              type="button"
              handleClick={() => handleDeleteContact(Number(formValue.id))}
              title="Eliminar"
            />


          </div>}

        />

      </div>
    </Suspense>
  )
}

export default App
