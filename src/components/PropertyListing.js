import React from 'react';

function PropertyListing(props) {
  const {Name = '', Value = ''} = props
  // console.log('Value', Value, typeof Value);
      return (
        <div className="listing">
          <strong>{Name} </strong>
        {
          typeof Value === 'object' ? Value.join(', ').replace(/\./g,'') : Value
        }
        </div>
      )
}

export default PropertyListing
