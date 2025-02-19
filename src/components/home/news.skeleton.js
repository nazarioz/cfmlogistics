export default function NewsSkeleton() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Título Skeleton */}
            <div className="mb-12">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Notícia Principal Skeleton */}
                <div className="lg:w-1/2">
                    <div className="relative block h-[600px] lg:h-[617px] overflow-hidden bg-gray-200 rounded animate-pulse">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="h-4 w-24 bg-gray-300 mb-2 rounded" />
                            <div className="h-8 w-3/4 bg-gray-300 rounded" />
                        </div>
                    </div>
                </div>

                {/* Notícias Secundárias Skeleton */}
                <div className="lg:w-1/2 flex flex-col gap-4">
                    {[1, 2].map((item) => (
                        <div 
                            key={item}
                            className="relative block h-[300px] overflow-hidden bg-gray-200 rounded animate-pulse"
                        >
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="h-4 w-24 bg-gray-300 mb-2 rounded" />
                                <div className="h-6 w-2/3 bg-gray-300 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ver Todas Skeleton */}
            <div className="text-right mt-8 flex items-center justify-end gap-4">
                <div className="h-[1px] w-24 bg-gray-200" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
        </section>
    );
} 