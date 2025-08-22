import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface SiteSetting {
  key: string;
  value: string;
  type: string;
  category: string;
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  darkMode: boolean;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  // Fetch theme settings from database
  const { data: siteSettings } = useQuery<SiteSetting[]>({
    queryKey: ["/api/site-settings"],
  });

  // Get theme settings from database
  const getThemeSettings = (): ThemeSettings => {
    const themeData = siteSettings?.find(s => s.key === 'site_theme');
    const defaultTheme = {
      primaryColor: "#DC2626",
      secondaryColor: "#1F2937", 
      accentColor: "#F59E0B",
      fontFamily: "Inter",
      darkMode: true
    };

    if (!themeData) return defaultTheme;
    
    try {
      const parsed = JSON.parse(themeData.value || '{}');
      return { ...defaultTheme, ...parsed };
    } catch (error) {
      console.error('Error parsing theme settings:', error);
      return defaultTheme;
    }
  };

  const themeSettings = getThemeSettings();

  // Initialize theme based on database settings
  useEffect(() => {
    if (siteSettings) {
      const shouldBeDark = themeSettings.darkMode;
      setIsDark(shouldBeDark);
      
      // Apply theme to document
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [siteSettings, themeSettings.darkMode]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store user preference
    localStorage.setItem('user-theme-preference', newTheme ? 'dark' : 'light');
  };

  const setTheme = (theme: 'light' | 'dark') => {
    const shouldBeDark = theme === 'dark';
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('user-theme-preference', theme);
  };

  return {
    isDark,
    themeSettings,
    toggleTheme,
    setTheme
  };
}