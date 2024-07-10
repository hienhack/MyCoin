function DefaultLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <SideBar />
      <div className="min-h-screen bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
