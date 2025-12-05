import conex from '../../conex/conex.js';

export const GetListContacts = async (_req, res) => {
  try {
    const result = await conex.query('SELECT * FROM public."Contacts"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res
      .status(500)
      .send(`Error al ejecutar la consulta Error: ${error.message || error}`);
  }
};

export const PostCreateContacts = async (req, res) => {
  const { name, descriptions } = req.body;

  if (!name || !descriptions) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  try {
    const TEXT =
      'INSERT INTO public."Contacts" (name, descriptions) VALUES ($1, $2)';
    const VALUES = [name, descriptions];

    const result = await conex.query(TEXT, VALUES);

    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res
      .status(500)
      .send(`Error del servidor Crear Contact. ${error.message || error}`);
  }
};

export const PutUpdateContacts = async (req, res) => {
  const { id } = req.params;
  const { name, descriptions } = req.body;

  if (!name || !descriptions) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  try {
    const TEXT =
      'UPDATE public."Contacts" SET name = $1, descriptions = $2 WHERE id = $3';
    const VALUES = [name, descriptions, id];

    const result = await conex.query(TEXT, VALUES);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res
      .status(500)
      .send(`Error del servidor Actualizar Contact. ${error.message || error}`);
  }
};

export const DeleteContacts = async (req, res) => {
  const { id } = req.params;

  try {
    const TEXT = 'DELETE FROM public."Contacts" WHERE id = $1';
    const VALUES = [id];

    const result = await conex.query(TEXT, VALUES);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res
      .status(500)
      .send(`Error del servidor Eliminar Contact. ${error.message || error}`);
  }
};

export const GetContactByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).send('El nombre es requerido');
  }

  try {
    const TEXT = `SELECT * FROM public."Contacts" WHERE LOWER(name) LIKE LOWER ('%${name}%')`;
    //const VALUES = [name];

    const result = await conex.query(TEXT);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res
      .status(500)
      .send(`Error del servidor Obtener Contact por nombre.${error.message || error
        }`);
  }
};
