import React from 'react';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';
import { Contract } from 'ethers';

export default function Card({
	nft,
	isSold,
	getSigner,
	web3modalRef,
	index,
	setLoading,
	loading,
	getSoldStatus,
	walletConnected,
}) {
	const mint = async () => {
		try {
			setLoading(true);
			const signer = await getSigner(web3modalRef, true);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
			const tx = await nftContract.TransaferNFT(index);
			await tx.wait();
			setLoading(false);
			getSoldStatus();
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className='border border-wwhite rounded-lg font-lato flex flex-col justify-evenly items-center py-4'>
			<img
				src={nft.image}
				alt='NFT Image'
				width={280}
				height={280}
				className='rounded-lg'
			/>
			<h1 className='text-2xl font-macondo mb-3'>{nft.name}</h1>
			<p className='w-5/6 text-center'>{nft.description}</p>
			{/* {walletConnected && (
				<button
					onClick={mint}
					disabled={isSold || loading}
					className='rounded-full py-2 px-3 my-3 bg-wwhite text-bblack disabled:opacity-50'>
					{isSold ? 'Sold out!' : 'Mint'}
				</button>
			)} */}
		</div>
	);
}
