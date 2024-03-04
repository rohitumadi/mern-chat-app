import { Link, useNavigate } from "react-router-dom";
import GenderCheck from "./GenderCheck";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";

function Signup() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, loading, rateLimitReached } = useSignup();

  const navigate = useNavigate();
  if (rateLimitReached) {
    navigate("/rate-limit");
    return;
  }
  async function onSubmit(inputs) {
    await signup(inputs);
  }

  return (
    <div className="flex justify-center min-w-96 ">
      <div className=" border-2 border-primary rounded-lg p-6 shadow-lg shadow-primary">
        <h1 className="text-primary text-2xl mb-5 text-center">
          Sign in to Chatify
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="input input-bordered input-primary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                {...register("fullName", {
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z]+( [a-zA-Z]+)?$/,
                    message:
                      "Only Alphabets allowed and no trailing spaces allowed",
                  },

                  minLength: {
                    value: 3,
                    message: "Full Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Max characters reached",
                  },
                })}
                className="grow"
                placeholder="Full Name"
              />
            </label>
            {errors?.fullName?.message && (
              <p className="w-60 text-wrap my-1  text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label className="input input-bordered input-primary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                {...register("username", {
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
                    message: "Invalid Username",
                  },

                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Max characters reached",
                  },
                })}
                className="grow"
                placeholder="Username"
              />
            </label>
            {errors?.username?.message && (
              <p className="w-60 text-wrap my-1  text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="input input-primary input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Max characters reached",
                  },
                })}
                placeholder="Password"
                className="grow"
              />
            </label>
            {errors?.password?.message && (
              <p className="w-60 text-wrap my-1  text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="input input-primary input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "This field is required",
                  maxLength: 20,
                })}
                placeholder="Confirm Password"
                className="grow"
              />
            </label>
            {errors?.confirmPassword?.message && (
              <p className="w-60 text-wrap my-1  text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <GenderCheck register={register} errors={errors} />
          <input
            {...register("profilePic", {
              validate: {
                lessThan200KB: (files) =>
                  files[0]?.size < 200 * 1000 || "Max 200kb",
                // acceptedFormats: (files) =>
                //   ["image/jpeg", "image/png", "image/gif"].includes(
                //     files[0]?.type
                //   ) || "Only PNG, JPEG e GIF"
              },
            })}
            // onChange={handleFileChange}
            type="file"
            className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
          />
          {errors?.profilePic?.message && (
            <p className="w-60 text-wrap my-1  text-sm text-red-600">
              {errors.profilePic.message}
            </p>
          )}
          <Link to="/login" className="link link-primary link-hover text-sm">
            Already have an account?
          </Link>
          <div className="text-center">
            <button
              disabled={loading}
              className="btn btn-sm btn-block btn-outline btn-primary"
            >
              {loading ? (
                <span className="loading loading-spinner text-primary mr-2"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
