/**
 * @auther chris
 *
 * 示例代码
 * <code>
 * var t = new TimerTask(1000, function(num) {
 *	alert(num);
 * }, window, 10);
 *
 *	t.start();
 *	t.pause();
 *	t.resume();
 *	t.addTime(5000);
 *	<code>
 *
 * @param {Number} delay 延迟时间
 * @param {Function} callback 会掉函数
 * @param {Object} thisObj this环境
 * @param params... 参数
 */
function TimerTask(delay, callback, thisObj) {
	this.delay = delay;
	this.callback = callback;
	this.thisObj = thisObj;
	this.params = [].slice.call(arguments, 3);
}

TimerTask.prototype.start = function() {
	if (this.finish) {
		console.error("finished", this.time);
		return;
	}
	var _this = this;
	this.timeStart = new Date().getDate();
	this.time = setTimeout(function() {
		_this.callback.apply(_this.thisObj || window, _this.params);
		_this.finish = true;
	}, this.delay);
}

TimerTask.prototype.pause = function() {
	if (this.finish) {
		console.error("finished", this.time);
		return;
	}
	if (this.paused) return;
	clearTimeout(this.time);
	this.paused = true;
	this.delay -= new Date().getDate() - this.timeStart;
}

TimerTask.prototype.resume = function() {
	if (!this.paused) return;
	this.start();
	this.paused = false;
}

TimerTask.prototype.addTime = function(time) {
	this.pause();
	this.delay += time;
	this.resume();
}