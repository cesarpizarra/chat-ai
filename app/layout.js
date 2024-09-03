import './globals.css';
import 'transition-style';
import { ThemeProvider } from './context/ThemeProvider';

export const metadata = {
  title: 'KauSAP-AI',
  description: 'Simple Chat AI using OpenAI GPT-3',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
