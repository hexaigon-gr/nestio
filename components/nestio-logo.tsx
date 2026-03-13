import { cn } from "@/lib/general/utils";

interface NestioLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

export function NestioLogo({
  className,
  size = "md",
  variant = "dark",
}: NestioLogoProps) {
  const sizes = {
    sm: { wrapper: "h-6 gap-2", icon: "h-6 w-6", text: "text-lg" },
    md: { wrapper: "h-8 gap-2.5", icon: "h-7 w-7", text: "text-xl" },
    lg: { wrapper: "h-12 gap-3", icon: "h-10 w-10", text: "text-3xl" },
  };

  const { wrapper, icon, text } = sizes[size];
  const textColor = variant === "dark" ? "text-charcoal" : "text-cream";

  return (
    <div className={cn("flex items-center", wrapper, className)}>
      {/* House icon mark */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={icon}
      >
        <path
          d="M4 28V14L16 4L28 14V28H20V20H12V28H4Z"
          stroke="#C4724E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="16" cy="14" r="2" fill="#C4724E" />
      </svg>

      {/* Text in serif font */}
      <span
        className={cn(
          "font-serif font-medium tracking-[0.08em] lowercase",
          text,
          textColor
        )}
      >
        nestio
      </span>
    </div>
  );
}
