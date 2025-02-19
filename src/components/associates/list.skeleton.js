export default function AssociatesListSkeleton() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4 md:mb-0" />
                    <div className="w-full md:w-96 h-12 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Count Skeleton */}
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-8" />

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-sm animate-pulse"
                        >
                            <div className="w-full h-32 bg-gray-200 rounded mb-4" />
                            <div className="h-6 w-3/4 bg-gray-200 rounded mx-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 