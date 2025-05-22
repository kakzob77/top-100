export const metadata = {
  title: "Top Farcaster Users",
  description: "Top 100 most active Farcaster users based on recent activity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}