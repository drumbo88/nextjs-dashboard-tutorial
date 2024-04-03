import { monserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monserrat.className} antialiased`}>
        <header>Header bonito</header>
        {children}
        <footer>Footer bonito</footer>
      </body>
    </html>
  );
}
