import { V2_MetaFunction, useNavigate } from "@remix-run/react";
import Example from "~/components/Navbar";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div>
      <Example />
      <div className="flex flex-row items-center justify-center min-h-screen mx-20">
        {/* <h1 className="text-6xl font-bold">Welcome to your new Remix app</h1>
        <p className="mt-3 text-2xl">
          Everything seems to be working!{" "}
          <span role="img" aria-label="Party popper emoji">
            🎉
          </span>
        </p> */}
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex">
            <h1 className="text-6xl">Encuentra Información Judicial de Forma Rápida y Precisa</h1>
          </div>
          <div className="flex">
            <p className="mt-3 text-2xl text-gray-700">
              Simplifica tu búsqueda de expedientes y minimiza errores con nuestra plataforma inteligente.
            </p>
          </div>
          <div className="flex">
            <Link to="/boletin" className="rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Empezar
            </Link>
          </div>
        </div>
        <div className="flex">
          <img className="rounded-lg" src="https://pixabay.com/get/g2fc87b1db70b5017b4ea9772f099807afc7f77b41b95b3ada1368fcb31e7a8122c1762f66faba854e70b388029a15ee6652f108c613de79bc19af407fa87fbf97978f423b5432200f0c632598b7842f4_1920.jpg" alt="hero" />
        </div>
      </div>
    </div >
  );
}
