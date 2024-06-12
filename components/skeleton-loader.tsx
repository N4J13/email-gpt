import { Skeleton } from "./ui/skeleton";

const MailDashboardSkelton = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex w-full flex-col p-4 gap-8">
        <Skeleton className="rounded-md h-[200px]" />
        <Skeleton className="rounded-md h-[200px]" />
        <Skeleton className="rounded-md h-[200px]" />
        <Skeleton className="rounded-md h-[200px]" />
      </div>
    </div>
  );
};

export default MailDashboardSkelton;
