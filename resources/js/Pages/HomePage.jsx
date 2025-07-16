import { useState } from "react";
import Image from "../components/Image";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const Homepage = ({ news }) => {
    const { props } = usePage();
    const aboutData = props.aboutData;
    const newsData = news || [];

    // --- Carousel Config
    const cardWidth = 370;
    const gap = 24;
    const cardsPerSlide = 3;
    const slideCount = Math.ceil(newsData.length / cardsPerSlide);

    const [offset, setOffset] = useState(0);

    const handlePrev = () => {
        // Loop ke akhir jika di awal
        setOffset(offset === 0 ? slideCount - 1 : offset - 1);
    };

    const handleNext = () => {
        // Loop ke awal jika di akhir
        setOffset(offset === slideCount - 1 ? 0 : offset + 1);
    };

    // Tentukan card yang sedang aktif
    const startIndex = offset * cardsPerSlide;
    const endIndex = startIndex + cardsPerSlide;
    const currentCards = newsData.slice(startIndex, endIndex);

    // Jika di slide terakhir dan sisa card < 3, tambahkan card dari awal untuk mengisi grid
    let visibleCards = [...currentCards];
    if (visibleCards.length < cardsPerSlide) {
        visibleCards = visibleCards.concat(newsData.slice(0, cardsPerSlide - visibleCards.length));
    }

    return (
        <div className="w-full min-h-screen p-5 md:p-10 bg-gray-100 font-sans">
            <h1 className="text-3xl md:text-5xl font-bold italic font-montserrat text-center mb-4 text-[#1B3C53] transition-all duration-500 ease-in-out">
                {aboutData?.judul ?? "Judul belum tersedia"}
            </h1>
            <p className="text-sm md:text-md italic font-bold text-center mb-10 text-gray-700 font-montserrat">
                {aboutData?.sub_judul ??
                    "Welcome! This is an official library website of SMAN 1 Baleendah"}
            </p>

            <div className="mb-8 mt-20">
                <div className="flex flex-col md:flex-row md:gap-28 items-center">
                    <div className="md:w-1/2 ml-10 text-left">
                        <h2 className="text-xl md:text-3xl font-bold mb-4 text-[#1B3C53] font-plusjakarta">
                            About Us
                        </h2>
                        <p className="text-[#1B3C53] leading-relaxed text-justify font-plusjakarta">
                            {aboutData?.about ?? "Deskripsi perpustakaan belum tersedia."}
                        </p>
                    </div>
                    <img
                        src={`/storage/${aboutData?.gambar ?? "images/default.png"}`}
                        alt="About Us"
                        className="rounded-lg shadow-md mx-auto"
                        style={{ maxWidth: "600px", height: "300px" }}
                    />
                </div>
            </div>

            <hr className="border-t-2 border-[#1B3C53] my-12" />

            <div className="relative w-full max-w-screen-xl mx-auto">
                <h2 className="text-4xl font-bold mb-10 text-center text-[#1B3C53]">
                    News
                </h2>
                <div className="relative mb-10 flex items-center justify-center">
                    {/* Prev Button */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#1B3C53] text-white hover:bg-white hover:text-[#1B3C53] border border-[#1B3C53] rounded-full shadow transition"
                        aria-label="Sebelumnya"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Grid 3 Card */}
                    <div className="w-full flex justify-center gap-8 px-16">
                        {visibleCards.map((news, i) => (
                            <Link
                                key={news.id || i}
                                href={`/news/${news.id}`}
                                className="flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex overflow-hidden"
                                style={{
                                    width: `${cardWidth}px`,
                                    height: "180px",
                                }}
                            >
                                {/* Gambar kiri */}
                                <div className="w-[180px] h-full flex-shrink-0">
                                    <Image
                                        src={news.cover}
                                        alt={news.title}
                                        className="w-full h-full object-cover rounded-l-xl"
                                    />
                                </div>
                                {/* Konten kanan */}
                                <div className="flex flex-col justify-between p-3 w-full">
                                    <h3 className="text-base font-semibold text-[#1B3C53] line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {news.short_description}
                                    </p>
                                    <span className="text-xs text-blue-600 mt-2">
                                        Read more →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#1B3C53] text-white hover:bg-white hover:text-[#1B3C53] border border-[#1B3C53] rounded-full shadow transition"
                        aria-label="Berikutnya"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

Homepage.layout = (page) => (
    <MainLayout aboutData={page.props.aboutData}>{page}</MainLayout>
);

export default Homepage;