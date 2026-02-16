/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";

import SiteHeader from "@/components/SiteHeader";
import ProjectStyle from "@/projectStyle.module.css";
import PongStyle from "@/pages/pong.module.css";

import { Vector2 } from "@/components/math/Vector2";
import { Collider } from "@/components/math/Collider";

import { drawLine } from "@/components/math/draw";


import rawProjects from "@/Data/projectData.json";
import type { Project } from "@/ProjectInfo";


const projects = rawProjects as unknown as Project[];
import { ImageSection, Sections } from "./projects/[title]";


const gameHeight: number = 80;
const gameWidth: number = 80;

export default function Pong() {
	const project = projects.find((p) => p.title === "Pong");

	if (!project) return <div>Project not found</div>;

	const [isPlaying, setIsPlaying] = useState(false);
	const [, forceUpdate] = useState(0); // Dummy state to trigger re-render

	const [drawLines, setDrawLines] = useState(false);
	function ToggleDrawLines() {
		setDrawLines(!drawLines);
	}


	let lastTime: number = performance.now();
	const fpsText = useRef(0);
	const [speedMultiplier, setSpeedMultipler] = useState(1);

	const speedMultiplierRef = useRef(speedMultiplier);
	useEffect(() => {
		speedMultiplierRef.current = speedMultiplier;
	}, [speedMultiplier]);

	function SetSpeedMultiplier(value: number) {
		setSpeedMultipler(value);
		//console.log(`Set Speed to: ${value} | now has: ${speedMultiplierRef}`);
	}

	const loopID = useRef<number>(0);

	const [leftPoints, setLeftPoints] = useState(0);
	const [rightPoints, setRightPoints] = useState(0);


	const ball = useRef(
		new Ball(new Collider(new Vector2(20, 20), new Vector2(0, 0))),
	);

	const leftPaddle = useRef(new Paddle(3));
	const rightPaddle = useRef(new Paddle(76));

	//const [leftAiOn, setLeftAiOn] = useState(false);

	const leftAi = useRef(new Ai(leftPaddle, ball, true));
	const rightAi = useRef(new Ai(rightPaddle, ball, true));

	function toggleLeftAiOn() {
		leftAi.current.on = !leftAi.current.on;
	}
	function toggleRightAiOn() {
		rightAi.current.on = !rightAi.current.on;
	}

	//Input
	const [keysHeld, setKeysHeld] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		if (!isPlaying) {
			cancelAnimationFrame(loopID.current);
			//console.log("Turned of loop: " + loopID.current);
			return;
		}
		console.log("start");

		//Input
		const handleKeyDown = (e: KeyboardEvent) => {
			keysHeld[e.key] = true;
		};
		const handleKeyUp = (e: KeyboardEvent) => {
			keysHeld[e.key] = false;
		};
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		//Setup Game
		Reset();

		//Game loop
		const loop = (currentTime: number) => {
			const deltaTime = currentTime - lastTime;
			lastTime = currentTime;

			Update(deltaTime);
			forceUpdate((n) => n + 1);

			fpsText.current = Math.round(1000 / deltaTime);

			loopID.current = requestAnimationFrame(loop);
		};
		loopID.current = requestAnimationFrame(loop);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			Reset();

			console.log("done");
			if (leftAi.current.on && rightAi.current.on) {
				setIsPlaying(true);
			}
		};
	}, [isPlaying]);

	function SwitchPlaying() {
		setIsPlaying(!isPlaying);
	}

	function Reset() {
		setKeysHeld({});
		leftPaddle.current.Reset();
		rightPaddle.current.Reset();
		ball.current.Start();
		leftAi.current.Start();
		rightAi.current.Start();
	}

	function Update(deltaTime: number) {

		//console.log(`DeltaTime: ${deltaTime} | speedMultiplier: ${speedMultiplierRef.current}`);
		deltaTime *= speedMultiplierRef.current;

		if (leftAi.current.on) {
			leftAi.current.Update(deltaTime);
		}
		else {
			if (keysHeld["w"] === true) {
				leftPaddle.current.GoUp(deltaTime);
			} else if (keysHeld["s"] === true) {
				leftPaddle.current.GoDown(deltaTime);
			}
		}

		if (rightAi.current.on) {
			rightAi.current.Update(deltaTime);
		}
		else {
			if (keysHeld["i"] === true) {
				rightPaddle.current.GoUp(deltaTime);
			} else if (keysHeld["k"] === true) {
				rightPaddle.current.GoDown(deltaTime);
			}
		}

		ball.current.Update(deltaTime, leftAi, rightAi);

		if (ball.current.OutsideLeft()) {
			console.log("Right Wins!");
			setRightPoints(rightPoints + 1);
			setIsPlaying(false);
		}
		if (ball.current.OutsideRight()) {
			console.log("Left Wins!");
			setLeftPoints(leftPoints + 1);
			setIsPlaying(false);
		}
	}

	//Main html
	return (
		<div className="Site">
			<div className="background" />
			<SiteHeader />
			<div className={PongStyle.siteArea}>

				{/*Game Part */}
				<div className={PongStyle.gameArea}>
					{isPlaying && (
						<>
							{drawLines && drawLine(
								viewPortToPx(ball.current.collider.GetCenter()),
								viewPortToPx(ball.current.collider.GetCenter().add(ball.current.direction.times(10000))),
								"red", 1
							)}

							{/*Center Line*/}
							<div className={`${PongStyle.centerLine}`} />

							{/*Left Paddle*/}
							<div
								className={`${PongStyle.paddle} ${PongStyle.leftPaddle}`}
								style={{
									insetBlockStart: `${leftPaddle.current.collider.GetTop()}vh`,
									backgroundColor: `${leftAi.current.GetModeColor()}`,
								}}
							/>
							{/*Right Paddle*/}
							<div
								className={`${PongStyle.paddle} ${PongStyle.rightPaddle}`}
								style={{
									insetBlockStart: `${rightPaddle.current.collider.GetTop()}vh`,
									backgroundColor: `${rightAi.current.GetModeColor()}`,
								}}
							/>
							{/*Ball*/}
							<div
								className={`${PongStyle.ball}`}
								style={{
									insetInlineStart: `${ball.current.collider.position.x}vw`,
									insetBlockStart: `${ball.current.collider.position.y}vh`,
									width: `${ball.current.collider.size.x}vw`,
									height: `${ball.current.collider.size.y}vh`,
								}}
							/>


							{/*console.log(ball.current.collider.position)*/}

						</>
					)}

					{!isPlaying && (
						<>
							<button className={PongStyle.playButton} onClick={SwitchPlaying}>
								<img className={PongStyle.playImage}
									src="/media/pong/play.png"
									alt="Play" />

							</button>
						</>
					)}
					<div className={PongStyle.fps}>FPS: {fpsText.current}</div>
					<div className={PongStyle.points}>{leftPoints}&nbsp;&nbsp;&nbsp;&nbsp;{rightPoints}</div>
				</div>
				{/*Game Settings */}
				<div className={`${PongStyle.settingsArea}  ${ProjectStyle.Section}`}>
					{/*Left Area*/}
					<div className={PongStyle.settingsSideArea}>
						<h1>Left Paddle</h1>
						<input type="checkbox" checked={leftAi.current.on} onChange={toggleLeftAiOn} />Player Controlled : W/S
					</div>
					{/*Center Area*/}
					<div className={PongStyle.settingsSideArea}>
						<h1>Additional Settings</h1>
						<p><input type="checkbox" checked={drawLines} onChange={ToggleDrawLines} />Ball Debug Lines</p>
						<p><input type="range" value={speedMultiplier} onChange={e => SetSpeedMultiplier(Number(e.target.value))} min="0.1" max="5" step="0.1" />Speed Multipler:{speedMultiplier}</p>
						<h2>Color Guide:</h2>
						<p>White: Player Controlled</p>
						<p>Yellow: Centering Mode</p>
						<p>Green: Direct Follow</p>

					</div>
					{/*Right Area*/}
					<div className={PongStyle.settingsSideArea}>
						<h1>Right Paddle</h1>
						<input type="checkbox" checked={rightAi.current.on} onChange={toggleRightAiOn} />Player Controlled : I/K
					</div>

				</div>

				{/*Info Part */}
				<Sections sections={project.sections} />
				
			</div>
		</div>
	);
}

