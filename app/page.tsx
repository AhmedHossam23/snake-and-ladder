import { Button } from "@/components/ui/button";
import Board from "./components/board";

export default function Page() {
  return (
    <div className="flex flex-col h-full w-full justify-between max-w-7xl mx-auto min-w-[300px]">
      <h1 className="text-4xl underline decoration-pink-500 py-4">Educational Snake and Ladder</h1>
      <Board />
      <span className="text-slate-800/40 flex items-center justify-center py-4 w-full">
        all rights reserved &copy; {new Date().getFullYear()}
      </span>
    </div>
  );
}
