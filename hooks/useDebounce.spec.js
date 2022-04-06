import { act, renderHook } from '@testing-library/react-hooks';

import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('Given the `useDebounce` hook', () => {
	it('should update value after specified delay', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: '', delay: 500 } }
		);

		rerender({ value: 'Hello World', delay: 500 });

		expect(result.current).toBe('');

		act(() => jest.advanceTimersByTime(501));

		expect(result.current).toBe('Hello World');
	});

	it('should NOT update value before specified delay', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: '', delay: 500 } }
		);

		rerender({ value: 'Hello World', delay: 500 });

		act(() => jest.advanceTimersByTime(400));

		expect(result.current).toBe('');
	});
});