class Ball {
	static readonly ballMaxSpeed: number = 0.055;
	static readonly ballMinSpeed: number = 0.047;
	static readonly ballSize: number = 1;
	static readonly maxBounceAngle: number = 1.13446401; //In radians

	public direction: Vector2;
	constructor(public collider: Collider) {
		this.direction = new Vector2(0, 0);
		this.collider.size.x = 1;
		this.collider.size.y = 1;
	}

	Start() {

		this.collider.size.x = Ball.ballSize;
		this.collider.size.y = vmToVh(Ball.ballSize);

		this.collider.position.y = randomRange(10, 70);

		const randomAngle = randomRange(-Ball.maxBounceAngle, Ball.maxBounceAngle);

		let xStrength = Ball.ballMinSpeed * Math.cos(randomAngle);
		let yStrength = Ball.ballMinSpeed * -Math.sin(randomAngle);

		if (Math.random() < 0.5) xStrength = -xStrength;
		if (Math.random() < 0.5) yStrength = -yStrength;
		this.direction.x = xStrength;
		this.direction.y = yStrength;


		if (xStrength < 0) {
			this.collider.position.x = (gameWidth / 4) * 3 - this.collider.size.x;
		}
		else {
			this.collider.position.x = (gameWidth / 4) - this.collider.size.x;
		}

	}
	Update(
		deltaTime: number,
		leftPaddleAi: React.RefObject<Ai>,
		rightPaddleAi: React.RefObject<Ai>,
	) {
		//Bounce Top
		if (this.collider.GetTop() < 0) {
			this.direction.y = Math.abs(this.direction.y);
			this.collider.position.y = 0;
		}
		//Bounce Bottom
		if (this.collider.GetBottom() >= gameHeight) {
			this.direction.y = -Math.abs(this.direction.y);
			this.collider.position.y = gameHeight - vmToVh(this.collider.size.y);
		}

		if (this.CollideLeftPaddle(leftPaddleAi.current.paddle)) {
			leftPaddleAi.current.HitPaddle(leftPaddleAi.current.paddle);
			rightPaddleAi.current.HitPaddle(leftPaddleAi.current.paddle);
		}
		if (this.CollideRightPaddle(rightPaddleAi.current.paddle)) {
			leftPaddleAi.current.HitPaddle(rightPaddleAi.current.paddle);
			rightPaddleAi.current.HitPaddle(rightPaddleAi.current.paddle);
		}

		this.collider.position = this.collider.position.add(
			this.direction.times(deltaTime),
		);

		//drawLine(this.collider.GetCenter(), this.collider.GetCenter().add(this.direction));
	}

