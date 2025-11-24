import apiClient from './api-client';

export const pedidosService = {

  // Crear pedido (admin)
  async createOrder(orderData) {
    const response = await apiClient.post('/admin/pedidos', orderData);
    return response.data;
  },

  // Obtener todos los pedidos (admin)
  async getAllOrders({ skip = 0, limit = 20 } = {}) {
    const response = await apiClient.get(`/admin/pedidos/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Obtener pedido por id (admin)
  async getOrderById(id) {
    const response = await apiClient.get(`/admin/pedidos/${id}`);
    return response.data;
  },

  // Admin: Obtener todos los pedidos
  async getAllOrders({ skip = 0, limit = 20 } = {}) {
    const response = await apiClient.get(`/admin/pedidos/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Admin: Obtener pedido por id
  async getAdminOrderById(id) {
    const response = await apiClient.get(`/admin/pedidos/${id}`);
    return response.data;
  },

  // Admin: Actualizar estado del pedido
  async updateOrderStatus(id, estado, nota = '') {
    // El backend espera { estado, nota }
    const response = await apiClient.put(`/admin/pedidos/${id}/status`, { estado, nota });
    return response.data;
  },

  // Admin: Eliminar pedido
  async deleteOrder(id) {
    const response = await apiClient.delete(`/admin/pedidos/${id}`);
    return response.data;
  },

  // Admin: Historial de pedido
  async getOrderHistory(id) {
    const response = await apiClient.get(`/admin/pedidos/${id}/history`);
    return response.data;
  },

  // Admin: Pedidos por usuario
  async getOrdersByUser(userId) {
    const response = await apiClient.get(`/admin/pedidos/user/${userId}`);
    return response.data;
  },
};

