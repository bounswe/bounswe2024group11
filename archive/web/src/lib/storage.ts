Storage.prototype.setObject = function (key: string, value: object) {
	this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key: string) {
	const item = this.getItem(key);
	if (!item) {
		return null;
	}
	return JSON.parse(item);
};
