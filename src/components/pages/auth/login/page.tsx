import LoginImage from "@/assets/login-rider-image.png";
import { LoginForm } from "./LoginForm";
import Logo from "@/assets/Logo";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <Logo />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 border w-full max-w-md mx-auto">
          <div className="space-y-2">
            <div>
              <p><span className="font-medium">Admin:</span> shovon@admin.com</p>
              <p><span className="font-medium">Driver:</span> shovon@driver.com</p>
              <p><span className="font-medium">Rider:</span> shovon@rider.com</p>
            </div>
            <div className="mt-4">
              <p><span className="font-medium">Password:</span> Shovon@22</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={LoginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  );
}
