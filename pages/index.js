import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<section className='bg-bblack min-h-screen flex flex-col justify-evenly items-center'>
				<h1 className='text-4xl text-wwhite font-macondo'>Cosmo NFTs</h1>
				<img
					className='animate-spin-slow'
					src='/images/hero-image.png'
					alt='Hero-section-image'
					width={500}
					height={500}
				/>
				<p className='text-lg text-wwhite font-macondo'>
					Unleash your inner astrologer with our one-of-a-kind zodiac NFTs
				</p>
				<button className='rounded-full py-2 px-3 bg-wwhite text-bblack font-macondo'>
					Explore
				</button>
			</section>
			<section className='min-h-screen flex flex-col justify-evenly items-center bg-bblack text-wwhite'>
				<div className='flex flex-col justify-evenly items-center'>
					<h2 className='font-macondo text-2xl mb-3'>Introduction</h2>
					<p className='font-lato w-3/5 text-center'>
						Welcome to our website, where we mint unique and collectible NFTs
						that are inspired by the zodiac signs. Each NFT is a one-of-a-kind
						digital asset that represents a specific zodiac sign and its
						associated characteristics. Whether you're a seasoned collector or
						new to the world of NFTs, we have something for everyone.
					</p>
				</div>

				<div className='flex flex-col justify-evenly items-center'>
					<h2 className='font-macondo text-2xl mb-3'>How it works</h2>
					<p className='font-lato w-3/5 text-center'>
						Our NFTs are created using blockchain technology, which ensures
						their authenticity and uniqueness. To mint an NFT, we use smart
						contracts to securely record the ownership and details of each
						digital asset.
					</p>
				</div>

				<div className='flex flex-col justify-evenly items-center'>
					<h2 className='font-macondo text-2xl mb-3'>Our NFTs</h2>
					<p className='font-lato w-3/5 text-center'>
						We offer NFTs for all 12 zodiac signs, each one featuring original
						artwork and a detailed description of the sign's personality traits
						and characteristics.
					</p>
				</div>

				<div className='grid-cols-2	'></div>
			</section>
		</>
	);
}
