import { categories } from "../data/categories";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Activity } from "../Types";

export default function Form() {
  const isValidActivity = () => {
    const { name, calorias, color, placa } = activity;
    return (
      name.trim() !== "" &&
      color.trim() !== "" &&
      placa.trim() !== "" &&
      calorias > 0
    );
  };

  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calorias: 0,
    color: "",
    placa: "",
  });

  const [records, setRecords] = useState<Activity[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedRecords = localStorage.getItem("records");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  }, []);

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
        const updatedRecords = records.map((record, index) =>
          index === editIndex ? { ...activity } : record
        );
        setRecords(updatedRecords);
        setEditIndex(null);
      } else {
        setRecords([...records, { ...activity }]);
      }

      setActivity({
        category: 1,
        name: "",
        calorias: 0,
        color: "",
        placa: "",
      });
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setActivity({ ...records[index] });
  };

  const handleDelete = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleClearRecords = () => {
    setRecords([]);
    localStorage.removeItem("records");
  };

  return (
    <>
      <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* Categoría */}
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

        {/* Nombre */}
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

        {/* Color */}
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="color" className="font-bold">
            Color del vehículo:
          </label>
          <input
            id="color"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Rojo, Azul, Negro"
            value={activity.color}
            onChange={handleChange}
          />
        </div>

        {/* Placa */}
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="placa" className="font-bold">
            Placa del vehículo:
          </label>
          <input
            id="placa"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ejemplo: ABC-1234"
            value={activity.placa}
            onChange={handleChange}
          />
        </div>

        {/* Precio */}
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
                className="border border-blue-300 bg-white p-4 rounded-lg shadow-md mx-auto max-w-4xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
                  {/* Servicio */}
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <h3 className="font-bold text-blue-800">Autolavado</h3>
                    <p className="text-blue-600">
                      {categories.find((cat) => cat.id === record.category)
                        ?.name}
                    </p>
                  </div>

                  {/* Nombre */}
                  <div className="bg-green-100 p-3 rounded-lg">
                    <h3 className="font-bold text-green-800">Nombre</h3>
                    <p className="text-green-600">{record.name}</p>
                  </div>

                  {/* Color */}
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <h3 className="font-bold text-yellow-800">Color</h3>
                    <p className="text-yellow-600">{record.color}</p>
                  </div>

                  {/* Placa */}
                  <div className="bg-red-100 p-3 rounded-lg">
                    <h3 className="font-bold text-red-800">Placa</h3>
                    <p className="text-red-600">{record.placa}</p>
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleClearRecords}
        >
          Limpiar registros
        </button>
      </div>
    </>
  );
}
