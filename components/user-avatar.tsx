import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
  name?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ src, className, name }) => {
  return (
    <Avatar className={cn("h7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
      <AvatarFallback nonce={name} />
    </Avatar>
  );
};

export default UserAvatar;
