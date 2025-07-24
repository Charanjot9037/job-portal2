'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import Jobsdescriptions from '@/app/components/Jobsdescriptions';

const Page = () => {
  const params = useParams();
  const id = params.id ; // ensure it's a string

  return (
    <div>
      <Jobsdescriptions id={id} />
    </div>
  );
};

export default Page;






//   'use client';
//     import { useParams } from 'next/navigation';

// import React from 'react'
// import Jobsdescriptions from '@/app/components/Jobsdescriptions'
// const page = () => {
//     const params = useParams();
//       const id = params.id;
//       console.log(id);
//   return (
//     <div>
//    <Jobsdescriptions job={id}/>
//     </div>
//   )
// }

// export default page
