import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Timeline from "@/components/Timeline"
import type { TimeSlot } from "@/components/Timeline"

import rawTimeSlots from "@/Data/timelineData.json";
const timeSlots = rawTimeSlots as TimeSlot[];

import ProjectStyle from "@/projectStyle.module.css";
import AboutStyle from "@/pages/about.module.css"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function About() {
	return (
		<div className="Site">

			<div className="background" />
			<SiteHeader />
			<div className={`${AboutStyle.AboutSection}`}>
				<div className={AboutStyle.AboutText}>
					<h1>About Me</h1>

					<p>
						I am a Stockholm-based programmer specializing in <strong>C++ and C#</strong>.
						My focus is on building high-performance gameplay systems and intuitive tools that bridge the gap between technical constraints and creative vision.
						From developing custom engines at <strong>The Game Assembly</strong> to shipping <strong>High Frontier 4 Digital</strong>,
						I prioritize writing clean, maintainable code that scales within live-service environments.
					</p>

					<p>
						My professional approach is heavily informed by my background as a <strong>sailing instructor on tall ships</strong>.
						Navigating high-pressure, safety-critical environments has sharpened my ability to balance decisive action with critical thinking.
						In a studio setting, this translates to a disciplined &quot;all-hands-on-deck&quot; mindset: knowing when to follow established architecture for efficiency,
						and when to challenge an approach to ensure a more robust, long-term technical solution.
					</p>

					<p>
						When I&apos;m not at sea or at my desk, I explore how systems function physically.
						I <strong>design and 3D print</strong> functional parts and experiment with <strong>microcontrollers</strong>,
						bringing digital logic into the physical world. This hands-on curiosity for prototyping keeps my problem-solving skills sharp,
						whether I am optimizing a hardware interface or a complex codebase.
					</p>

					<h3>Want to contact me?</h3>
					<p>If you&apos;re interested in working together, discussing game development, or simply talking about sailing, feel free to reach out. I enjoy thoughtful conversations and connecting with people who share an interest in building strong teams and well-crafted systems.</p>
					<div className={AboutStyle.Contact}>
						<a
							href="https://www.linkedin.com/in/carl-nordholm"
							target="_blank"
						>
							<img
								src={`${basePath}/media/icons/linkedin.svg`}
								alt="LinkedIn"
							/>
						</a>
						<a href="mailto:nordholm.carl@gmail.com" aria-label="Send email">
							<img
								src={`${basePath}/media/icons/Mail.svg`}
								alt="Mail"
							/>
						</a></div>


				</div>

				<div className={AboutStyle.AboutImage}>
					<img src={`${basePath}/media/test/ducky.png`} />
				</div>
				<div className={AboutStyle.AboutSkills}>
					<h2>SKILLS</h2>

					<div className={AboutStyle.SkillGroup}>
						<h3>Core Expertise</h3>
						<p>C++, C#, Unity, Unreal Engine, Custom Engines</p>
					</div>
					<div className={AboutStyle.SkillGroup}>
						<h3>Technical Toolbox</h3>
						<li><strong>Systems & Architecture:</strong> Tool Development, UI Architecture, PhysX, Networking, Dear ImGui, Steamworks.</li>
						<li><strong>Production & Workflow:</strong> Perforce (P4V), Git, YouTrack, Taiga, Agile/Scrum.</li>

						<li><strong>Scripting:</strong>HLSL, Typescript, React, HTML</li>
						<li><strong>Prototyping:</strong>Fusion360, Blender, 3D printing, Lasercutting</li>
					</div>
				</div>
			</div>
			<div className={ProjectStyle.Section}>
				TODO: ADD MY VIEW ON AI
			</div>

			<div className={ProjectStyle.Section}>
				<Timeline times={timeSlots} />
			</div>
			<SiteFooter />
		</div>
	);
}
