import { Link } from "@remix-run/react";

export default function Hero() {
    return (
        <div className="flex flex-col h-screen">

            <div className="flex flex-row items-center justify-center sm:flex-nowrap md:flex-nowrap lg:flex-nowrap flex-wrap-reverse flex-1">
                <div className="flex flex-col items-center justify-center space-y-5 px-5 pb-5">
                    <div className="flex">
                        <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl">Encuentra Información Judicial de Forma Rápida y Precisa</h1>
                    </div>
                    <div className="flex">
                        <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-gray-700">
                            Simplifica tu búsqueda de expedientes y minimiza errores con nuestra plataforma inteligente.
                        </p>
                    </div>
                    <div className="flex">
                        <Link to="/boletin" className="rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Empezar
                        </Link>
                    </div>
                </div>
                <div className="flex p-5">
                    <img className="rounded-lg object-contain" src="https://user-images.githubusercontent.com/60411196/239140174-f9276e61-69e5-4a02-aeee-2a92271bd0ee.jpg" alt="hero" />
                </div>
            </div>
        </div >
    );
}