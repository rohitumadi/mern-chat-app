function GenderCheck() {
  return (
    <div className="flex gap-2 justify-center">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheck;
