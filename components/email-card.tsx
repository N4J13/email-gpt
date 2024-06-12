import { Email } from "@/lib/types";
import { Badge } from "./ui/badge";

type EmailCardProps = {
  email: Email;
};

export default function EmailCard({ email }: EmailCardProps) {
  return (
    <article
      key={email.id}
      className={`bg-background border border-border rounded-lg p-4 transition-all hover:muted  `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{email.from}</div>
      </div>
      <h3 className="font-semibold text-lg mb-2">{email.subject}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: email.snippet,
        }}
        className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
      ></p>
      <div className="mt-2 flex items-center gap-2">
        {email.category?.map((category) => (
          <Badge key={category} variant={"outline"}>
            {category}
          </Badge>
        ))}
      </div>
    </article>
  );
}
