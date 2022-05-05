import jwtDecode from "jwt-decode";

export const extractJWT = (bearerStr) => {
	const regex = /(?<=Bearer ).*/gm;
	const matchArray = bearerStr.match(regex);
	return matchArray !== null ? matchArray[0] : null;
};

export const getUserIDFromJWT = (bearerStr) => {
	const token = extractJWT(bearerStr);
	return !token ? null : jwtDecode(token).id;
};
