import { Request, Response } from "express";
import Client from "../models/Client.model";

export const createClient = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { nombre, apellido, telefono } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !apellido || !telefono) {
       res.status(400).json({ error: 'Los campos nombre, apellido y telefono son obligatorios' });
    }

    // Crear el cliente solo con los campos permitidos
    const client = await Client.create({ nombre, apellido, telefono });

    res.status(201).json({ message: 'Cliente agregado correctamente', data: client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll(); // Asegúrate de que el modelo Client esté definido
    res.json({ message: 'Clientes obtenidos correctamente', data: clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente obtenido correctamente', data: client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Solo permitir actualizar los campos permitidos
    const { nombre, apellido, telefono } = req.body;
    const updateData: any = {};
    if (nombre !== undefined) updateData.nombre = nombre;
    if (apellido !== undefined) updateData.apellido = apellido;
    if (telefono !== undefined) updateData.telefono = telefono;

    const updatedClient = await Client.update(updateData, {
      where: { id },
      returning: true,
    });

    if (updatedClient[0] === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente actualizado correctamente', data: updatedClient[1][0] });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



