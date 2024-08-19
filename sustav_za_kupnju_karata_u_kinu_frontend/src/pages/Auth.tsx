import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className="[&>*]:flex [&>*]:bg-primary [&>*]:rounded-3xl [&>*]:h-[30rem] [&>*]:text-quaternary-light my-16">
      {isLogin ? (
        <div className="[&>*]:p-8">
          <Login />
          <div className="bg-accent rounded-3xl flex flex-col justify-center items-center text-white">
            <div>You don't have account?</div>
            <div>Create one right now!</div>
            <button
              onClick={() => setIsLogin(false)}
              className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg border border-white m-8"
            >
              Join now
            </button>
          </div>
        </div>
      ) : (
        <div className="[&>*]:p-8">
          <div className="bg-accent rounded-3xl flex flex-col justify-center items-center text-white">
            <div>Already ahve account?</div>
            <div>Plesase sign in.</div>
            <button
              onClick={() => setIsLogin(true)}
              className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg border border-white m-8"
            >
              Sign in
            </button>
          </div>
          <Register />
        </div>
      )}
    </div>
  );
};
