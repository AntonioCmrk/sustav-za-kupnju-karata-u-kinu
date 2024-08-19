import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../state/auth/authSlice";
import { PrimaryButton } from "./PrimaryButton";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (username.length < 1) {
      setUsernameError("Username is required");
      isValid = false;
    }
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    dispatch(register({ email, username, password }));
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center [&>label]:text-quaternary-light">
      <div>Register</div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center max-w-48"
        >
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {emailError && <span className="text-error">{emailError}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {usernameError && (
              <span className="text-error">{usernameError}</span>
            )}
          </div>

          <div className="mb-4">
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

          <div className="mb-8">
            <label htmlFor="confirm_password">Confirm password</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {confirmPasswordError && (
              <span className="text-error">{confirmPasswordError}</span>
            )}
          </div>

          <PrimaryButton
            type="submit"
            text="Register"
            className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          />
        </form>
      </div>
    </div>
  );
};
