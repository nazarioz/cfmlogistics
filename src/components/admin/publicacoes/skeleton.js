export default function PublicacoesSkeletonLoader() {
    return (
        <div className="p-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Filters Skeleton */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex gap-4">
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-64 bg-gray-200 rounded animate-pulse ml-auto" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center p-4 gap-4">
                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-12 w-12 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 