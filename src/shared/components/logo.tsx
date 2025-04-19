import { useTheme } from '@/core/theme';
import logo from '../assets/omega_logo.svg';

export function Logo() {
  const { themeMode } = useTheme();

  return (
    <g transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)"
      fill={themeMode === "light" ? "#000000" : "#ffffff"} stroke="none">
      <div>
        <img src={logo} alt="Logo" width={150} />
      </div>
    </g>
  );
}
