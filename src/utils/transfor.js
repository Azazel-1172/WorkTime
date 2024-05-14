const transfor = (Str) => {
	const parts = Str.split(":");

	if (parts.length < 3) {
		return Str;
	} else {
		return parts.map((part) => part.trim().padStart(2, "0")).join(":");
	}
};

export default transfor;
