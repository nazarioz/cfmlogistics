export default function NewsListSkeleton() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="relative h-64 mb-4 bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="h-4 w-24 bg-gray-300 mb-2 rounded" />
                                    <div className="h-6 w-3/4 bg-gray-300 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 