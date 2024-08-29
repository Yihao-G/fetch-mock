import { vi } from 'vitest';
import {
	FetchMock,
	defaultFetchMockConfig,
	RemoveRouteOptions,
} from '@fetch-mock/core';
import './vitest-extensions';

class FetchMockVitest extends FetchMock {
	mockClear() {
		this.clearHistory();
		return this;
	}
	mockReset(options?: RemoveRouteOptions) {
		this.removeRoutes(options);
		return this.mockClear();
	}
	mockRestore(options?: RemoveRouteOptions) {
		this.unmockGlobal();
		return this.mockReset(options);
	}
}

export function hookIntoVitestMockResetMethods() {
	const { clearAllMocks, resetAllMocks, restoreAllMocks } = vi;

	vi.clearAllMocks = () => {
		clearAllMocks.apply(vi);
		fetchMockVitest.mockClear();
		return vi;
	};

	vi.resetAllMocks = (options?: RemoveRouteOptions) => {
		resetAllMocks.apply(vi);
		fetchMockVitest.mockReset(options);
		return vi;
	};

	vi.restoreAllMocks = (options?: RemoveRouteOptions) => {
		restoreAllMocks.apply(vi);
		fetchMockVitest.mockRestore(options);
		return vi;
	};
}

const fetchMockVitest = new FetchMockVitest({
	...defaultFetchMockConfig,
});

export default fetchMockVitest;