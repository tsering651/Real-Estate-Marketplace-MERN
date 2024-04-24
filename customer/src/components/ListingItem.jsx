
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-blue-100 shadow-lg p-2 hover:scale-105 transition-transform duration-500 rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className=' sm:h-[220px] rounded-md w-full object-cover '
        />
        <div className='p-2 flex flex-col gap-2 w-full'>
          <div className='flex items-center justify-between'>
          <p className='text-md font-bold text-blue-900 uppercase'>
            {listing.name}
          </p>
          <p className='text-slate-500 font-semibold '>
          ₹ 
             { listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && '/- Month'}
          </p>
          </div>
         
          <p className='text-sm text-gray-600 pl-1'>
            {listing.description}
          </p>

          <div className='flex items-center'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>

         
          <div className='text-green-700 flex gap-4'>
            <div className='flex gap-5'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds `
                : `${listing.bedrooms} Bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths `
                : `${listing.bathrooms} Bath `}
            </div>
            <div className='font-bold text-xs'>
            {listing.kitchens > 1
                      ? `${listing.kitchens} Kitchens`
                      : listing.kitchens === 1
                      ? `${listing.kitchens} Kitchen`
                      : "No Kitchen"}
            </div>
            <div className='font-bold text-xs'>
            {listing.halls > 1
                      ? `${listing.halls} Halls`
                      : listing.halls === 1
                      ? `${listing.halls} hall`
                      : "No Hall"}
            </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
