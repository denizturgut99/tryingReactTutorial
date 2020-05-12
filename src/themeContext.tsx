import { createContext } from 'react';

const ThemeContext = createContext<[String, (theme: string) => void]>(['blue', () => {}]);

export default ThemeContext;
