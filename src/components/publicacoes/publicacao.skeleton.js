export default function PublicacaoSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Skeleton */}
            <div className="mb-12">
                <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Cover Image Skeleton */}
            <div className="relative aspect-[16/9] mb-12">
                <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{
                        width: `${Math.random() * 40 + 60}%`
                    }} />
                ))}
            </div>

            {/* Tags Skeleton */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
} 