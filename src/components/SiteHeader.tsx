import Link from "next/link";
import { useState } from "react";
import headerStyle from "./SiteHeader.module.css";

export default function SiteHeader() {
	const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

	const toggleHamburgerMenu = () => setHamburgerMenuOpen(!hamburgerMenuOpen);

	return (
		<header className={headerStyle.base}>
			<div className={headerStyle.seperator}>
				<div className={headerStyle.seperatorLeft}>
					<Link className={headerStyle.HeaderLink} href="/">
						<h1>Carl Nordholm</h1>
						<p>Software Developer</p>
					</Link>
				</div>
				<div className={headerStyle.seperatorRightDesktop}>
					<nav>
						<ul>
							<li>
								<Link href="/about">About</Link>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/carl-nordholm"
									target="_blank"
								>
									<img
										src="/media/icons/linkedin.svg"
										alt="LinkedIn"
									></img>
								</a>
							</li>
							<li>
								<a href="mailto:nordholm.carl@gmail.com" aria-label="Send email">
									<img
										src="/media/icons/mail.svg"
										alt="Mail"
									></img>
								</a>
							</li>
							<li>
								<a href="/CV_Carl_Nordholm.pdf" target="_blank">
									<button>
										Resumé
										<img
											src="/media/icons/newTab.svg"
											alt="Download "
										/>
									</button>
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div className={headerStyle.seperatorRightHamburger}>
					<a
						onClick={toggleHamburgerMenu}
					>
						<img
							src="/media/icons/dropdown.svg"
							alt="LinkedIn"
						></img>
					</a>
				</div>
				
			</div>
			<div id="hamburgerMenu" className={`${headerStyle.hamburgerMenu} ${hamburgerMenuOpen ? headerStyle.HamburgerOpen : headerStyle.HamburgerClosed}`}>
				<nav>
					<ul>
						<li>
							<Link href="/about">About</Link>
						</li>
						<li>
							<a
								href="https://www.linkedin.com/in/carl-nordholm"
								target="_blank"
							>
								<img
									src="/media/icons/linkedin.svg"
									alt="LinkedIn"
								/>
								LinkedIn
								
							</a>
						</li>
						<li>
							<a href="mailto:nordholm.carl@gmail.com" aria-label="Send email">
								<img
									src="/media/icons/Mail.svg"
									alt="Mail"
								/>Mail
							</a>
						</li>
						<li>
							<a href="/CV_Carl_Nordholm.pdf" download>
								<img
									src="/media/icons/download.svg"
									alt="Download "
								/>
								Resumé
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}