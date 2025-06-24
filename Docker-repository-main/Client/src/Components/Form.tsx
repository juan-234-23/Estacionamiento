import { categories } from "../data/categories"
import { Activity } from "../types"
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { ActivityActions, ActivityState } from "../reducers/activity-reducers"
import { v4 as uuidv4 } from 'uuid'

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 20,
    color: '',
    marca: '',
    placa: '',
    
}

export default function Form({ dispatch, state }: FormProps) {
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.find(act => act.id === state.activeId)
            if (selectedActivity) {
                setActivity(selectedActivity)
            }
        }
    }, [state.activeId, state.activities])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        return activity.name.trim() !== '' && activity.calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state.activeId) {
            dispatch({ type: 'update-activity', payload: { updatedActivity: activity } })
        } else {
            dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        }

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    const handleDelete = (id: string) => {
        dispatch({ type: 'delete-activity', payload: { id } })
    }

    const handleEdit = (id: string) => {
        dispatch({ type: 'set-active-id', payload: { id } })
    }
    return (
        <>
            <header className="bg-indigo-700 py-5 shadow-md">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-white uppercase">
                        Sistema de Estacionamiento San Felipe del Progreso
                    </h1>
                </div>
            </header>

            <section className="bg-gray-100 py-10 px-4 min-h-screen">
                <div className="max-w-4xl mx-auto space-y-10">
                    {/* Formulario */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-slate-200"
                    >
                        <h2 className="text-xl font-bold text-gray-800">Registrar Automóvil</h2>

                        <div>
                            <label htmlFor="category" className="block font-semibold mb-1">Tipo de servicio</label>
                            <select
                                id="category"
                                className="w-full border border-slate-300 p-3 rounded-lg"
                                value={activity.category}
                                onChange={handleChange}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                         <div> 
                         <label htmlFor="name" className="block font-semibold mb-1">Automóvil</label>
                          <select
                          id="name"
                          className="w-full border border-slate-300 p-3 rounded-lg bg-white"
                          value={activity.name}
                          onChange={handleChange} >
                          <option value="">-- Selecciona un tipo --</option>
                          <option value="Carro">Carro</option>
                          <option value="Taxi">Taxi</option>
                          <option value="Camión">Camión</option>
                          <option value="Moto">Moto</option>
                          </select>
                        </div>

                        <div> 
                         <label htmlFor="color" className="block font-semibold mb-1">Color</label>
                         <input
                          id="color"
                            type="text"
                           className="w-full border border-slate-300 p-3 rounded-lg bg-white"
                            value={activity.color} 
                             onChange={handleChange}
                            placeholder="Azul, Rojo, Verde, etc."
                        />
                        </div>
                        <div> 
                         <label htmlFor="marca" className="block font-semibold mb-1">Marca</label>
                         <input
                          id="marca"
                            type="text"
                           className="w-full border border-slate-300 p-3 rounded-lg bg-white"
                            value={activity.marca} 
                             onChange={handleChange}
                            placeholder="Ej. Toyota, Ford, Honda, etc."
                        />
                        </div>

                        <div> 
                         <label htmlFor="placa" className="block font-semibold mb-1">Placa</label>
                         <input
                          id="placa"
                            type="text"
                           className="w-full border border-slate-300 p-3 rounded-lg bg-white"
                            value={activity.placa} 
                             onChange={handleChange}
                            placeholder="Ej. ABC-1234"
                        />
                        </div>


                        <div>
                            <label htmlFor="calories" className="block font-semibold mb-1">Precio</label>
                            <input
                                id="calories"
                                type="number"
                                min={20}
                                className="w-full border border-slate-300 p-3 rounded-lg"
                                placeholder="Ej. 300 o 500"
                                value={activity.calories}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="submit"
                            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white p-3 rounded-lg font-bold uppercase transition"
                            value={state.activeId ? "Modificar Automóvil" : "Registrar Automóvil"}
                            disabled={!isValidActivity()}
                        />
                    </form>

                    {/* Tabla de registros */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Registros</h2>
                        {state.activities.length === 0 ? (
                            <p className="text-gray-500">No hay registros aún.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border border-slate-300">
                                    <thead className="bg-slate-100 text-slate-700">
                                        <tr>
                                            <th className="p-3">Automovil</th>
                                            <th className="p-3">Tipo</th>
                                            <th className="p-3">Color</th>
                                            <th className="p-3">Marca</th>
                                            <th className="p-3">Placa</th>
                                            <th className="p-3">Precio</th>
                                            <th className="p-3 text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.activities.map(act => (
                                            <tr key={act.id} className="border-t border-slate-200">
                                                <td className="p-3">{act.name}</td>
                                                <td className="p-3">{categories.find(c => c.id === act.category)?.name}</td>
                                                <td className="p-3">{act.color}</td>
                                                <td className="p-3">{act.marca}</td>
                                                 <td className="p-3">{act.placa}</td>
                                                <td className="p-3">${act.calories}</td>
                                                <td className="p-3 flex gap-2 justify-center">
                                                    <button
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition" 
                                                        onClick={() => handleEdit(act.id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                                                       onClick={() => handleDelete(act.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
