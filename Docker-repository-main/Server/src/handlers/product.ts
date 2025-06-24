import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.json({ message: 'Producto agregado correctamente', data: product });
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    const transformedProducts = products.map(product => ({
      ...product.toJSON(),
      disponibility: product.disponibility ? 'T' : 'F',
    }));
    res.json({ message: 'Productos obtenidos correctamente', data: transformedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json({ message: 'Producto obtenido correctamente', data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await Product.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const updatedProduct = await Product.findByPk(id);
    res.json({ message: 'Producto actualizado correctamente', data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    await product.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const resetAutoIncrement = async (req: Request, res: Response) => {
  try {
    await Product.sequelize?.query('ALTER TABLE `product` AUTO_INCREMENT = 1');
    res.json({ message: 'Auto-increment reiniciado correctamente' });
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: 'Error al reiniciar el auto-increment' });
  }
};