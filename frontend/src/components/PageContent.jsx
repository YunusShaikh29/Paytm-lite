import { useNavigate } from "react-router-dom";

function PageContent({ title, children, status }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center relative">
        <h1 className="text-[35vh] md:text-[75vh] text-zinc-800 select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          {status}
        </h1>
        <h2 className="text-3xl text-zinc-300 md:text-5xl mb-2">{title}</h2>
        <div className="text-2xl text-zinc-300 md:text-4xl mb-4">{children}</div>
        <button
          onClick={handleGoBack}
          className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Take me back
        </button>
      </div>
    </div>
  );
}

export default PageContent;
