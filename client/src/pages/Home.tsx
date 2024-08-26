import useLogout from "../hooks/useLogout";

export default function Home() {
  const { logout } = useLogout();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
      <button
        onClick={logout}
        className={"px-6 py-3 font-semibold text-white rounded-md transition bg-blue-500 hover:bg-blue-600"}
      >
      Logout
      </button>
    </div>
  );
}
