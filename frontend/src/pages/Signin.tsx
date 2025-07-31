import SignInForm from "../components/SigninForm";

const SignInPage = () => {
  return (
    <div className="w-full min-h-screen flex p-2">

      <div className="flex flex-col w-full md:w-1/2 min-h-screen bg-white p-6">
        <div className="">
          <img src="/logo.png" className="w-24" alt="Logo" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <SignInForm />
        </div>
      </div>
      
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="/container.png"
          className="w-full h-full object-cover"
          alt="Container"
        />
      </div>
    </div>
  );
};

export default SignInPage;
