
"use client";
import DarkModeToggle from "@/components/header/darkmodeToggle";
import CustomTrigger from "@/components/sidebar/customTriger";

export default function Home() {
  return (
    <>
      <header className="border-b-2 w-full h-10 border-solid bg-white dark:bg-dark_background_primary border-dark_background_light p-2 flex justify-between dark:border-text_primary text-text_primary fixed top-0 right-0">
        <CustomTrigger hideWhenOpen={true} />
        <div>
          <DarkModeToggle />
        </div>
      </header>
      <div className="mt-12">
      </div>
    </>
  );
}
