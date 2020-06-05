import { Router, request, response } from 'express';
import multer from 'Multer';

import CriarPedido from '../services/Pedidos/CriarPedidoService';
import ListarPedido from '../services/Pedidos/ListarPedidoService';
import EditarPedido from '../services/Pedidos/EditarPedidoService';
import DeletarPedido from '../services/Pedidos/DeletarPedidoService';

const pedidosRoutes = Router();
const Multer = multer();
pedidosRoutes.post('/Criar', Multer.any(), async (request, response) => {
  const {
    forma_pagamento,
    tipo_entrega,
    data_entrega,
    codigo_rastreio,
    usuario_id,
  } = request.body;

  const pedidos = new CriarPedido();

  const pedidoCriado = await pedidos.execute({
    forma_pagamento,
    tipo_entrega,
    data_entrega,
    codigo_rastreio,
    usuario_id,
  });

  return response.json(pedidoCriado);
});

pedidosRoutes.get('/Listar', Multer.any(), async (request, response) => {
  const { usuario_id } = request.body;

  const pedidos = new ListarPedido();

  const pedidoListado = await pedidos.execute({
    usuario_id,
  });

  return response.json(pedidoListado);
});

pedidosRoutes.post('/Editar', Multer.any(), async (request, response) => {
  const {
    forma_pagamento,
    tipo_entrega,
    data_entrega,
    codigo_rastreio,
    id,
  } = request.body;

  const pedidos = new EditarPedido();

  const pedidoEditado = await pedidos.execute({
    forma_pagamento,
    tipo_entrega,
    data_entrega,
    codigo_rastreio,
    id,
  });

  return response.json(pedidoEditado);
});

pedidosRoutes.post('/Deletar', Multer.any(), async (request, response) => {
  const { id } = request.body;

  const pedidos = new DeletarPedido();

  const pedidoDeletado = await pedidos.execute({
    id,
  });

  return response.json(pedidoDeletado);
});

export default pedidosRoutes;
