import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../../validators/auth";
import { useLoginApiMutation } from "../../../redux/services/modules/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [loginApi] = useLoginApiMutation();

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    console.log('data ==>', data);
    
    setLoading(true);

    try {
      // API call - Uncomment and use when backend is ready
      // const result = await loginApi(data);
      // Expected response: { user: { name, email, role }, token: string }

      const mockApiResult = {
        name: "Moiz Ahmed",
        email: "moiz123@gmail.com",
        role: "admin",
      };

      dispatch(
        login({ user: mockApiResult, token: "kkkkk", isAuthinticated: true }),
      );

      toast.success(`Welcome back 👋`);

      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Decorative blobs */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "var(--primary)" }}
      />
      <div
        className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-10 translate-x-1/2 translate-y-1/2 blur-3xl"
        style={{ background: "var(--secondary)" }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-xl  border"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderColor: "rgba(20, 71, 230, 0.12)",
          }}
        >
          {/* Logo / Brand */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{ background: "var(--primary)" }}
            >
              <LogIn className="text-white" size={26} />
            </div>

            <h1
              className="font-heading text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Welcome Back
            </h1>

            <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "var(--foreground)" }}
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--primary)" }}
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all duration-200"
                  style={{
                    borderColor: errors.email
                      ? "#ef4444"
                      : "rgba(20, 71, 230, 0.2)",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = errors.email
                      ? "#ef4444"
                      : "var(--primary)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = errors.email
                      ? "#ef4444"
                      : "rgba(20, 71, 230, 0.2)")
                  }
                />
              </div>
              {errors.email && (
                <p className="text-xs text-error mt-1 pl-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "var(--foreground)" }}
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--primary)" }}
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all duration-200"
                  style={{
                    borderColor: errors.password
                      ? "#ef4444"
                      : "rgba(20, 71, 230, 0.2)",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = errors.password
                      ? "#ef4444"
                      : "var(--primary)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = errors.password
                      ? "#ef4444"
                      : "rgba(20, 71, 230, 0.2)")
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "#9ca3af" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-error mt-1 pl-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forget-password"
                className="text-sm font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-70"
              style={{
                background: "var(--primary)",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn size={17} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
