import React from 'react';

export const Card = (props) => {
    const { tokenID, assetContractAddress, name = '', imageUrl = false, description = '' } = props.item;

    if (!tokenID || !assetContractAddress) {
        return false
    }

    return (
        <div className="flex flex-col card">
            <div className="flex card-img" >
                <img src={imageUrl} alt="" onClick={() => { window.location.href = `/details/${assetContractAddress}/${tokenID}`; }} />
            </div>
            <div className="flex card-title">{name}</div>
            <hr/>
            <div className="flex card-desc">{description}</div>
        </div>
    )
}