export interface Project {
	title: string;
	displayTitle: string;
	summary: string; //Summary is for index page summary
	summaryVideo: Video;
	introduction: string; //Intro is for start of project page
	introVideo: Video;
	devTime: string;
	engine: string;
	genre: string;
	sections?: ProjectSection[];
	groupSize: string;
}

//#region Section
export enum SectionType {
	Standard,
	Image,
	Video,
	Code,
	Parent,
}

export interface ProjectSection {
	name: string;
	explenation: string;
	textArea: string;
}
export function GetSectionType(section: ProjectSection) {
	if (isProjectImageSection(section)) {
		return SectionType.Image;
	}
	if (isProjectVideoSection(section)) {
		return SectionType.Video;
	}
	if (isProjectCodeSection(section)) {
		return SectionType.Code;
	}
	if (isProjectParentSection(section)) {
		return SectionType.Parent;
	}

	return SectionType.Standard;
}
//#region Image
interface Image {
	name: string;
	link: string;
	height: string;
}
export interface ProjectImageSection extends ProjectSection {
	image: Image;
}
export function isProjectImageSection(section: ProjectSection) {
	return (section as ProjectImageSection).image;
}
//#endregion
//#region Video
interface Video {
	name: string;
	link: string;
}
export interface ProjectVideoSection extends ProjectSection {
	video: Video;
}
export function isProjectVideoSection(section: ProjectSection) {
	return (section as ProjectVideoSection).video;
}
//#endregion
//#region Code
export interface ProjectCodeSection extends ProjectSection {
	code: string[];
	language: string;
}
export function isProjectCodeSection(section: ProjectSection) {
	return (section as ProjectCodeSection).code && (section as ProjectCodeSection).language;
}
//#endregion
//#region Parent
export interface ProjectParentSection extends ProjectSection {
	sections: ProjectSection[];
}
export function isProjectParentSection(section: ProjectSection) {
	return (section as ProjectParentSection).sections;
}
//#endregion
//#endregion
