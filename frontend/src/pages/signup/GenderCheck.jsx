function GenderCheck({ register, errors }) {
  return (
    <div>
      <div className="flex gap-2 justify-center">
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="label-text">Male</span>
            <input
              {...register("gender", {
                required: "This field is required",
              })}
              type="checkbox"
              value="male"
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="label-text">Female</span>
            <input
              type="checkbox"
              {...register("gender", {
                required: "This field is required",
              })}
              value="female"
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
      </div>
      {errors?.gender?.message && (
        <p className="w-60 text-wrap  text-sm text-red-600">
          {errors.gender.message}
        </p>
      )}
    </div>
  );
}

export default GenderCheck;
