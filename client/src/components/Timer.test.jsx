import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Timer from './Timer';

describe('Timer Component', () => {
    test('renders the correct time value', () => {
        const testTime = 30;
        render(<Timer time={testTime} />);
        expect(screen.getByText(testTime.toString())).toBeInTheDocument();
        expect(screen.getByText('SECONDS')).toBeInTheDocument();
    });
});