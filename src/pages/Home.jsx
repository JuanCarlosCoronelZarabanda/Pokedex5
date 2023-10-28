import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/trainerName.slice"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setTrainerName(e.target.trainerName.value));
        navigate("/pokedex");
    };

    return (
        <main className="h-screen grid grid-rows-[1fr_auto] gap-3">
            <section className="grid place-content-center text-center">

                <div>
                    <div>
                        <img src="/images/logo.png" alt="" />
                    </div>
                    <h3 className="text-4xl text-[#DD1A1A] font-bold">Hi Coach!</h3>
                    <p className="text-xl py-1 font-bold">To start give me your name: </p>
                    <form onSubmit={handleSubmit}>
                        <input name="trainerName" type="text" placeholder="Your name..." className="w-60 h-15 border-[2px] border-gray-200 bg-white p-2 " />
                        <button className=" hover:text-black w-[100px]  hover:bg-red-500 bg-red-700 text-white py-2 px-4 h-[45px] shadow-md">Start!</button>
                    </form>
                </div>

            </section>
            <footer className="bg-yellow">
                <div className="bg-red-600 h-14"></div>
                <div className="bg-black h-12">
                    <div className="h-[70px] w-[70px] bg-white border-8 border-black rounded-full absolute left-1/2 -translate-y-1/2 grid place-items-center">
                        <div className="w-9 h-9 rounded-full  bg-slate-700 border-[6px] border-black"></div>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default Home