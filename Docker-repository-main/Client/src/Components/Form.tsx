import { categories } from "../data/categories";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Activity } from "../Types";

//tenemos un componente y lo estamos exportando
export default function Form() {
  const isValidActivity = () => {
    const { name, calorias } = activity;
    return name.trim() !== "" && calorias > 0;
  };

  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calorias: 0,
  });

  // Estado para almacenar los registros y cargarlos desde localStorage
  const [records, setRecords] = useState<Activity[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null); // Estado para manejar el índice del registro en edición

  // Función para cargar los registros desde localStorage al montar el componente
  useEffect(() => {
    const storedRecords = localStorage.getItem("records");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  }, []);

  // Función para guardar los registros en localStorage
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [records]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calorias"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidActivity()) {
      if (editIndex !== null) {
        // Actualizar el registro en edición
        const updatedRecords = records.map(
          (record, index) => (index === editIndex ? { ...activity } : record) // Crear una copia del objeto actualizado
        );
        setRecords(updatedRecords); // Actualizar el estado de los registros
        setEditIndex(null); // Salir del modo de edición
      } else {
        // Agregar un nuevo registro
        setRecords([...records, { ...activity }]); // Crear una copia del objeto antes de agregarlo
      }

      // Reiniciar el formulario
      setActivity({ category: 1, name: "", calorias: 0 });
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index); // Establecer el índice del registro en edición
    setActivity({ ...records[index] }); // Crear una copia del registro para evitar mutaciones directas
  };

  const handleDelete = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords); // Eliminar el registro seleccionado
  };

  const handleClearRecords = () => {
    setRecords([]); // Limpiar la lista de registros
    localStorage.removeItem("records"); // Limpiar los registros en localStorage
  };

  return (
    <>
      <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">
            Servicio :
          </label>
          <select
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Nombre del cliente :
          </label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ingresa el nombre del cliente"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calorias" className="font-bold">
            Precio:
          </label>
          <input
            id="calorias"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Cantidad a pagar $"
            value={activity.calorias}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="bg-blue-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={
              editIndex !== null ? "Actualizar registro" : "Guardar registro"
            }
            disabled={!isValidActivity()}
          />
        </div>
      </form>
      <div className="mt-10 text-center">
        <h2 className="text-lg font-bold text-blue-600">Registros:</h2>

        {records.length === 0 ? (
          <p className="text-white font-bold">
            No hay registros aún. / Sin registros.
          </p>
        ) : (
          <ul className="space-y-3">
  {records.map((record, index) => (
    <li
      key={index}
      className="border border-blue-300 bg-white p-4 rounded-lg shadow-md mx-auto max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        {/* Servicio */}
        <div className="bg-blue-100 p-3 rounded-lg">
          <h3 className="font-bold text-blue-800">Servicio</h3>
          <p className="text-blue-600">
            {categories.find((cat) => cat.id === record.category)?.name}
          </p>
        </div>
        
        {/* Nombre */}
        <div className="bg-green-100 p-3 rounded-lg">
          <h3 className="font-bold text-green-800">Nombre</h3>
          <p className="text-green-600">{record.name}</p>
        </div>
        
        {/* Precio */}
        <div className="bg-purple-100 p-3 rounded-lg">
          <h3 className="font-bold text-purple-800">Precio</h3>
          <p className="text-purple-600">${record.calorias}</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded transition-colors"
          onClick={() => handleEdit(index)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition-colors"
          onClick={() => handleDelete(index)}
        >
          Eliminar
        </button>
      </div>
    </li>
  ))}
</ul>
        )}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleClearRecords}
        >
          Limpiar registros
        </button>
      </div>
    </>
  );
}
