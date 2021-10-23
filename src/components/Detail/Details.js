import React from 'react';

export const Details = (props) => {
    const { asset_contract, name, image_url, description, permalink } = props.item;

    return (
        <div className="flex flex-col item">
            <div className="flex item-title collection-name">{asset_contract.name}</div>
            <div className="flex item-img" >
                <img src={image_url} alt="" />
            </div>
            <div className="flex item-title">{name}</div>
            <hr/>
            <div className="flex item-desc">{description}</div>
            <br />
            <a href={permalink} target="_blank" rel="noreferrer">
                <button className="permalink">Permalink</button>
            </a>
        </div>
    )
}