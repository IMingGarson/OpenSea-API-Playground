import React, { useState, useEffect } from 'react';
import '../style/ListPage.css';
import { Cards } from '../components/List/Cards'
import { connectWallet } from '../utilities';

const ListPage = () => {
    const [contractAddress, setAddress] = useState('');
    
    // Connect to Metamask and get address
    const getContractAddr = async () => {
        const obj = await connectWallet();
        if (obj.address.length > 0) {
            setAddress(obj.address[0])
        }
    }

    useEffect(() => {
        getContractAddr()
    }, [contractAddress])

    if (contractAddress.length <= 0) {
        return false;
    }

    return (
        <Cards contractAddress={contractAddress} />
    );
}

export default ListPage;