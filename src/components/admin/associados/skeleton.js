export default function AssociadosSkeletonLoader() {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-8">
                <div className="space-y-2">
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Filtros Skeleton */}
            <div className="bg-white shadow rounded-lg mb-6">
                <div className="p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                    <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mt-4 sm:mt-0" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="p-6 flex items-center space-x-4">
                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                            <div className="flex-1">
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="flex space-x-2">
                                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 