import React from 'react';

function PropertyListing(props) {
  const {Name = '', Value = ''} = props

      return (
        <div className="listing"><strong>{Name}</strong> {Value}</div>
      )
}

export default PropertyListing