	CollideLeftPaddle(paddle: React.RefObject<Paddle>) {
		//Not horizontal correct
		if (
			this.collider.GetLeft() > paddle.current.collider.GetRight() ||
			this.collider.GetRight() < paddle.current.collider.GetLeft()
		) {
			return false;
		}

		//Ball Above
		if (paddle.current.collider.GetTop() > this.collider.GetBottom()) {
			return false;
		}

		//Ball Below
		if (paddle.current.collider.GetBottom() < this.collider.GetTop()) {
			return false;
		}

		//Return ball
		const relativeY = paddle.current.collider.GetCenter().y - this.collider.GetCenter().y;

		const normalizedRelativeY = relativeY / (paddle.current.collider.size.y / 2);
		const bounceAngle = normalizedRelativeY * Ball.maxBounceAngle;

		const speed = this.RandomInSpeedRange();

		this.direction.x = speed * Math.cos(bounceAngle);
		this.direction.y = speed * -Math.sin(bounceAngle);

		return true;
	}

	CollideRightPaddle(paddle: React.RefObject<Paddle>) {
		//Not horizontal correct
		if (
			this.collider.GetLeft() > paddle.current.collider.GetRight() ||
			this.collider.GetRight() < paddle.current.collider.GetLeft()
		) {
			return false;
		}

		//Ball Above
		if (paddle.current.collider.GetTop() > this.collider.GetBottom()) {
			return false;
		}

		//Ball Below
		if (paddle.current.collider.GetBottom() < this.collider.GetTop()) {
			return false;
		}

		//Return ball
		const relativeY = paddle.current.collider.GetCenter().y - this.collider.GetCenter().y;

		const normalizedRelativeY = relativeY / (paddle.current.collider.size.y / 2);
		const bounceAngle = normalizedRelativeY * Ball.maxBounceAngle;

		const speed = this.RandomInSpeedRange();

		this.direction.x = -speed * Math.cos(bounceAngle);
		this.direction.y = speed * -Math.sin(bounceAngle);

		return true;
	}

	OutsideLeft() {
		if (this.collider.GetLeft() <= 0) {
			return true;
		}
		return false;
	}
	OutsideRight() {
		if (this.collider.GetRight() >= gameWidth) {
			return true;
		}
		return false;
	}

	RandomInSpeedRange() {
		return randomRange(Ball.ballMinSpeed, Ball.ballMaxSpeed);
	}
}

class Paddle {
	static readonly paddleSpeed: number = 0.04;
	static readonly paddleSize: number = 10;

	public collider: Collider;
	constructor(xPos: number) {
		this.collider = new Collider(
			new Vector2(xPos, 0),
			new Vector2(1, Paddle.paddleSize),
		);
		this.Reset();
	}

