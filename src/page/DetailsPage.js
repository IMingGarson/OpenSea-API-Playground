import React, { useState, useEffect } from 'react';
import { Details } from '../components/Detail/Details'
import { useParams } from "react-router-dom";
import { fromFetch } from "rxjs/fetch";
import '../style/DetailsPage.css';

const DetailsPage = () => {
    // Use reducer to control action and update states
    const [singleItem, setSingleItem] = useState({})
    const { addr, id } = useParams()

    // API Call
    useEffect(() => {
        fromFetch(`https://api.opensea.io/api/v1/asset/${addr}/${id}/`)
        .subscribe(
            response => response.json()
            .then((data) => {
                setSingleItem(data)
            }));
    }, [addr, id])

    console.log('singleItem', singleItem);

    if (Object.keys(singleItem).length <= 0) {
        return false
    }

    return (
        <Details item={singleItem} />
    )
}

export default DetailsPage;