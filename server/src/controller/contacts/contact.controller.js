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