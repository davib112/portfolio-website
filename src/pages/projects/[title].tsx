import { GetStaticPaths, GetStaticProps } from "next";
import {
	Project,
	ProjectSection,
	ProjectImageSection,
	ProjectVideoSection,
	ProjectCodeSection,
	ProjectParentSection,
	SectionType,
	GetSectionType,
} from "@/ProjectInfo";
import projects from "@/Data/projectData.json";
import SiteHeader from "@/components/SiteHeader";

import ProjectStyle from "@/projectStyle.module.css";

import CodeSnippet from "@/components/CodeSnippet"
import { useState, useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


export default function ProjectPage({ project }: { project: Project }) {
	//Setup Sections

	return (
		<div className="Site">

			<div className="background" />
			<SiteHeader />

			<div className={ProjectStyle.Intro}>
				{project.introVideo.link.startsWith("https://") && (
					<iframe
						width="100%"
						style={{ aspectRatio: "16 / 9" }}
						src={`${basePath}${project.introVideo.link}`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				)}

				{!project.introVideo.link.startsWith("https://") && (
					<video
						loop
						autoPlay
						muted
						playsInline
						className={ProjectStyle.IntroVideo}
					>
						<source src={`${basePath}${project.summaryVideo.link}`} />
						Sorry, your browser does not support the video tag.
					</video>
				)}
				<h1>{project.displayTitle}</h1>
				<div className={ProjectStyle.AreaParent}>
					<div className={ProjectStyle.LeftArea}>
						<p>{project.introduction}</p>
						<nav className={ProjectStyle.Nav}>

							{project.sections?.map((section) => (
								<a key={section.name} href={"#" + section.name}>{section.name}<br /></a>
							))
							}
						</nav>
					</div>

					<div className={ProjectStyle.RightArea}>
						{project.devTime !== "0" && (
							<div>
								<img
									src={`${basePath}/media/icons/clock.svg`}
									alt="Dev Time:"
								/>
								<p>{project.devTime}</p>
							</div>
						)}
						{project.groupSize && project.groupSize != "0" && (
							<div>
								<img
									src={`${basePath}/media/icons/group.svg`}
									alt="Group Size: "
								/>
								<p>{project.groupSize}</p>
							</div>
						)}

						<div>
							<img src={`${basePath}/media/icons/engine.svg`} alt="Engine: " />
							<p>{project.engine}</p>
						</div>
					</div>

				</div>

			</div>

			<Sections sections={project.sections} />

		</div>
	);
}
export function Sections({ sections }: { sections?: ProjectSection[] }) {
	return (
		sections != null &&
		sections.map((section, index) => {
			const type: SectionType = GetSectionType(section);

			switch (type) {
				case SectionType.Standard:
					return <Section section={section} key={index} />;
				case SectionType.Image:
					return (
						<ImageSection
							section={section as ProjectImageSection}
							key={index}
						/>
					);
				case SectionType.Video:
					return (
						<VideoSection
							section={section as ProjectVideoSection}
							key={index}
						/>
					);
				case SectionType.Code:
					return (
						<CodeSection
							section={section as ProjectCodeSection}
							key={index}
						/>
					);
				case SectionType.Parent:
					return (
						<ParentSection
							section={section as ProjectParentSection}
							key={index}
						/>
					);
				default:
					return null;
			}

		}));
}

export function Section({ section }: { section: ProjectSection }) {
	const { open, toggle } = useCollapsible(true);

	return (
		<div
			className={`${ProjectStyle.Section} ${ProjectStyle.StandardSection}`}
			id={section.name}
		>
			<div className={ProjectStyle.TextPart}>
				<h2>{section.name}</h2>
				{/*<h2 onClick={toggle}>
					{section.name}{open ? "▼" : "►"}
				</h2>*/}
				<CollapsibleBody open={open}>
					<p>{section.explenation}</p>
				</CollapsibleBody>
			</div>
		</div>
	);
}

export function ImageSection({ section }: { section: ProjectImageSection }) {
	const { open, toggle } = useCollapsible(true);

	return (
		<div
			className={`${ProjectStyle.Section} ${ProjectStyle.ImageSection}`}
			id={section.name}
		>
			<div className={ProjectStyle.TextPart}>
				<h2 onClick={toggle}>
					{section.name} <DropdownIcon isDown={open} />
				</h2>
				<CollapsibleBody open={open}>
					<p>{section.explenation}</p>
				</CollapsibleBody>
			</div>
			<CollapsibleBody open={open}>
				<div className={ProjectStyle.MediaWrap}>
					<img src={`${basePath}${(section as ProjectImageSection).image.link}`} />
				</div>
			</CollapsibleBody >
		</div>
	);
}

export function VideoSection({ section }: { section: ProjectVideoSection }) {
	const { open, toggle } = useCollapsible(true);

	return (
		<div
			className={`${ProjectStyle.Section} ${ProjectStyle.VideoSection}`}
			id={section.name}
		>
			<div className={ProjectStyle.TextPart}>
				<h2 onClick={toggle}>
					{section.name} <DropdownIcon isDown={open} />
				</h2>
				<CollapsibleBody open={open}>
					<p>{section.explenation}</p>
				</CollapsibleBody>
			</div>
			<CollapsibleBody open={open}>
				<div className={ProjectStyle.MediaWrap}>
					<video
						loop
						autoPlay
						muted
						playsInline
						src={`${basePath}${(section as ProjectVideoSection).video.link}`}
					/>
				</div>
			</CollapsibleBody>
		</div>
	);
}

export function CodeSection({ section }: { section: ProjectCodeSection }) {
	const { open, toggle } = useCollapsible(true);

	return (
		<div
			className={`${ProjectStyle.Section} ${ProjectStyle.CodeSection}`}
			id={section.name}
		>
			<div className={ProjectStyle.TextPart}>
				<h2 onClick={toggle}>
					{section.name} <DropdownIcon isDown={open} />
				</h2>
				<CollapsibleBody open={open}>
					<p>{section.explenation}</p>
				</CollapsibleBody>
			</div>
			<CollapsibleBody open={open}>
				{CodeSnippet(section.code.join("\n"))}
			</CollapsibleBody>
		</div>
	);
}

export function ParentSection({ section }: { section: ProjectParentSection }) {
	const { open, toggle } = useCollapsible(true);

	return (
		<div
			className={`${ProjectStyle.Section} ${ProjectStyle.ParentSection}`}
			id={section.name}
		>
			<div className={ProjectStyle.TextPart}>
				<h1 onClick={toggle}>
					{section.name} <DropdownIcon isDown={open} />
				</h1>
				<p>{section.explenation}</p>
			</div>

			<CollapsibleBody open={open}>
				<Sections sections={section.sections} />
			</CollapsibleBody>
		</div>
	);
}


export const getStaticPaths: GetStaticPaths = async () => {
	const paths = projects.map((project) => ({
		params: { title: project.title },
	}));

	return {
		paths,
		fallback: false,
	};
};


export const getStaticProps: GetStaticProps = async (context) => {
	const { title } = context.params!;
	const project = projects.find((p) => p.title === title);

	return {
		props: {
			project,
		},
	};
};

export function useCollapsible(defaultOpen = true) {
	const [open, setOpen] = useState(defaultOpen);
	const toggle = () => setOpen((o) => !o);

	return { open, toggle };
}

function CollapsibleBody({
	open,
	children,
}: {
	open: boolean;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`${ProjectStyle.CollapsibleBody} ${open ? ProjectStyle.CollapsibleBodyOpen : ""
				}`}
		>
			{children}
		</div>
	);
}

function DropdownIcon({ isDown }: { isDown: boolean }) {
	if (isDown) {
		return (<img src={`${basePath}/media/icons/dropdown.svg`} alt="dropdown" />);
	}
	else {
		return (<img className={ProjectStyle.rotate90} src={`${basePath}/media/icons/dropdown.svg`} alt="dropdown" />);
	}
}