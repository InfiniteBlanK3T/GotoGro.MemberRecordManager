// Declaring RegEx Constants

export const firstNameRegEx = /^[a-zA-Z]{2,20}/;
export const lastNameRegEx = /\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*){1,20}/;
//const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const emailRegEx =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,40}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,40}[a-zA-Z0-9])?)*$/;
export const phoneRegEx =
	/^[0-9]{10}$|^\(0[1-9]{1}\)[0-9]{8}$|^[0-9]{8}$|^[0-9]{4}[ ][0-9]{3}[ ][0-9]{3}$|^\(0[1-9]{1}\)[ ][0-9]{4}[ ][0-9]{4}$|^[0-9]{4}[ ][0-9]{4}$/;
//const streetNoRegEx = /[A-Za-z0-9'\.\-\s\,]{1,40}/; //need to update
export const streetNameRegEx = /[A-Za-z\.\-\s\,]{2,40}/;
//const suburbRegEx = /[A-Za-z0-9'\.\-\s\,]{2,40}/; //need to update
export const streetNoRegEx = /[A-Za-z0-9._\s]{1,15}/;
//const streetNameRegEx = /[A-Za-z.\-\s]+(Alley|Ally|Arcade|Arc|Avenue|Ave|Boulevard|Bvd|Bypass|Bypa|Circuit|Cct|Close|Cl|Corner|Crn|Court|Ct|Crescent|Cres|Cul-de-sac|Cds|Drive|Dr|Esplanade|Esp|Green|Grn|Grove|Gr|Highway|Hwy|Junction|Jnc|Lane|Lane|Link|Link|Mews|Mews|Parade|Pde|Place|Pl|Ridge|Rdge|Road|Rd|Square|Sq|Street|St|Terrace|Tce|ALLEY|ALLY|ARCADE|ARC|AVENUE|AVE|BOULEVARD|BVD|BYPASS|BYPA|CIRCUIT|CCT|CLOSE|CL|CORNER|CRN|COURT|CT|CRESCENT|CRES|CUL-DE-SAC|CDS|DRIVE|DR|ESPLANADE|ESP|GREEN|GRN|GROVE|GR|HIGHWAY|HWY|JUNCTION|JNC|LANE|LANE|LINK|LINK|MEWS|MEWS|PARADE|PDE|PLACE|PL|RIDGE|RDGE|ROAD|RD|SQUARE|SQ|STREET|ST|TERRACE|TCE){1,30} /;
export const suburbRegEx = /[A-za-z\-\s]{3,30}/;
export const postcodeRegEx = /[0-9]{4}/;

export const feedbackRegEx = /^[a-zA-Z\s]{5,66}/;