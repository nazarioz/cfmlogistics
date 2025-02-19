export default function AdesaoSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
                <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Tabs */}
            <div className="h-12 bg-gray-200 rounded-xl mb-6"></div>

            {/* Lista */}
            <div className="space-y-1">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="p-6 border-b">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <div className="h-5 w-48 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 