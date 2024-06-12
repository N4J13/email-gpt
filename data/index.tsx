import { BookIcon, InboxIcon, SendIcon } from "lucide-react";

export const linkItems: LinkItem[] = [
  {
    href: "/email/inbox",
    icon: <InboxIcon />,
  },
  {
    href: "/email/sent",
    icon: <SendIcon />,
  },
  {
    href: "/email/drafts",
    icon: <BookIcon />,
  },
];

type LinkItem = {
  href: string;
  icon: JSX.Element;
};
