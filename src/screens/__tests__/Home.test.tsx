import { render, screen, waitForElementToBeRemoved } from "../../test-utils";
import userEvent from '@testing-library/user-event';
import { Home } from "../Home";

describe('Home', () => {
  test('renders table component with data', async () => {
    render(<Home />, {route: '/'});

    await waitForElementToBeRemoved(screen.getByText('Loading...'))

    const heading = screen.getByTestId('heading');
    const button = screen.getByTestId('add-car-btn');
    const Tacoma = screen.getByText('Tacoma');

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(Tacoma).toBeInTheDocument();
  });
  
  test('renders modal on button click', async () => {
    const user = userEvent.setup();
    render(<Home />, {route: '/'});

    await waitForElementToBeRemoved(screen.getByText('Loading...'))

    const button = screen.getByTestId('add-car-btn');

    await user.click(button);

    const modalheading = screen.getByText('Car Information');

    expect(modalheading).toBeInTheDocument();
  });
  
  test('modal displays error messages for inputs', async () => {
    const user = userEvent.setup();
    render(<Home />, {route: '/'});

    await waitForElementToBeRemoved(screen.getByText('Loading...'))

    const button = screen.getByTestId('add-car-btn');

    await user.click(button);

    const modalheading = screen.getByText('Car Information');

    expect(modalheading).toBeInTheDocument();

    const modalsubmit = screen.getByTestId('modal-submit-btn');

    await user.click(modalsubmit);


    const makeerror = await screen.findByText('Make is required');
    const modelerror = await screen.findByText('Model is required');
    const mileageerror = await screen.findByText('Mileage is required');
    const priceerror = await screen.findByText('Price is required');
    const yearerror = await screen.findByText('Year is required');
    const categoryerror = await screen.findByText('Category is required');

    expect(makeerror).toBeInTheDocument();
    expect(modelerror).toBeInTheDocument();
    expect(mileageerror).toBeInTheDocument();
    expect(priceerror).toBeInTheDocument();
    expect(yearerror).toBeInTheDocument();
    expect(categoryerror).toBeInTheDocument();
  });
  
  test('modal input values change on user input', async () => {
    const user = userEvent.setup();
    render(<Home />, {route: '/'});

    await waitForElementToBeRemoved(screen.getByText('Loading...'))

    const button = screen.getByTestId('add-car-btn');

    await user.click(button);

    const modalheading = screen.getByText('Car Information');

    expect(modalheading).toBeInTheDocument();

    const makeinput = screen.getByTestId('make-input')
    const modelinput = screen.getByTestId('model-input')
    const mileageinput = screen.getByTestId('mileage-input')
    const priceinput = screen.getByTestId('price-input')
    const yearinput = screen.getByTestId('year-input')
    const categoryinput = screen.getByTestId('category-input')
    const packageimnput = screen.getByTestId('package-input')
    const colorinput = screen.getByTestId('color-input')

    await user.type(makeinput, 'Toyota')
    await user.type(modelinput, 'Tacoma')
    await user.type(mileageinput, '25000')
    await user.type(priceinput, '40000')
    await user.type(yearinput, '2020')
    await user.type(categoryinput, 'trucks')
    await user.type(packageimnput, 'TRD-Offroad')
    await user.type(colorinput, 'white')

    expect(makeinput).toHaveValue('Toyota')
    expect(modelinput).toHaveValue('Tacoma')
    expect(mileageinput).toHaveValue('25000')
    expect(priceinput).toHaveValue('40000')
    expect(yearinput).toHaveValue('2020')
    expect(categoryinput).toHaveValue('trucks')
    expect(packageimnput).toHaveValue('TRD-Offroad')
    expect(colorinput).toHaveValue('white')
  });
});