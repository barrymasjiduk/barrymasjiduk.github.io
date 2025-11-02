// homeCarousel.jsx
// carousel for the home page
// has information and links to what the navbar does but with graphics
// To Do: Make carousel contents correct
//        add ones that display info from the raw data such as announcements
//        maybe ones that are time bound ,such as eid salaah and if you wanna be creative, stuff like ashurah

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import rawdata from "../assets/data.json";
import { useNavigate } from "react-router-dom";
import live from '@/assets/live.png';
import classes from '@/assets/classes.jpeg';
import money from '@/assets/money-.jpg';

const  cards = [
  {
    "image": live,
    "title": "Listen Live",
    "description": "Click to hear live athan from Barry Masjid.",
    "link":"/live"
  },
  {
    "image": classes,
    "title": "Qur'an Classes",
    "description": "Find out more about our Qur'an classes and how to register.",
    "link":"/madrassah"
  },
  {
    "image": money,
    "title": "Support the Masjid",
    "description": "Help us maintain and grow by making a donation today.",
    "link":"/donate"
  }
]

const HomeCarousel = () => {
    const navigate = useNavigate();

    return (
        <>
            <Carousel>
                    <CarouselContent>
                    {/*initial slide will have date relevant data
                    TO DO: Create JSON that will have date relevant stuff and will present it there
                           Create a page to display more info about that stuff*/}
                    
                    {/*
                    <CarouselItem>
                        <div className="relative h-70 md:h-100 w-full text-white">
                        <img src={rawdata.rawdata.announcements[0].image} className="h-full w-full object-cover object-[50%_20%]"/>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/50 flex items-start justify-start p-4">
                            <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-left">
                                
                            </h1>
                            <p className="text-sm md:text-lg mt-2">
                                
                            </p>
                            </div>
                        </div>
                        </div>
                    </CarouselItem>
                     */}
                    
                    {cards.map((item, index) => (
                    <CarouselItem key={index} onClick={() => navigate(item.link)}>
                        <div className="relative h-70 md:h-100 w-full text-white">
                        <img
                            src={item.image}
                            className="h-full w-full object-cover object-[50%_40%]"
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/50 flex items-start justify-start p-4">
                            <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-left">
                                {item.title}
                            </h1>
                            <p className="text-sm md:text-lg mt-2">
                                {item.description}
                            </p>
                            </div>
                        </div>
                        </div>
                    </CarouselItem>
                    ))}
                    {/*
                    <CarouselItem>
                        <div className="relative h-70 md:h-100 w-full text-white">
                        <img src={rawdata.rawdata.announcements[0].image} className="h-full w-full object-cover object-[50%_20%]"/>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/50 flex items-start justify-start p-4">
                            <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-left">
                                
                            </h1>
                            <p className="text-sm md:text-lg mt-2">
                                
                            </p>
                            </div>
                        </div>
                        </div>
                    </CarouselItem>
                    */}
                    </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext />
            </Carousel>
        </>
    );
}

export default HomeCarousel;