import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { fromFetch } from "rxjs/fetch";
import { Card } from './Card';
import { itemReducer, itemsInitState, pageReducer, pagerInitState } from '../../reducer';

export const Cards = (props) => {
    // Use reducer to control action and update states
    const [allItems, allItemsDispatch] = useReducer(itemReducer, itemsInitState )
    const [pager, pagerDispatch ] = useReducer(pageReducer, pagerInitState)
    const { contractAddress } = props;
    // API Call
    useEffect(() => {
        let items = []
        allItemsDispatch({ type: 'FETCHING_ITEMS', fetching: true })
        fromFetch(`https://api.opensea.io/api/v1/assets?offset=${pager.page}&owner=${contractAddress}&limit=20`)
        .subscribe(
            response => response.json()
            .then((data) => {
                if (data?.assets && data.assets.length > 0) {
                    data.assets.forEach(element => {
                        items.push(
                            {
                                'id': element.id,
                                'tokenID': element.token_id,
                                'assetContractAddress': element.asset_contract.address,
                                'name': element.name,
                                'imageUrl': element.image_url,
                                'description': truncate(element.description, 450),
                                'permalink': element.permalink,
                                'collectionName': element.collection.name
                            }
                        );
                    });
                    allItemsDispatch({ type: 'STACK_ITEMS', items })
                }
                allItemsDispatch({ type: 'FETCHING_ITEMS', fetching: false })
            }));
    }, [allItemsDispatch, pager.page, contractAddress])

    // create a ref to detect if a bottom dom is intersected
    // I use setState instead of setRef due to React's render life-cycle
    const [bottomBound, setRef] = useState(null);
    // use useCallback to detect if such dom is mounted, then set its state to bottomBound
    const bottomBoundaryRef = useCallback((node) => {
        setRef(node)
    }, [])
    
    // IntersectionObserver is a browser native API to detect if we have scrolled and met a certain dom
    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
            entries.forEach(en => {
                // Once I scroll to bottom, dispatch an action to call data from the next page
                if (en.intersectionRatio > 0) {
                    pagerDispatch({ type: 'ADVANCE_PAGE' });
                }
            });
            }).observe(node);
        },
        [pagerDispatch]
    );
    
    // add bottom boundary dom to scrollObserver
    useEffect(() => {
        if (bottomBound) {
            scrollObserver(bottomBound)
        }
    }, [scrollObserver, bottomBound])

    // If there are no data, we return false and render nothing
    if (allItems.items.length <= 0) {
        return false;
    }
    
    return (
        <div>
            {/* show cards */}
            <div className="card-gallery">
                {allItems.items.map(function(d, idx) {
                    return <Card key={idx} item={d}/>
                })}
            </div>
            {/* Loader */}
            {allItems.fetching && (
                <div className="loader"></div>
            )}
            {/* buttom boundary */}
            <div id='page-bottom-boundary' style={{ visibility: 'invisible' }} ref={bottomBoundaryRef} />
        </div>
    )
}

// Truncate description that is too long
const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
}

