import Link from "next/link";

import { Project } from "@/ProjectInfo";

import summaryStyle from "@/components/ProjectSummary.module.css";

export default function ProjectSummary({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    return (
        <div className={summaryStyle.ProjectSummary}>
            {project.title !== "Pong" && (
                <Link
                    className={summaryStyle.ProjectLink}
                    href={"/projects/" + project.title}
                />
            )}
            {project.title == "Pong" && (
                <Link className={summaryStyle.ProjectLink} href={"/pong"} />
            )}

            <div className={summaryStyle.OnVideoTextWrapper}>
                <video
                    loop
                    autoPlay
                    muted
                    playsInline
                    className={summaryStyle.Video}
                >
                    <source src={project.summaryVideo.link} />
                    Sorry, your browser does not support the video tag.
                </video>
                <div className={summaryStyle.OnVideoText}>
                    {project.devTime !== "0" && (
                        <div className={summaryStyle.OnVideoGroup}>
                            <img
                                src="/portfolio-website/media/icons/clock.svg"
                                alt="Dev Time:"
                            />
                            <p>{project.devTime}</p>
                        </div>
                    )}
                    {project.groupSize && project.groupSize!="0" && (
                        <div className={summaryStyle.OnVideoGroup}>
                            <img
                                src="/portfolio-website/media/icons/group.svg"
                                alt="Group Size: "
                            />
                            <p>{project.groupSize}</p>
                        </div>
                    )}

                    <div className={summaryStyle.OnVideoGroup}>
                        <img src="/portfolio-website/media/icons/engine.svg" alt="Engine: " />
                        <p>{project.engine}</p>
                    </div>
                </div>
            </div>

            <div className={summaryStyle.summary}>
                <h1>{project.displayTitle}</h1>
                <p>{project.summary}</p>
            </div>
        </div>
    );
}
