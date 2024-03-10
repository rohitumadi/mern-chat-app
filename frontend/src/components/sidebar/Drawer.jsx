import DrawerSide from "./DrawerSide";

function Drawer() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button btn-sm w-full "
        >
          Search Users
        </label>
      </div>
      <DrawerSide />
    </div>
  );
}

export default Drawer;