	//speedMultiplier is only for AI
	GoUp(deltaTime: number, speedMultiplier: number = 1) {
		this.collider.position.y = Math.max(
			0,
			this.collider.position.y - Paddle.paddleSpeed * speedMultiplier * deltaTime,
		);
	}

	//speedMultiplier is only for AI
	GoDown(deltaTime: number, speedMultiplier: number = 1) {
		this.collider.position.y = Math.min(
			gameHeight - Paddle.paddleSize,
			this.collider.position.y + Paddle.paddleSpeed * speedMultiplier * deltaTime,
		);
	}

	Reset() {
		this.collider.position.y = gameHeight / 2 - Paddle.paddleSize / 2;
	}
}

class Ai {
	public paddle: React.RefObject<Paddle>;
	public ball: React.RefObject<Ball>;
	mode: AiMode;
	accuracy: number = 1;

	constructor(aPaddle: React.RefObject<Paddle>, aBall: React.RefObject<Ball>, public on: boolean = false) {
		this.paddle = aPaddle;
		this.ball = aBall;
		this.mode = DirectTrackMode;
	}
	Start() {
		this.accuracy = randomRange(0.85, 0.95);
		this.mode = DirectTrackMode;
	}

	//Called every time a ball hits any paddle
	HitPaddle(aPaddle: React.RefObject<Paddle>) {
		this.mode = this.mode.hitPaddle(this.paddle === aPaddle);
	}

	Update(deltaTime: number) {
		this.mode.update(deltaTime, this.paddle, this.ball, this.accuracy);
		const yDiffrence = this.ball.current.collider.GetCenter().y - this.paddle.current.collider.GetCenter().y;
	}

	GetModeColor() {
		if (!this.on) {
			return "white";
		}
		if (this.mode === DirectTrackMode) {
			return "green";
		}
		if (this.mode === CenterMode) {
			return "yellow";
		}
		if (this.mode === TargetTrackMode) {
			return "red";
		}
		return "white";
	}
}
interface AiMode {
	update(deltaTime: number, aPaddle: React.RefObject<Paddle>, aBall: React.RefObject<Ball>, accuracy: number): void;
	hitPaddle(self: boolean): AiMode;
}

const DirectTrackMode: AiMode = {
	update(deltaTime, aPaddle, aBall, accuracy) {
		const yDiffrence = aBall.current.collider.GetCenter().y - aPaddle.current.collider.GetCenter().y;
		const inPaddle = aPaddle.current.collider.size.y / 2;
		if (yDiffrence < -inPaddle * (1 / accuracy) / 2) {
			aPaddle.current.GoUp(deltaTime, accuracy);
		}
		if (yDiffrence > inPaddle * (1 / accuracy) / 2) {
			aPaddle.current.GoDown(deltaTime, accuracy);
		}
	},
	hitPaddle(self) {
		if (self) {
			return CenterMode;
		}
		return DirectTrackMode;
	}
}

const CenterMode: AiMode = {
	update(deltaTime, aPaddle, aBall, accuracy) {
		const yDiffrence = gameHeight / 2 - aPaddle.current.collider.GetCenter().y;
		if (yDiffrence < 5 * -(1 / accuracy)) {
			aPaddle.current.GoUp(deltaTime, accuracy);
		}
		if (yDiffrence > 5 * (1 / accuracy)) {
			aPaddle.current.GoDown(deltaTime, accuracy);
		}
	},
	hitPaddle(self) {
		return DirectTrackMode;
	}
}

const TargetTrackMode: AiMode = {
	update(deltaTime, aPaddle, aBall, accuracy) {
		const yDiffrence = gameHeight / 2 - aPaddle.current.collider.GetCenter().y;
		if (yDiffrence < 5 * -(1 / accuracy)) {
			aPaddle.current.GoUp(deltaTime, accuracy);
		}
		if (yDiffrence > 5 * (1 / accuracy)) {
			aPaddle.current.GoDown(deltaTime, accuracy);
		}
	},
	hitPaddle(self) {
		return DirectTrackMode;
	}
}


function randomRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function vhToVm(vwValue: number) {
	const aspectRatio = window.innerWidth / window.innerHeight;
	return vwValue / aspectRatio;
}
function vmToVh(vhValue: number) {
	const aspectRatio = window.innerHeight / window.innerWidth;
	return vhValue / aspectRatio;
}
function vwToPx(vwValue: number) {
	return (vwValue / 100) * window.innerWidth;
}
function vhToPx(vhValue: number) {
	return (vhValue / 100) * window.innerHeight;
}
function viewPortToPx(vpValue: Vector2) {
	return new Vector2(vwToPx(vpValue.x), vhToPx(vpValue.y));
}