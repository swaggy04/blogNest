import Image from "next/image";

const Features = () => {
    return (
        <section className="py-15 bg-blue-50 dark:bg-gray-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-950 dark:text-gray-200 leading-tight">
                       Create content that connects and converts
                    </h2>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        From writing to publishing, our tools help you focus on storytelling—while we handle the rest.
                    </p>
                </div>

                {/* Two‑column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    {/* Left list */}
                    <div className="space-y-6">
                        <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                All in one tool
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm  hover:text-blue-600 dark:hover:text-blue-500">
                                Manage your blog with a single powerful platform. Write, edit, analyze, and grow—all in one place without switching tabs.
                            </p>
                        </div>
                        
                             <h2 className=" text-xl font-semibold text-gray-900  dark:text-white mb-2  ">
                                Cross-platform app
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm hover:text-blue-600 dark:hover:text-blue-500">
                                Access your blog anytime, anywhere. Whether you're on a desktop, tablet, or phone, your dashboard adapts seamlessly.
                            </p>
                             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Crowd-based insights
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm  hover:text-blue-600 dark:hover:text-blue-500">
                              Get smarter with every post. Gain insights from community trends, reading patterns, and engagement analytics.


                            </p>
                               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 ">
                                Seamless integrations
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm  hover:text-blue-600 dark:hover:text-blue-500">
                                Connect with your favorite tools effortlessly—Google Analytics, Mailchimp, Notion, and more—without the technical hassle.
                            </p>
                        <div/>

               
                    </div>

                    {/* Right illustration */}
                    <div className="relative w-full max-w-2xl aspect-[16/9] rounded-lg transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/dashboard.png"
                            alt="Dashboard illustration"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
