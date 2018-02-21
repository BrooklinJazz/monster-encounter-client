import React from 'react';

function PropertyListing(props) {
  const {Name = '', Value = ''} = props
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
