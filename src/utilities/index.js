export const connectWallet = async () => {
    if (window.ethereum) { //check if Metamask is installed
        try {
            const address = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const obj = {
                connectedStatus: true,
                status: "",
                address: address
            }
            return obj;
            
        } catch (error) {
            return {
                connectedStatus: false,
                status: "🦊 Connect to Metamask using the button on the top right."
            }
        }
    } else {
        return {
            connectedStatus: false,
            status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
        }
    } 
};

