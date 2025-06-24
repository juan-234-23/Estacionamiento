import { useReducer, useState } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import ActivityList from "./components/ActivityList"
import Login from "./components/Login"
import ParkingSpots from "./components/ParkingSpots " 
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showParkingSpots, setShowParkingSpots] = useState(false)
  function toggleParkingSpots() {
    setShowParkingSpots(!showParkingSpots)
  }
  if (showParkingSpots) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <header className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-md py-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide drop-shadow">
              Servicio de Estacionamiento
            </h1>
            <button
              onClick={toggleParkingSpots}
              className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Volver
            </button>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
          <ParkingSpots />
        </main>
      </div>
    )
  }
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {!isAuthenticated ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <Login onLogin={handleLogin} />
          </div>
        </div>
      ) : (
        <>
          <header className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-md py-6">
            <div className="max-w-5xl mx-auto flex justify-center">
              <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide drop-shadow">
                Servicio de Estacionamiento
              </h1>
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
            <section className="bg-white/90 rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Bienvenido</h2>
              <Form dispatch={dispatch} state={state} />
            </section>
            <section className="bg-white/90 rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 ">Lista de Registros</h2>
              <ActivityList activities={state.activities} dispatch={dispatch} />
            </section>
          </main>
        </>
      )}
    </div>
  )
}
export default App