import RegisterLinks from "./components/__atoms/RegisterLinks/RegisterLinks";
import RegisterPG from "./components/__organisms/RegisterPG/RegisterPG";

export const metadata = {
  title: "X. it's what's happening / X",
  description: "register page",
};

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen h-auto bg-black flex flex-col items-center justify-between pb-[8px]  ">
        <div className="h-[80px] w-full bg-transparent max-[1060px]:hidden"></div>
        <RegisterPG />
        <RegisterLinks />
      </div>
    </>
  );
}
