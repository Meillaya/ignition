import { UserButton } from "@clerk/nextjs";

export const ClerkUserButton = () => (
  <UserButton 
    appearance={{
      elements: {
        userButtonAvatarBox: "h-8 w-8",
        userButtonPopoverCard: "border border-input",
        userButtonPopoverActionButton: "hover:bg-accent",
        userButtonPopoverActionButtonText: "text-sm"
      }
    }}
  />
);
