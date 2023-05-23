import { Link } from "@remix-run/react";

export default function Hero() {
    return (
        <div className="flex flex-col max-w-7xl mx-auto relative">
            <div className="flex flex-row sm:flex-nowrap md:flex-nowrap lg:flex-nowrap flex-wrap-reverse mt-10 relative z-2">
                <div className="flex flex-col items-center lg:items-start justify-center space-y-5 px-5 pb-5">
                    <div className="flex">
                        <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl">Expedientes Legales al Instante</h1>
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
                <div className="flex mb-5 px-20 py-0 sm:py-20 md:py-20 lg:py-0">
                    <img className="rounded-full object-cover" src="https://user-images.githubusercontent.com/60411196/239810294-c254cb9a-164d-43d2-91d8-46217d285ba3.jpg" alt="hero" />
                </div>
            </div>
            <div className="-z-10 flex w-0 h-0 right-0
                top-0 lg:top-10
                border-t-[8rem] sm:border-t-[35rem] md:border-t-[35rem] lg:border-t-[35rem] 
                border-r-[40rem] sm:border-r-[35rem] md:border-r-[35rem] lg:border-r-[35rem] 
                border-b-[0rem] sm:border-b-[0rem] md:border-b-[0rem] lg:border-b-[0rem] 
                border-t-indigo-600 sm:border-t-transparent md:border-t-transparent lg:border-t-transparent
                border-r-indigo-600
                border-b-transparent absolute">
            </div>
        </div >
    );
}