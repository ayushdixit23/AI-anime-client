"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import im1 from "../../public/im1.jpg";
import im2 from "../../public/img2.jpg";
import im3 from "../../public/im3.jpg";
import Autoplay from "embla-carousel-autoplay"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    // const imagePath = [im1, im2, im3];
    const imagePath = [im1, im2, im3];
    return (
        <div className="h-screen w-screen dark:bg-[#534c4c0a] flex flex-col">
            <div className="w-full flex justify-center items-center h-full">
                <div className="w-[50%] h-full border-r-[1px]">
                    <div className="w-full h-full gap-5 flex-col flex justify-center items-center px-6">
                        <div className="mb-10 flex flex-col gap-4 text-center">
                            <div className="font-bold text-4xl italic ">Welcome to Anime Hub!</div>
                            <div className="font-medium text-lg font-serif">Anime Hub is your go-to spot for streaming and discovering, all things anime!</div>
                        </div>

                        <div >
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 2000,
                                    }),
                                ]}
                            >
                                <CarouselContent>
                                    {imagePath.map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="w-full h-full flex justify-center items-center">
                                                <div className="flex rounded-md overflow-hidden  items-center justify-center">
                                                    <Image

                                                        src={imagePath[index]}
                                                        alt="anime"
                                                        className="rounded-md w-[450px] h-[450px] object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>


                </div>
                <div className="w-[50%] flex justify-center items-center h-full">
                    <div className="min-w-[350px] w-[60%]">{children}</div>

                </div>
            </div>
        </div>
    )

}
