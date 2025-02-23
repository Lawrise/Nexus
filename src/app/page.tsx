"use client";
import DarkModeToggle from "@/components/header/darkmodeToggle";
import CustomTrigger from "@/components/sidebar/customTriger";
import Tiptap from "@/components/editor/Tiptap";

export default function Home() {
  return (
    <>
      <header className="ml-16 z-10 border-b-2 w-full h-10 border-solid bg-white dark:bg-dark_background_primary border-dark_background_light p-2 flex justify-between dark:border-text_primary text-text_primary fixed top-0 right-0">
        <CustomTrigger hideWhenOpen={true} />
        <div>
          <DarkModeToggle />
        </div>
      </header>
      <div className="mt-12 p-2 h-full">
        {" "}
        {/* 3rem accounts for header height (h-10) + margin-top (mt-12) */}
        <Tiptap />
      </div>
    </>
  );
}
