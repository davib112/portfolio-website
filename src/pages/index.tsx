import React from "react";
import Link from "next/link";
import rawProjects from "@/Data/projectData.json";
import type { Project } from "@/ProjectInfo";

const projects = rawProjects as unknown as Project[];

import ProjectSummary from "@/components/ProjectSummary";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import indexStyle from "@/pages/index.module.css"
import summaryStyle from "@/components/ProjectSummary.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function App() {
    //https://architextures.org/textures/831
    return (
        <div className="Site">
            <div className="background" />
            <SiteHeader />
            <div className={indexStyle.intro}>
                <div>
                    <h3>Hi, I&apos;m Carl.</h3>
                    <p>I am a Game Programmer with a deep curiosity for how systems function. I bring a steady and adaptable mindset to every project, built on a strong foundation in C++ and C#, while always being ready to learn and master new technologies when needed. My goal is to work closely with my team to bridge the gap between technical constraints and great gameplay, creating reliable solutions that others can build upon.<br /><br />Below are snippets from some of my projects. They represent only small parts of the work within those projects and only some of the projects I have worked on, but they showcase approaches and solutions I enjoy building.
                    </p>
                </div>
                <div className={indexStyle.rightItem}>

                    <img
                        src={`${basePath}/media/other/Carl_Nordholm_Portrait.png`}
                        alt="Portrait"
                    ></img>
                </div>
                <div className={indexStyle.buttonBar}>
                    <Link href="/about"><button>Read more about me</button></Link>
                    <p>or find some of my projects below</p>
                </div>
            </div>

            <div className={summaryStyle.Grid}>
                {projects.map((project, index) => (
                    <ProjectSummary
                        project={project}
                        key={index}
                        index={index}
                    />
                ))}
            </div>
            <SiteFooter />
        </div>
    );
}