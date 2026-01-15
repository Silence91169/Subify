import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 bg-zinc-800" />
          <Skeleton className="h-6 w-96 bg-zinc-800/50" />
        </div>
        <Skeleton className="h-10 w-32 bg-zinc-800/50 rounded-xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-zinc-800 bg-zinc-900/40">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24 bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32 bg-zinc-800 mb-2" />
              <Skeleton className="h-4 w-48 bg-zinc-800/50" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-zinc-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-xl bg-zinc-800" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 bg-zinc-800" />
                  <Skeleton className="h-3 w-20 bg-zinc-800/50" />
                </div>
                <Skeleton className="h-6 w-16 bg-zinc-800" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-zinc-800 bg-zinc-900/40">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-zinc-800" />
          </CardHeader>
          <CardContent className="flex items-center justify-center pt-8">
            <Skeleton className="h-64 w-64 rounded-full bg-zinc-800/30" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
