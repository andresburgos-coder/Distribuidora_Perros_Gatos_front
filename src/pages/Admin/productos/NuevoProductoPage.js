import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Textarea, Select } from '../../../components/ui/index';
import productosService from '../../../services/productos-service';
import useToast from '../../../hooks/use-toast';
import './style.css';

const CATEGORY_OPTIONS = ['Perros', 'Gatos'];
const SUBCATS = {
  Perros: ['Alimento', 'Juguetes', 'Accesorios', 'Higiene'],
  Gatos: ['Alimento', 'Rascadores', 'Arena', 'Accesorios'],
};
const MAX_IMAGE_BYTES = 10485760; // 10 MB
const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

export const NuevoProductoPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    peso: '',
    categoria: 'Perros',
    subcategoria: SUBCATS['Perros'][0],
    imagenFile: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm((f) => ({ ...f, subcategoria: SUBCATS[f.categoria][0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.categoria]);

  const validate = () => {
    const e = {};
    if (!form.nombre || form.nombre.trim().length < 2) e.nombre = true;
    if (!form.descripcion || form.descripcion.trim().length < 10) e.descripcion = true;
    const precioNum = parseFloat(form.precio);
    if (isNaN(precioNum) || precioNum <= 0) e.precio = true;
    const pesoNum = parseInt(form.peso, 10);
    if (isNaN(pesoNum) || pesoNum < 1) e.peso = true;
    if (!CATEGORY_OPTIONS.includes(form.categoria)) e.categoria = true;
    if (!SUBCATS[form.categoria].includes(form.subcategoria)) e.subcategoria = true;
    if (!form.imagenFile) e.imagenFile = true;
    else {
      const name = form.imagenFile.name || '';
      const ext = name.split('.').pop().toLowerCase();
      if (!ALLOWED_EXT.includes(ext) || form.imagenFile.size > MAX_IMAGE_BYTES) {
        e.imagenFile = 'invalid';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (key) => (ev) => {
    const value = key === 'imagenFile' ? ev.target.files[0] : ev.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: parseFloat(form.precio),
      peso: parseInt(form.peso, 10),
      categoria: form.categoria,
      subcategoria: form.subcategoria,
      imagenFile: form.imagenFile,
    };

    try {
      await productosService.createProduct(payload);
      toast.success('Producto creado exitosamente');
      navigate('/admin/productos');
    } catch (err) {
      const code = err?.response?.data?.error || err?.response?.status;
      if (code === 'nombre_duplicado' || (err?.response?.status === 409)) {
        toast.error('Ya existe un producto con ese nombre.');
      } else if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Error al crear el producto. Revisa la consola.');
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-nuevo-producto-page">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="form-producto" noValidate>
        <label>
          Nombre
          <Input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Nombre del producto"
            className={errors.nombre ? 'error' : ''}
          />
        </label>

        <label>
          Descripción
          <Textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción (mínimo 10 caracteres)"
            className={errors.descripcion ? 'error' : ''}
          />
        </label>

        <label>
          Precio
          <Input
            type="number"
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            placeholder="Precio"
            className={errors.precio ? 'error' : ''}
          />
        </label>

        <label>
          Peso (gramos)
          <Input
            type="number"
            value={form.peso}
            onChange={(e) => setForm({ ...form, peso: e.target.value })}
            placeholder="Ingresa el peso en gramos (ej: 500)"
            className={errors.peso ? 'error' : ''}
          />
          <small>Ingresa el peso en gramos (ej: 500 para 500g)</small>
        </label>

        <label>
          Categoría
          <Select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            className={errors.categoria ? 'error' : ''}
          >
            {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </label>

        <label>
          Subcategoría
          <Select
            value={form.subcategoria}
            onChange={(e) => setForm({ ...form, subcategoria: e.target.value })}
            className={errors.subcategoria ? 'error' : ''}
          >
            {SUBCATS[form.categoria].map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </label>

        <label>
          Imagen
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.webp"
            onChange={handleChange('imagenFile')}
            className={errors.imagenFile ? 'error' : ''}
          />
          {errors.imagenFile === 'invalid' && (
            <small className="error-text">
              Formato o tamaño de imagen no válido. Usa JPG, PNG, SVG o WebP (máx. 10 MB).
            </small>
          )}
        </label>

        <div className="actions">
          <Button type="submit" variant="primary">Guardar producto</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/admin/productos')}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default NuevoProductoPage;
