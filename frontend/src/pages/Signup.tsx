import SignUpForm from '../components/SignUpForm'

const SignupPage = () => {
  return (
    <div className='w-full min-h-screen flex p-2'>
        <div className="flex flex-col w-full md:w-1/2 min-h-screen">

        <div className="mb-8 p-2">
          <img src="/logo.png" className="w-16 md:w-24" alt="Logo" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <SignUpForm />
        </div>
        </div>

        <div className="hidden md:block w-1/2 h-full">
        <img src="/container.png" className="w-full min-h-screen object-cover" alt="Container" />
        </div>
    </div>
  )
}

export default SignupPage