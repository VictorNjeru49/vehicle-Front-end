
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import { Moon, PersonStandingIcon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import travel from '../data/data.json'
import { Link } from 'react-router-dom';


function Home() {
    const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
    const [fade, setFade] = useState(true);
  
    const previousVehicle = () => {
      setFade(false);
      setTimeout(() => {
        setCurrentVehicleIndex((prevIndex) => (prevIndex === 0 ? travel.length - 1 : prevIndex - 1));
          setFade(true);
      }, 500); // 500ms for fade-out transition
  };

  const nextVehicle = () => {
      setFade(false);
      setTimeout(() => {
        setCurrentVehicleIndex((prevIndex) => (prevIndex === travel.length - 1 ? 0 : prevIndex + 1));
          setFade(true);
      }, 500); // 500ms for fade-out transition
  };

  useEffect(() => {
      const interval = setInterval(() => {
          nextVehicle();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


    const currentVehicle = travel[currentVehicleIndex];
  return (
    <>
    <Container className="flex flex-col">
    <Navbar/>
    <div className=' h-full'>
        <div className=''>

        <div className="w-full h-screen mx-auto rounded-lg shadow-lg text-white flex items-center justify-center relative">
            <div className={`w-full h-full relative transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                <img 
                    src={currentVehicle.link} 
                    className="w-full h-full object-cover" 
                    alt={currentVehicle.make}
                />
                <div className="absolute inset-0 flex justify-between items-center p-4">
                    <button 
                        onClick={previousVehicle} 
                        className="btn btn-outline btn-primary">
                        <NavigateBefore />
                    </button>
                    <button 
                        onClick={nextVehicle} 
                        className="btn btn-outline btn-primary">
                        <NavigateNext />
                    </button>
                </div>
            </div>
        </div>


        <div className="mx-auto max-w-2xl pt-16 pb-32 sm:pb-48 lg:pb-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        

        </div>

        <div className=' m-auto pl-10 pr-10'>
            <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
            <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl" />
            <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <Link to="/vehicles">
            <button className="btn btn-primary">Get Started</button>
            </Link>
            </div>
  </div>
</div>
        </div>

        <div className='m-auto pl-10 pr-10'>
            <div className="hero bg-base-300 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
            <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl" />
            <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </div>

        <div className="flex pt-12 px-6 md:px-20 items-center justify-center bg-hero md:h-screen overflow-hidden">
      <div className="flex flex-col gap-6 md:flex-row items-center max-w-8xl">
        <div className="w-full md:w-1/2 lg:pr-32">
          <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">
            There's a better way to talk with your customers.
          </h2>
          <h3 className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
            Help Scout is designed with your customers in mind. Provide email and live chat with a personal touch,
            and deliver help content right where your customers need it, all in one place, all for one low price.
          </h3>
          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
            <button className="w-full sm:w-40 px-4 py-3 rounded font-semibold text-md bg-blue-500 text-white border-2 border-blue-500">
              Get started
            </button>
            <button className="w-full mt-4 sm:mt-0 sm:ml-4 sm:w-40 px-4 py-3 rounded font-semibold text-md bg-white text-blue-500 border-2 border-gray-500">
              Watch a Demo
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img src="https://loremflickr.com/g/600/600/girl" alt="Girl" />
        </div>
      </div>
    </div>


      <div className="bg-white dark:bg-gray-900">
      <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">

      <div className="mr-auto place-self-center lg:col-span-7  flex flex-row">.
        <div>
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Building digital <br />
            products &amp; brands.
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            This free and open-source landing page template was built using the utility classes from{' '}
            <a target="_blank" className="hover:underline">
              Tailwind CSS
            </a>{' '}
            and based on the components from the{' '}
            <a href="#/" className="hover:underline" target="_blank">
              Flowbite Library
            </a>{' '}
            and the{' '}
            <a href="" className="hover:underline">
              Blocks System
            </a>
            .
          </p>

          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <a
              href=""
              target="_blank"
              className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >                   
            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512">
            <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
            </path>
        </svg> View on GitHub
        </a>
               <div className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg className="w-4 h-4 mr-2" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="1667" height="2500">
            <style type="text/css">
              {`
                .st0 { fill: #0acf83 }
                .st1 { fill: #a259ff }
                .st2 { fill: #f24e1e }
                .st3 { fill: #ff7262 }
                .st4 { fill: #1abcfe }
              `}
            </style>
            <title>Figma.logo</title>
            <desc>Created using Figma</desc>
            <path id="path0_fill" className="st0" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"></path>
            <path id="path1_fill" className="st1" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"></path>
            <path id="path1_fill_1_" className="st2" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"></path>
            <path id="path2_fill" className="st3" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"></path>
            <path id="path3_fill" className="st4" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"></path>
          </svg>
          Get Figma file
        </div>
      </div>

        </div>

      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img src="https://demo.themesberg.com/landwind/images/hero.png" alt="hero image" />
      </div>
</div>
      </div>

    </div>


    <div className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros at lacus feugiat hendrerit sed ut
              tortor. Suspendisse et magna quis elit efficitur consequat. Mauris eleifend velit a pretium iaculis.
              Donec sagittis velit et magna euismod, vel aliquet nulla malesuada. Nunc pharetra massa lectus, a
              fermentum arcu volutpat vel.
            </p>
            <div className="mt-8">
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Learn more about us <span className="ml-2">&#8594;</span>
              </a>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              alt="About Us Image"
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Location</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Store
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum cupiditate veritatis
            in, accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Moon />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">Address</dt>
                <dd className="mt-2 text-base text-gray-500">
                  123 Main St, Suite 100
                  <br />
                  Anytown, USA 12345
                </dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Sun />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">Phone number</dt>
                <dd className="mt-2 text-base text-gray-500">(555) 555-5555</dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <PersonStandingIcon />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">Email</dt>
                <dd className="mt-2 text-base text-gray-500">info@ourstore.com</dd>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Moon />
                </div>
              </div>
              <div className="ml-4">
                <dt className="text-lg leading-6 font-medium text-gray-900">Store Hours</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Monday - Friday: 9am to 8pm
                  <br />
                  Saturday: 10am to 6pm
                  <br />
                  Sunday: 12pm to 4pm
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>

    
    <div>
    <div className="bg-white ">
      <div className="mx-auto py-16 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden px-6 py-24 text-center sm:rounded-3xl sm:px-16">
          <h2 className="font-nudge-extrabold mx-auto max-w-2xl text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            Join our community now
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Experience the benefits of our community. No obligations, just join and explore.
          </p>
          <div className="isolate mt-8 flex items-center justify-center -space-x-2 overflow-hidden">
            <img
              className="relative z-30 inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/men/34.jpg"
              alt=""
            />
            <img
              className="relative z-20 inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt=""
            />
            <img
              className="relative z-10 inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/women/3.jpg"
              alt=""
            />
            <img
              className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/men/4.jpg"
              alt=""
            />
            <span className="!ml-2 font-bold italic text-teal-500">Join these awesome members</span>
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Link to='/review'>
            <button
              type="button"
              className="text-md relative inline-flex items-center gap-x-2 rounded-lg bg-teal-600 px-6 py-4 font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              <span className="absolute -top-5 left-0 w-full text-left text-xs italic text-teal-600">
                No Obligations
              </span>
              Join Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="-mr-0.5 h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[72rem] w-[72rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#15b8a6" />
                <stop offset="1" stopColor="#15b8a6" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    </div>

    </div>
    <Footer/>
    </Container>
    </>
 
  )
}

export default Home