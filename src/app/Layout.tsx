// app/(auth)/layout.tsx  ← nested, no html/body
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}  {/* login/register pages go here */}
    </div>
  );
}
