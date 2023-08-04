export default function Profile({user}) {

  return (
  <div className='flex flex-1 flex-col min-w-screen p-0 m-0 items-center'>
    {/* Draw a rectangle indigo behind profile photo */}
    <div className='flex flex-1 flex-col align-middle justify-start items-center bg-indigo-600 w-full max-h-52'>
    </div>
    {/* <div className='bg-white rounded-full -mt-16 w-28 h-28 text-center'> */}
    <img className='rounded-full -mt-14' src={user.photoURL} alt={user.displayName} />
    {/* </div> */}
    {/* Display the user information */}
    <div className='flex flex-1 flex-col align-middle justify-start items-center bg-white w-full mt-6'>
      <h1 className='text-2xl font-semibold text-gray-800'>{user.displayName}</h1>
      <p className='text-gray-500'>{user.email}</p>
    </div>
  </div>
  )
}