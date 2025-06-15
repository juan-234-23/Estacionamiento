import Form from "./Components/Form"


function App() {
 

  return (
    <>
      <header className="bg-gray-800 py-3">
        <div className="max-w-5x1 mx-auto flex justify-between ">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            ESTACIONAMIENTO
            </h1>
        
        </div>
      </header>
      <section className="bg-gray-700 py-20 px-5 ">
        
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>

      </section>
    </>
  )
}

export default App
