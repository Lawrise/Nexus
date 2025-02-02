import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

/*
  Toggle that make switch between dark/like mode manually possible (instead of depending on the ui pref) 
*/
const DarkModeToggle = () => {
  // const savedTheme = locealStorage.getItem('theme');

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      // localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      // localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const iconClasses = "w-5 h-5 text-text_primary dark:text-text_dark"

  return (
    <button onClick={toggleDarkMode} className="">
      {isDarkMode ? <Moon className={iconClasses}/> : <Sun className={iconClasses}/>}
    </button>
  );
};

export default DarkModeToggle;