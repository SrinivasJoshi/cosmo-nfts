import { useRef, useState, useEffect } from 'react';
import { Contract, providers } from 'ethers';
import Web3Modal from 'web3modal';
import { abi, NFT_CONTRACT_ADDRESS } from '../constants';
import Card from '../components/Card';
import Loader from '../components/Loader';

export default function Home() {
	const web3ModalRef = useRef();
	const [walletConnected, setWalletConnected] = useState(false);
	const [nftData, setNftData] = useState([]);
	const [soldStatus, setSoldStatus] = useState([]);
	const [loading, setLoading] = useState(false);

	const getProviderOrSigner = async (web3ModalRef, needSigner = false) => {
		const provider = await web3ModalRef.current.connect();
		const web3Provider = new providers.Web3Provider(provider);

		const { chainId } = await web3Provider.getNetwork();
		if (chainId != 80001) {
			window.alert('Change the network to Mumbai');
			throw new Error('Change the network to Mumbai');
		}
		if (needSigner) {
			const signer = web3Provider.getSigner();
			return signer;
		}
		return web3Provider;
	};

	const connectWallet = async () => {
		try {
			await getProviderOrSigner(web3ModalRef, false);
			setWalletConnected(true);
			getSoldStatus();
		} catch (error) {
			console.log(error);
		}
	};

	const getAllNFTdata = async () => {
		try {
			const res = await fetch(
				'https://gateway.pinata.cloud/ipfs/QmV9EDCiWKqJ7PhkMd9nsL9E7g3Nr3jjSy6Y7EXeNMCpFN'
			);
			const data = await res.json();
			setNftData(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getSoldStatus = async () => {
		try {
			const provider = await getProviderOrSigner(web3ModalRef, false);
			const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
			const data = await nftContract.sendSoldNFTs();
			setSoldStatus(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!nftData.length) {
			getAllNFTdata();
		}
		if (!walletConnected) {
			web3ModalRef.current = new Web3Modal({
				network: 'matic',
				providerOptions: {},
				disableInjectedProvider: false,
			});
			connectWallet();
		}
	}, [walletConnected]);

	return (
		<>
			<section className='bg-bblack min-h-screen flex flex-col justify-evenly items-center'>
				<h1 className='text-3xl md:text-4xl text-wwhite font-macondo'>
					Cosmo NFTs
				</h1>
				<img
					className='animate-spin-slow w-7/12 h-7/12 md:w-1/3 md:h-1/3'
					src='/images/hero-image.png'
					alt='Hero-section-image'
				/>
				<p className='text-md md:text-lg  w-10/12 text-center md:w-full text-wwhite font-macondo'>
					Unleash your inner astrologer with our one-of-a-kind zodiac NFTs
				</p>
				<button className='rounded-full py-2 px-3 bg-wwhite text-bblack font-macondo'>
					<a href='#target'>Explore</a>
				</button>
			</section>
			<section
				id='target'
				className='min-h-screen flex flex-col justify-evenly items-center bg-bblack text-wwhite'>
				<div className='flex flex-col justify-evenly items-center'>
					<h2 className='font-macondo text-2xl mb-3'>Introduction</h2>
					<p className='font-lato w-4/5 md:w-3/5 text-center'>
						Welcome to our website, where we mint unique and collectible NFTs
						that are inspired by the zodiac signs. Each NFT is a one-of-a-kind
						digital asset that represents a specific zodiac sign and its
						associated characteristics. Whether you're a seasoned collector or
						new to the world of NFTs, we have something for everyone.
					</p>
				</div>

				<div className='flex flex-col justify-evenly items-center my-5'>
					<h2 className='font-macondo text-2xl mb-3'>How it works</h2>
					<p className='font-lato w-4/5 md:w-3/5 text-center'>
						Our NFTs are created using blockchain technology, which ensures
						their authenticity and uniqueness. To mint an NFT, we use smart
						contracts to securely record the ownership and details of each
						digital asset.
					</p>
				</div>

				<div className='flex flex-col justify-evenly items-center'>
					<h2 className='font-macondo text-2xl mb-3'>Our NFTs</h2>
					<p className='font-lato w-4/5 md:w-3/5 text-center'>
						We offer NFTs for all 12 zodiac signs, each one featuring original
						artwork and a detailed description of the sign's personality traits
						and characteristics.
					</p>
					<p>
						<strong>Each wallet can only mint 1 NFT!</strong>
					</p>
					{!walletConnected && (
						<button
							onClick={connectWallet}
							className='mt-5 rounded-full py-2 px-3 bg-wwhite text-bblack font-macondo'>
							Connect Wallet to Mint NFT
						</button>
					)}
				</div>

				{loading && <Loader />}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 md:px-12 gap-6 my-10'>
					{nftData.map((nft, i) => {
						return (
							<Card
								nft={nft}
								isSold={soldStatus[i]}
								web3modalRef={web3ModalRef}
								getSigner={getProviderOrSigner}
								index={i}
								setLoading={setLoading}
								loading={loading}
								key={i}
								getSoldStatus={getSoldStatus}
								walletConnected={walletConnected}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
}
