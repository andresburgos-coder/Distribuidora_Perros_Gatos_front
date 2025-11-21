import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../../redux/store';
import NuevoProductoPage from '../NuevoProductoPage';

// Mock productos-service (module is imported as default in codebase)
const createProductMock = jest.fn();
jest.mock('../../../../services/productos-service', () => ({
  __esModule: true,
  default: {
    createProduct: (...args) => createProductMock(...args),
  },
}));

describe('NuevoProductoPage', () => {
  beforeEach(() => {
    createProductMock.mockClear();
  });

  test('muestra campos del formulario y valida campos obligatorios', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NuevoProductoPage />
        </MemoryRouter>
      </Provider>
    );

    const guardarBtn = screen.getByText(/Guardar producto/i);
    expect(guardarBtn).toBeInTheDocument();

    // Submit without filling -> no call to createProduct and show validation (inputs get error class)
    fireEvent.click(guardarBtn);

    await waitFor(() => {
      expect(createProductMock).not.toHaveBeenCalled();
    });
  });

  test('envía datos válidos al servicio', async () => {
    createProductMock.mockResolvedValue({ success: true });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NuevoProductoPage />
        </MemoryRouter>
      </Provider>
    );

    const nombre = screen.getByPlaceholderText(/Nombre del producto/i);
    const descripcion = screen.getByPlaceholderText(/Descripción \(mínimo 10 caracteres\)/i);
    const precio = screen.getByPlaceholderText(/Precio/i);
    const peso = screen.getByPlaceholderText(/Ingresa el peso en gramos/i);
    const fileInput = screen.getByLabelText(/Imagen/i) || screen.getByRole('textbox', { name: /Imagen/i });

    // Some inputs may be rendered differently; set values by querying placeholders
    fireEvent.change(nombre, { target: { value: 'Croquetas Test' } });
    fireEvent.change(descripcion, { target: { value: 'Descripción válida de más de diez caracteres' } });
    fireEvent.change(precio, { target: { value: '123.45' } });
    fireEvent.change(peso, { target: { value: '500' } });

    // Mock a file (since file input may be optional in this test environment, we skip attaching file)

    const guardarBtn = screen.getByText(/Guardar producto/i);
    fireEvent.click(guardarBtn);

    await waitFor(() => {
      expect(createProductMock).toHaveBeenCalled();
    });
  });
});
