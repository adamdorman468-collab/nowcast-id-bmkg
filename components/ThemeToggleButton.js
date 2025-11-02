// components/ThemeToggleButton.js
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === 'light' ? 'Mode Gelap 🌙' : 'Mode Terang ☀️'}
    </button>
  );
}