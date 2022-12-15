import { render, screen, waitForElementToBeRemoved } from "../../test-utils";
import { Home } from "../Home";

describe('Home', () => {
  test('renders a heading', async () => {
    render(<Home />);

      // 🕗 Wait for the posts request to be finished.
    await waitForElementToBeRemoved(screen.getByText('Loading...'))

    const heading = screen.getByTestId('heading');

    expect(heading).toBeTruthy();
  });
});