import fetch from 'fetch';

import { computed } from '@ember/object';

import Service, { inject } from '@ember/service';

export default Service.extend({
	host: '',

	namespace: 'api',

	cache: {},

	fetching: {},

	utils: inject(),

	crypto: inject(),

	offline: inject(),

	fastboot: inject(),

	maxCacheTime: 5 * 60 * 1000,

	invalidateCache(timestamp) {
		let currentTime = +new Date();
		let maxCacheTime = this.get('maxCacheTime');
		return currentTime > timestamp + maxCacheTime;
	},

	init() {
		[
			'get', 'put', 'post',
			'head', 'patch', 'delete'
		].forEach((method) => {
			let self = this;
			this[method === 'get' && 'fetch' || method] = function() {
				return self.request(method, ...arguments);
			};
		});
	},

	async request(method = 'get', api, data = {}, headers = {}, { form, contentType, responseType } = {}) {
		method = method.toLowerCase();
		responseType = responseType || 'json';
		contentType = contentType || 'application/json; charset=utf-8';

		let url = this.createUrl(api, method, data);
		headers = this.createHeaders(headers, contentType);
		let dataType = method !== 'get' ? 'body' : 'params';

		data = method === 'get' ? data
			: form ? new FormData(form)
				: JSON.stringify(data || {});

		let request = {
			headers,
			contentType,
			mode: 'cors',
			[dataType]: data,
			method: method.toUpperCase()
		};

		let bypassCache = false;
		let cache = this.get('cache');
		let crypto = this.get('crypto');
		let fetching = this.get('fetching');
		let cacheKey = crypto.hash(`${url}-${JSON.stringify(data)}`);

		if (!bypassCache && cache[cacheKey]) {
			let { timestamp, response } = cache[cacheKey];

			if (!this.invalidateCache(timestamp)) {
				return response;
			}
		}

		try {
			fetching[cacheKey] = fetching[cacheKey] || fetch(url, request);
			this.set('fetching', fetching);

			let response = (await fetching[cacheKey]).clone();
			response = this.finish(response, responseType);
			let timestamp = +new Date();

			response.ok
			&& (cache[cacheKey] = { response, timestamp })
			&& this.set('cache', cache);

			delete fetching[cacheKey];
			return response;
		}
		catch(error) {
			return this.error(error);
		}
	},

	finish(response, type = 'json') {
		if (!response.ok) {
			return this.error(response);
		}

		try {
			return response
				&& response[type]
				&& response[type]();
		}
		catch(e) {
			return response;
		}
	},

	async error(response) {

		let fromBlob = async() => {
			if (!response.blob) { return; }
			let blob = await response.blob();
			return await this.get('crypto').fromBlob(blob);
		};

		let message = response.message
			|| response.statusText
			|| await fromBlob();

		console.info('[API Error]', message);

		let error = new Error(message);
		error.code = response.code || response.statusCode || 505;

		if (this.get('fastboot.isFastBoot')) {
			return this.set('fastboot.response.statusCode', error.code);
		}

		throw error;
	},

	createUrl(api, method, data) {
		let qs = this.params(data);
		let host = this.get('host');
		let namespace = this.get('namespace');

		if (this.get('fastboot.isFastBoot')) {
			host = this.get('fastboot.request.host');
			host = `https://${host}`;
		}

		if (!api) {
			throw new Error('No API Specified');
		}
		else if (namespace) {
			api = api.replace(new RegExp(`^(/+)?(${namespace})?(/+)?`), '');
		}

		let apiURL = `${host}/${namespace}/${api}`.replace(/\/$/, '');
		return method !== 'get' ? apiURL : `${apiURL}${qs}`;
	},

	createHeaders(headers, contentType) {
		headers = {
			'Content-Type': contentType,
			...headers
		};

		Object.keys(headers).forEach(
			(key) => !headers[key] && delete headers[key]
		);

		return headers;
	},

	params(obj = {}, prefix) {
		let qs = Object.keys(obj).map((k) => {
			let v = obj[k];
			let p = prefix ? `${prefix}[${k}]` : k;
			let isObject = this.get('utils').isObject(v);

			return isObject
				? this.params(v, p)
				: `${encodeURIComponent(p)}=${encodeURIComponent(v)}`;
		}).join('&').trim();

		!prefix && qs && qs.length && (qs = `?${qs}`);
		return qs && qs.length && qs || '';
	}
});