import { Router, Request, Response, NextFunction } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  resetAutoIncrement
} from './handlers/product';
import {
  createClient,
  getClients,
  getClientById,
  updateClientById,
  deleteClient
} from './handlers/client';
import { body, param } from 'express-validator';
import { handleInputerrors } from './middleware';

const router = Router();
router.get('/clients', (req, res) => {
  res.json({ message: '¡Funciona!' });
});
// Helper to wrap async route handlers
function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// -------------------- PRODUCT ROUTES --------------------

// Crear un producto
router.post(
  '/products',
  body('name').notEmpty().withMessage("Name is required"),
  body('price')
    .notEmpty().withMessage("El precio del producto no puede ir vacío")
    .isNumeric().withMessage("Valor no válido")
    .custom(value => value > 0).withMessage("El precio no válido"),
  handleInputerrors,
  createProduct
);

// Obtener todos los productos
router.get('/products', getProducts);

// Obtener un producto por ID
router.get(
  '/products/:id',
  param('id').isInt().withMessage("El id debe ser un número entero"),
  handleInputerrors,
  getProductById
);

// Actualizar un producto completamente por ID
router.put(
  '/products/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('name').optional().isString().withMessage('El nombre debe ser una cadena de texto'),
  body('price').optional().isNumeric().withMessage('El precio debe ser un número'),
  body('disponibility').optional().isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
  handleInputerrors,
  updateProductById
);

// Actualización parcial de un producto
router.patch(
  '/products/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('name').optional().isString().withMessage('El nombre debe ser una cadena de texto'),
  body('price').optional().isNumeric().withMessage('El precio debe ser un número'),
  body('disponibility').optional().isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
  handleInputerrors,
  updateProductById
);

// Eliminar un producto por ID
router.delete(
  '/products/:id',
  param('id').isInt().withMessage("El id debe ser un número entero"),
  handleInputerrors,
  deleteProduct
);

// Resetear autoincremento
router.post('/reset-auto-increment', resetAutoIncrement);

// -------------------- CLIENT ROUTES --------------------

// Crear un cliente
router.post(
  '/clients',
  body('nombre').notEmpty().withMessage("El nombre es obligatorio"),
  body('apellido').notEmpty().withMessage("El apellido es obligatorio"),
  body('telefono').notEmpty().withMessage("El teléfono es obligatorio"),
  handleInputerrors,
  asyncHandler(createClient)
);
// Obtener un cliente por ID
router.get(
  '/clients/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  handleInputerrors,
  asyncHandler(getClientById)
);

// Actualizar un cliente completamente
router.put(
  '/clients/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('nombre').optional().isString().withMessage('El nombre debe ser una cadena de texto'),
  body('apellido').optional().isString().withMessage('El apellido debe ser una cadena de texto'),
  body('telefono').optional().isString().withMessage('El teléfono debe ser una cadena de texto'),
  handleInputerrors,
  asyncHandler(updateClientById)
);

// Actualización parcial de cliente
router.patch(
  '/clients/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('nombre').optional().isString().withMessage('El nombre debe ser una cadena de texto'),
  body('apellido').optional().isString().withMessage('El apellido debe ser una cadena de texto'),
  body('telefono').optional().isString().withMessage('El teléfono debe ser una cadena de texto'),
  handleInputerrors,
  asyncHandler(updateClientById)
);

// Eliminar cliente
router.delete(
  '/clients/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  handleInputerrors,
  asyncHandler(deleteClient)
);
export default router;

