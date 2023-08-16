export enum ISCStatus {
	DEPLOY = 'deploy',
	IN_PROGRESS = 'working in progress',
}

export enum BuildStatus {
	BUILDING = 'Building code...',
	BUILD = 'Build',
}

export enum TestStatus {
	READY_TEST = 'Ready for Test',
	TESTING = 'Testing code',
	TEST = 'Test',
}

export enum DeployStatus {
	READY_DEPLOY = 'Ready to Deploy',
	DEPLOYING = 'Deploying',
	DEPLOYED = 'Deployed',
	DEPLOY = 'Deploy',
}

export enum SCSTEPS {
	DESIGN = 1,
	BUILD = 2,
	TEST = 3,
	DEPLOY = 4,
}

export interface ISCItem {
	name: string;
	icon?: string;
	hashtag?: string[];
	status?: ISCStatus;
	updateTime?: string;
}

export interface ITestCase {
	id: number;
	title: string;
}
