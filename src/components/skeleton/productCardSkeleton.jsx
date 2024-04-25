import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton({ className }) {
  return (
    <Card className={className}>
      <CardHeader className="p-0 w-72 h-72">
        <Skeleton className={"w-72 h-72"} />
        <Skeleton className={"w-36 h-5"} />
      </CardHeader>
      <CardContent className="px-3 py-1">
        <Skeleton className={"w-full h-8"} />
      </CardContent>
    </Card>
  );
}
