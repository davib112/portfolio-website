import tlStyle from "./Timeline.module.css";

import rawProjects from "@/Data/projectData.json";
import type { Project } from "@/ProjectInfo";

const projects = rawProjects as unknown as Project[];
export default function Timeline({ times }: { times: TimeSlot[] }) {
	
	return (
		<div className={tlStyle.TimelineBackground}>

			{times.map((item) => (
				<TimeLineSlot key={item.id} time={item} />
			))}
		</div> 
	);
}
function TimeLineSlot({ time }: { time: TimeSlot }) {
	return (
		<div className={tlStyle.TimelineItem}>
			<div className={tlStyle.TimelineMarker}>
				<span className={tlStyle.TimelineDot} />
				<span className={tlStyle.TimelineLine} />
			</div>
			
			<div className={tlStyle.TimelineContent}>
				<h2>{time.title}</h2>
				<div className={tlStyle.LeftContent}>
					
					<h4>{time.subtitle}</h4>
					{time.period && <span className={tlStyle.TimelineDate}>{time.period}</span>}
					<p>{time.description && time.description.join('\n')}</p>
				</div>
				{
					time.projectsIDs &&
					<div className={tlStyle.RightContent}>
					<h3>Projects</h3>

					{time.projectsIDs.map((id) => (
						<a key={id} className={tlStyle.TimelineLink} href={"/projects/" + id}>
							{(projects.find(project => project.title == id))?.displayTitle}
						<br /></a>
						
					))}
				</div>}
			</div>
		</div>
	);
}

export interface TimeSlot {
	id: string;
	title: string;
	subtitle: string;
	period: string;
	description: string[];
	projectsIDs: string[];
}

//Start at graduated gymnasium
//Then TGA education
//Then Ion Game Design
//Then currently working at dandelion developer