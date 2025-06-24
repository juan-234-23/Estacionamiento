import React, { useState } from "react"
type Spot = {
  id: number
  ocupado: boolean
}

const NUM_LUGARES = 12

const inicializarLugares = (): Spot[] =>
  Array.from({ length: NUM_LUGARES }, (_, i) => ({
    id: i + 1,
    ocupado: false,
  }))

const ParkingSpots: React.FC = () => {
  const [lugares, setLugares] = useState<Spot[]>(inicializarLugares())

  const toggleLugar = (id: number) => {
    setLugares((prev) =>
      prev.map((lugar) =>
        lugar.id === id ? { ...lugar, ocupado: !lugar.ocupado } : lugar
      )
    )
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Lugares de Estacionamiento</h2>
      <div className="grid grid-cols-4 gap-4">
        {lugares.map((lugar) => (
          <button
            key={lugar.id}
            onClick={() => toggleLugar(lugar.id)}
            className={`p-6 rounded-lg font-bold text-lg shadow transition ${
              lugar.ocupado
                ? "bg-red-500 text-white"
                : "bg-green-400 text-white hover:bg-green-500"
            }`}
          >
            {lugar.id}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <span className="mr-4">
          <span className="inline-block w-4 h-4 bg-green-400 rounded-full mr-1"></span>
          Disponible
        </span>
        <span>
          <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-1"></span>
          Ocupado
        </span>
      </div>
    </div>
  )
}

export default ParkingSpots