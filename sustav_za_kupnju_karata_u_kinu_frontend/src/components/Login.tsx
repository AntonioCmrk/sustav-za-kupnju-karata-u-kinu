import { useDispatch } from "react-redux";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";
import { login } from "../state/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch<any>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    setUsernameError(null);
    setPasswordError(null);

    if (!username.trim()) {
      setUsernameError("Username is incorrect");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is incorrect");
      isValid = false;
    }

    if (!isValid) return;
    dispatch(login(username, password));
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center [&>*]:text-quaternary-light">
      <div>Login</div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center max-w-48"
        >
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-gray-50 border text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {usernameError && (
              <span className="text-error">{usernameError}</span>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {passwordError && (
              <span className="text-error">{passwordError}</span>
            )}
          </div>

          <PrimaryButton
            type="submit"
            text="Sign in"
            className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          />
        </form>
      </div>
    </div>
  );
};
