import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("SIGN UP");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    lower: false,
    upper: false,
    digit: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  // validation regexes (shared with submit handler)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const { login } = useContext(AuthContext);

  const validatePasswordRules = (pwd) => {
    return {
      length: pwd.length >= 8,
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      digit: /\d/.test(pwd),
      special: /[@$!%*?&]/.test(pwd),
    };
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // client-side validation
    let ok = true;
    if (!emailRegex.test(email)) {
      if (!email.includes("@")) setEmailError("Email must include '@' symbol");
      else if (!email.split("@")[1]?.includes("."))
        setEmailError("Email domain must include a dot (e.g. gmail.com)");
      else setEmailError("Invalid email format");
      ok = false;
    }

    const rules = validatePasswordRules(password);
    setPasswordRules(rules);
    if (Object.values(rules).includes(false)) {
      setPasswordError(
        currState === "SIGN UP"
          ? "Password does not meet the requirements"
          : "Wrong Password",
      );
      ok = false;
    }

    if (!ok) return;
    // clear any previous errors
    setEmailError("");
    setPasswordError("");

    login(currState === "SIGN UP" ? "SIGN UP" : "LOGIN", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col px-4 py-8">
      {/* -------- left -------- */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/40 bg-white/10 p-6 shadow-[0_0_35px_rgba(34,211,238,0.25)] backdrop-blur-xl before:absolute before:inset-0 before:rounded-[28px] before:border before:border-cyan-300/20 before:animate-pulse motion-safe:animate-[bounce_6s_infinite]">
        <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),_transparent_55%)]" />
        <div className="relative flex items-center gap-3">
          <img
            src="/app-icon.svg"
            alt="AnyTime logo"
            className="w-14 h-14 rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.35)] ring-1 ring-cyan-300/40"
          />
          <div>
            <p className="text-white text-4xl font-bold drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]">
              AnyTime
            </p>
          </div>
        </div>
      </div>

      {/* -------- right -------- */}

      <form
        onSubmit={onSubmitHandler}
        className="relative w-full max-w-md overflow-hidden border border-cyan-400/40 bg-slate-950/40 p-4 flex flex-col gap-4 rounded-[20px] shadow-[0_0_30px_rgba(34,211,238,0.18),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl before:absolute before:inset-0 before:rounded-[20px] before:border before:border-cyan-300/20 before:animate-pulse motion-safe:animate-[float_5.5s_ease-in-out_infinite]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_45%)]" />
        <div className="relative flex flex-col gap-4">
          <h2 className="font-medium text-2xl flex justify-between items-center text-slate-100">
            <span className="underline decoration-cyan-400/70 underline-offset-4">
              {currState}
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {currState === "SIGN UP" && (
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                className="p-2 border border-cyan-400/20 rounded-md bg-slate-900/40 text-white placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300/60"
                placeholder="Full Name"
                required
              />
            )}

            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className={`p-2 rounded-md bg-slate-900/40 text-white placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-400 ring-1 ring-red-400"
                  : email && emailRegex.test(email)
                    ? "border-green-400 ring-1 ring-green-400"
                    : "border border-cyan-400/20 focus:ring-cyan-400 focus:border-cyan-300/60"
              }`}
            />
            <div className="relative">
              <input
                onChange={(e) => {
                  const v = e.target.value;
                  setPassword(v);
                  setPasswordError("");
                  setPasswordRules(validatePasswordRules(v));
                }}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className={`w-full p-2 rounded-md bg-slate-900/40 text-white placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  passwordError
                    ? "border-red-400 ring-1 ring-red-400"
                    : password && passwordRegex.test(password)
                      ? "border-green-400 ring-1 ring-green-400"
                      : "border border-cyan-400/20 focus:ring-cyan-400 focus:border-cyan-300/60"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.6 2.7-4.74 4.78-6.17" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2">
              {passwordError && (
                <p className="text-sm text-red-400">{passwordError}</p>
              )}
              {currState === "SIGN UP" && (
                <ul className="text-sm mt-2 grid grid-cols-1 gap-1">
                  <li
                    className={
                      passwordRules.length ? "text-green-400" : "text-slate-400"
                    }
                  >
                    {passwordRules.length ? "✓" : "●"} At least 8 characters
                  </li>
                  <li
                    className={
                      passwordRules.upper ? "text-green-400" : "text-slate-400"
                    }
                  >
                    {passwordRules.upper ? "✓" : "●"} One uppercase letter
                  </li>
                  <li
                    className={
                      passwordRules.lower ? "text-green-400" : "text-slate-400"
                    }
                  >
                    {passwordRules.lower ? "✓" : "●"} One lowercase letter
                  </li>
                  <li
                    className={
                      passwordRules.digit ? "text-green-400" : "text-slate-400"
                    }
                  >
                    {passwordRules.digit ? "✓" : "●"} One number
                  </li>
                  <li
                    className={
                      passwordRules.special
                        ? "text-green-400"
                        : "text-slate-400"
                    }
                  >
                    {passwordRules.special ? "✓" : "●"} One special character
                    (@$!%*?&)
                  </li>
                </ul>
              )}
            </div>
          </div>

          {currState === "SIGN UP" && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={3}
              className="p-2 border border-cyan-400/20 rounded-md bg-slate-900/40 text-white placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300/60"
              placeholder="Provide a short bio..."
              required
            ></textarea>
          )}

          <button
            type="submit"
            className="py-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-white rounded-xl cursor-pointer font-semibold shadow-[0_0_16px_rgba(34,211,238,0.22)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
          >
            {currState === "SIGN UP" ? "Create Account" : "Login Now"}
          </button>

          <div className="flex flex-col gap-2">
            {currState === "SIGN UP" ? (
              <p className="text-sm text-slate-300">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("LOGIN");
                    setEmailError("");
                    setPasswordError("");
                  }}
                  className="font-medium text-cyan-300 cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-slate-300">
                Create an account{" "}
                <span
                  onClick={() => {
                    setCurrState("SIGN UP");
                    setEmailError("");
                    setPasswordError("");
                  }}
                  className="font-medium text-cyan-300 cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
