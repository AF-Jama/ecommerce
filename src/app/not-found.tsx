import Link from 'next/link'
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight:['400'],
    display:'swap',
    subsets:['latin']
})
 
export default function NotFound() {
    return (
      <>
        <div className='min-h-screen flex flex-col justify-center items-center bg-black'>
        <h1 className={`font-bold text-white ${roboto.className}`}>404 - Page Not Found</h1>
        </div>
      </>
    );
  }