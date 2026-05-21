import { useForm } from "react-hook-form"
import type { RegisterCredentials } from "../types/auth.type"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { registerThunk } from "../api/authThunk";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onsubmit = async (data: RegisterCredentials) => {
    await dispatch(registerThunk(data));
    navigate("/login");
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-wide text-gray-900">
              Welcome<span className="font-semibold"> Back</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required"
                  },
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors text-gray-800 placeholder-gray-400"
                placeholder="hello@alpha.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required"
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors text-gray-800 placeholder-gray-400"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link
                  to="/login"
                  className="text-gray-900 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register