import GoogleIcon from '../../utils/images/btn_google_light_normal_ios.svg';

export default function GoogleLogin({handleClick}) {

  return (
  <div className='flex flex-col min-w-screen min-h-screen p-0 m-0'>
    <div className='flex flex-1 flex-col align-middle justify-center items-center'>
      <p className='text-2xl text-center'>Inicia sesión para continuar</p>
      <button className='border border-slate-200 bg-white text-slate-500 shadow pr-4 mt-6 rounded-sm break-inside-avoid min-w-fit max-w-xs max-h-12 hover:scale-105 active:scale-100 active:bg-slate-200' onClick={handleClick}>
        <img className='inline-block' src={GoogleIcon} alt='Google Icon'/> Iniciar sesión con Google
      </button>
    </div>
  </div>
  )
}