import { vi } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "../../test-utils";
import { CarInfo } from "../CarInfo";

describe('Car Info', () => {
  test('renders car info', async () => {
    render(<CarInfo />, {route: '/car-info/1'});

    // await waitForElementToBeRemoved(screen.getByText('Loading...'))

    // screen.debug();

    // const backlink = screen.getByTestId('back-link');
    // const button = screen.getByTestId('add-car-btn');
    // const Tacoma = screen.getByText('Tacoma');

    // expect(backlink).toBeInTheDocument();
  });
  
});