import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';

import { Button, Col, Form, Row } from 'react-bootstrap';

import { FormikHelpers } from 'formik/dist/types';
import { SpanError } from './styles';
import { ordenInterface } from '../../models/Orden';
import { useFormik } from 'formik';

interface FormValues {
  idCoordinador: number;
  idRepartidor: number;
  fechaEntrega: string;
  horaEntrega: string;
}

interface FormCrearOrdenProp {
  onSubmit: (payload: ordenInterface) => any;
  disabled?: boolean;
  formTitle: string;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
  idCoordinador: Yup.number().required('El campo id coordinador es requerido.'),
  idRepartidor: Yup.number().required('El campo id repartidor es requerido.'),
  fechaEntrega: Yup.string().required(
    'El campo fecha de entrega es requerido.'
  ),
  horaEntrega: Yup.string().required('El campo hora de entrega es requerido.'),
});

export const FormCrearOrden: React.FC<FormCrearOrdenProp> = ({
  onSubmit,
  disabled,
  formTitle,
  initialValues = {
    idCoordinador: 0,
    idRepartidor: 0,
    fechaEntrega: '',
    horaEntrega: '',
  },
}) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    onSubmit({
      idCoordinador: values.idCoordinador,
      idRepartidor: values.idRepartidor,
      fechaCreacion: new Date().toISOString(),
      fechaEntrega: values.fechaEntrega,
      horaEntrega: values.horaEntrega,
    });
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h2>{formTitle}</h2>
      <Row>
        <Col xl={6}>
          <Form.Group controlId="idCoordinador">
            <Form.Label>Id Coordinador</Form.Label>
            <Form.Control
              type="number"
              disabled={disabled}
              name="idCoordinador"
              min={1}
              max={4}
              placeholder="Id Coordinador"
              value={formik.values.idCoordinador}
              onChange={formik.handleChange}
            />
            {formik.touched.idCoordinador && formik.errors.idCoordinador && (
              <SpanError>{formik.errors.idCoordinador}</SpanError>
            )}
          </Form.Group>
        </Col>
        <Col xl={6}>
          <Form.Group controlId="idRepartidor">
            <Form.Label>Id Repartidor</Form.Label>
            <Form.Control
              type="number"
              disabled={disabled}
              name="idRepartidor"
              min={1}
              max={8}
              placeholder="Id Repartidor"
              value={formik.values.idRepartidor}
              onChange={formik.handleChange}
            />
            {formik.touched.idRepartidor && formik.errors.idRepartidor && (
              <SpanError>{formik.errors.idRepartidor}</SpanError>
            )}
          </Form.Group>
        </Col>
        <Col xl={6}>
          <Form.Group controlId="idFechaEntrega">
            <Form.Label>Fecha Entrega</Form.Label>
            <Form.Control
              type="date"
              disabled={disabled}
              name="fechaEntrega"
              placeholder="Fecha Entrega"
              value={formik.values.fechaEntrega}
              onChange={formik.handleChange}
            />
            {formik.touched.fechaEntrega && formik.errors.fechaEntrega && (
              <SpanError>{formik.errors.fechaEntrega}</SpanError>
            )}
          </Form.Group>
        </Col>
        <Col xl={6}>
          <Form.Group controlId="idHoraEntrega">
            <Form.Label>Hora Entrega</Form.Label>
            <Form.Control
              type="time"
              disabled={disabled}
              name="horaEntrega"
              placeholder="Fecha Entrega"
              value={formik.values.horaEntrega}
              onChange={formik.handleChange}
            />
            {formik.touched.horaEntrega && formik.errors.horaEntrega && (
              <SpanError>{formik.errors.horaEntrega}</SpanError>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Button className="w-100" type="submit" variant="secondary">
        Crear
      </Button>
    </Form>
  );
};

FormCrearOrden.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  initialValues: PropTypes.shape({
    idCoordinador: PropTypes.number.isRequired,
    idRepartidor: PropTypes.number.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    horaEntrega: PropTypes.string.isRequired,
  }),
};
