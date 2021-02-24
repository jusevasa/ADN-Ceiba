import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { OrdenControlador } from 'src/infraestructura/orden/controlador/orden.controlador';
import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';
import { servicioCrearOrdenProveedor } from 'src/infraestructura/orden/proveedor/servicio/servicio-crear-orden.proveedor';
import { ManejadorCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.manejador';
import { ManejadorListarOrden } from 'src/aplicacion/orden/consulta/listar-ordenes.manejador';
import { ComandoCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de ordenes', () => {

  let app: INestApplication;
  let repositorioOrden: SinonStubbedInstance<RepositorioOrden>;
  let daoOrden: SinonStubbedInstance<DaoOrden>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioOrden = createStubObj<RepositorioOrden>(['existeRepartidor', 'guardar', 'actualizar', 'eliminar'], sinonSandbox);
    daoOrden = createStubObj<DaoOrden>(['listarOrdenes'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdenControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioCrearOrden,
          inject: [RepositorioOrden],
          useFactory: servicioCrearOrdenProveedor,
        },
        { provide: RepositorioOrden, useValue: repositorioOrden },
        { provide: DaoOrden, useValue: daoOrden },
        ManejadorCrearOrden,
        ManejadorListarOrden,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar las ordenes', () => {

    const ordenes: any[] = [{
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: "02-23-2021",
      fechaEntrega: "02-23-2021",
      horaEntrega: "15:30:00"
    }];
    daoOrden.listarOrdenes.returns(Promise.resolve(ordenes));

    return request(app.getHttpServer())
      .get('/ordenes')
      .expect(HttpStatus.OK)
      .expect(ordenes);
  });

  it('debería fallar al ingresar una hora fuera de lo establecido', async () => {

    const orden: ComandoCrearOrden = {
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: new Date(),
      fechaEntrega: new Date(),
      horaEntrega: "18:00:00"
    };
    const mensaje = 'La hora ingresada no corresponde al horario laboral';

    const response = await request(app.getHttpServer())
      .post('/ordenes').send(orden)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al asignar un repartidor en la misma franja horaria', async () => {
    const orden: ComandoCrearOrden = {
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: new Date(),
      fechaEntrega: new Date(),
      horaEntrega: "15:00:00"
    };
    const mensaje = `El repartidor ya fue asignado en esta franja horaria`;
    repositorioOrden.existeRepartidor.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/ordenes').send(orden)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
