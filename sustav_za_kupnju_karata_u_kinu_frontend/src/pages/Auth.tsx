import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { PrimaryButton } from "../components/PrimaryButton";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className="[&>*]:flex [&>*]:bg-primary [&>*]:rounded-3xl [&>*]:h-[30rem] [&>*]:text-quaternary-light">
      {isLogin ? (
        <div className="[&>*]:p-8">
          <Login />
          <div className="bg-accent rounded-3xl flex flex-col justify-center items-center text-white">
            <div>You don't have account?</div>
            <div>Create one right now!</div>
            <PrimaryButton text="Join now" onClick={() => setIsLogin(false)} />
          </div>
        </div>
      ) : (
        <div className="[&>*]:p-8">
          <div className="bg-accent rounded-3xl flex flex-col justify-center items-center text-white">
            <div>Already ahve account?</div>
            <div>Plesase sign in.</div>
            <PrimaryButton text="Sign in" onClick={() => setIsLogin(true)} />
          </div>
          <Register />
        </div>
      )}
    </div>
  );
};
