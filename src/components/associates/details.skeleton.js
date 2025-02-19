export default function DetailsSkeletonLoader() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Breadcrumb Skeleton */}
            <div className="mb-8">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Content Card Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Logo Skeleton */}
                    <div className="w-32 h-32 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />

                    {/* Content Skeleton */}
                    <div className="flex-1 space-y-6">
                        {/* Title Skeleton */}
                        <div className="space-y-3">
                            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* Categories Skeleton */}
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map(i => (
                                <div 
                                    key={i} 
                                    className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"
                                />
                            ))}
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
                        </div>

                        {/* Contact Info Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional Additional Content Skeleton */}
            <div className="space-y-4">
                <div className="h-40 bg-white rounded-lg shadow-sm animate-pulse" />
            </div>
        </section>
    );
} 