import React from 'react';



export const ImagesCard = ({ data, openModal }) => {

              

    return (
      <div>
        <img
  src={data.urls.small_s3}
  alt={data.alt_description}
  width={500}
  height={310}
  onClick={() => openModal(data)}
/>

        </div>
    );
  };
  