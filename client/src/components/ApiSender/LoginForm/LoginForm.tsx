import { useState, FormEvent } from "react";
import { loginService } from "../../../services/login";

interface LoginFormProps {
  onLogin: (user: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginService({ username, password });
    onLogin(response.token);
    setUsername("");
    setPassword("");
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm z-50">
        <div className="w-150 h-125 bg-black rounded-2xl backdrop-blur-sm">
          <div className="flex justify-center mt-15">
            <h1 className="text-2xl font-semibold text-white">Sign in your account</h1>
          </div>
          <form className="space-y-6 m-10" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block font-medium text-gray-100 text-sm/6">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={username}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block font-medium text-gray-100 text-sm/6">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
