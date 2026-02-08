const Header = ({ search, setSearch, user, setPage, handleLogout }) => {
  return (
    <header className="flex justify-between items-center mb-10 px-4 py-3 bg-white shadow-md rounded-lg">

      
      <div>
        <h1 className="text-3xl font-bold text-indigo-700">
          Task<span className="text-indigo-500">App</span>
        </h1>
        <p className="text-gray-500 text-sm">Your thoughts, goals, organized</p>
      </div>

      
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none 
        focus:ring-2 focus:ring-indigo-300 w-60"
      />

      
      <div className="flex gap-3">
        
        {!user ? (
          <>
            <button
              onClick={() => setPage("login")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Login
            </button>

            <button
              onClick={() => setPage("signup")}
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50"
            >
              Signup
            </button>
          </>
        ) : (
         
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

    </header>
  );
};

export default Header;
