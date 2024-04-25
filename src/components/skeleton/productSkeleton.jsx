import { Skeleton } from "../ui/skeleton";

export default function SkeletonProduct() {
  return (
    <div className="h-screen flex md:flex-row flex-col gap-5 p-5">
      <Skeleton className="md:w-3/6 w-full h-full" />
      <div className="flex flex-col gap-2 w-3/6">
        <Skeleton className={"h-6 w-96"} />
        <Skeleton className={"h-4 w-60"} />
        <Skeleton className={"h-10 w-full"} />
      </div>
    </div>
  );
}
